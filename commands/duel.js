// commands/duel.js — LORD DEMON (Duel entre joueurs)
import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
import { cleanNumber } from '../lib/ownerSystem.js'

// Défis en attente : { [groupId_targetJid]: { challenger, bet, expiry } }
const pendingDuels = new Map()

export default async function duel(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'

  // ── Accepter un duel ─────────────────────────────────
  if (args[0]?.toLowerCase() === 'accepter' || args[0]?.toLowerCase() === 'accept') {
    const duelKey = `${sender}_${senderJid}`
    if (!pendingDuels.has(duelKey)) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚔️ *DUEL* 〕━━━☩\n☠\n⛧  Aucun duel en attente pour toi.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const { challenger, bet } = pendingDuels.get(duelKey)
    pendingDuels.delete(duelKey)

    const targetUser     = ecoDb.ensure(senderJid)
    const challengerUser = ecoDb.ensure(challenger)

    if (targetUser.coins < bet) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *FONDS INSUFFISANTS* 〕━━━☩\n☠\n⛧  Tu as ${targetUser.coins} ${ECONOMY.SYMBOL}, mise = ${bet}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    if (challengerUser.coins < bet) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *DÉFI EXPIRÉ* 〕━━━☩\n☠\n⛧  Le challenger n'a plus assez de coins.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    let loadKey = null
    try {
      loadKey = await showProgressLoader(sock, sender, '⚔️ DUEL EN COURS...')
      await new Promise(r => setTimeout(r, 1200))

      const cRoll = Math.floor(Math.random() * 100) + 1
      const tRoll = Math.floor(Math.random() * 100) + 1
      const winner = cRoll > tRoll ? challenger : cRoll < tRoll ? senderJid : null

      await deleteLoader(sock, sender, loadKey); loadKey = null

      if (!winner) {
        await sendMessage(sock, sender,
          `☩━━━〔 ⚔️ *DUEL — ÉGALITÉ !* 〕━━━☩\n☠\n` +
          `⛧  🎲 ${cleanNumber(challenger)}: *${cRoll}*\n` +
          `☩  🎲 ${cleanNumber(senderJid)}: *${tRoll}*\n` +
          `☠\n✝  🤝 *MATCH NUL !* Mise remboursée.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
        return
      }

      const loser = winner === challenger ? senderJid : challenger
      ecoDb.removeCoins(loser, bet, `duel loss vs ${winner}`)
      ecoDb.addCoins(winner, bet, `duel win vs ${loser}`)
      const wu = ecoDb.get(winner)

      await sendMessage(sock, sender,
        `☩━━━〔 ⚔️ *DUEL TERMINÉ !* 〕━━━☩\n☠\n` +
        `⛧  🎲 ${cleanNumber(challenger)}: *${cRoll}*\n` +
        `☩  🎲 ${cleanNumber(senderJid)}: *${tRoll}*\n` +
        `☠\n` +
        `✝  🏆 *VAINQUEUR:* @${cleanNumber(winner)}\n` +
        `☠  💰 *Gain:* +${bet} ${ECONOMY.SYMBOL}\n` +
        `⛧  💰 *Poche gagnant:* ${wu.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    } catch(e) {
      if (loadKey) await deleteLoader(sock, sender, loadKey)
      await sendMessage(sock, sender, `☠ Erreur duel: ${e.message.slice(0,100)}`)
    }
    return
  }

  // ── Refuser ──────────────────────────────────────────
  if (args[0]?.toLowerCase() === 'refuser' || args[0]?.toLowerCase() === 'refuse') {
    const duelKey = `${sender}_${senderJid}`
    if (pendingDuels.has(duelKey)) {
      const { challenger } = pendingDuels.get(duelKey)
      pendingDuels.delete(duelKey)
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚔️ *DUEL REFUSÉ* 〕━━━☩\n☠\n⛧  @${cleanNumber(senderJid)} a refusé le duel.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
  }

  // ── Lancer un duel ───────────────────────────────────
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const quoted   = msg.message?.extendedTextMessage?.contextInfo?.participant
  let targetJid  = mentions?.[0] || quoted
  let betArg     = args[0]
  if (!targetJid && args[0]) {
    const num = cleanNumber(args[0])
    if (num) { targetJid = `${num}@s.whatsapp.net`; betArg = args[1] }
  } else if (targetJid) { betArg = args[0] }

  if (!targetJid) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ⚔️ *DUEL — USAGE* 〕━━━☩\n☠\n⛧  ${prefix}duel @user <mise>\n☠  ${prefix}duel accepter\n✝  ${prefix}duel refuser\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
  if (targetJid === senderJid) return await sendMessage(sock, sender, `☠ Tu ne peux pas te défier toi-même.`)

  const bet = parseInt(betArg)
  if (!bet || bet < ECONOMY.DUEL_MIN) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *MISE INVALIDE* 〕━━━☩\n☠\n⛧  Mise minimum: ${ECONOMY.DUEL_MIN} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const challenger = ecoDb.ensure(senderJid)
  if (challenger.coins < bet) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *FONDS INSUFFISANTS* 〕━━━☩\n☠\n⛧  Tu as ${challenger.coins} ${ECONOMY.SYMBOL}, mise = ${bet}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const duelKey = `${sender}_${targetJid}`
  const expiry  = setTimeout(() => pendingDuels.delete(duelKey), 2 * 60 * 1000)
  pendingDuels.set(duelKey, { challenger: senderJid, bet, expiry })

  await sendMessage(sock, sender,
    `☩━━━〔 ⚔️ *DÉFI LANCÉ !* 〕━━━☩\n` +
    `☠\n` +
    `⛧  ⚔️ @${cleanNumber(senderJid)} défie @${cleanNumber(targetJid)}\n` +
    `☠  💰 *Mise:* ${bet} ${ECONOMY.SYMBOL} chacun\n` +
    `☠\n` +
    `☩  @${cleanNumber(targetJid)}, tape:\n` +
    `✝  *${prefix}duel accepter* pour accepter\n` +
    `☠  *${prefix}duel refuser* pour décliner\n` +
    `☠\n` +
    `⛧  ⏳ Expire dans 2 minutes\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
