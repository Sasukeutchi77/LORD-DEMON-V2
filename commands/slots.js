// commands/slots.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { ecoDb, ECONOMY, spinSlots, calcSlotWin } from '../lib/economySystem.js'

export default async function slots(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const bet       = parseInt(args[0])

  if (!bet || bet < ECONOMY.SLOTS_MIN) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🎰 *MACHINE À SOUS* 〕━━━☩\n☠\n` +
      `⛧  💡 *Usage:* ${prefix}slots <mise>\n☠  Mise minimum: ${ECONOMY.SLOTS_MIN} ${ECONOMY.SYMBOL}\n☠\n` +
      `✝  🎰 *Combinaisons gagnantes:*\n` +
      `☠  🎰🎰🎰 → x50  |  👑👑👑 → x20\n` +
      `⛧  💎💎💎 → x15  |  🍇🍇🍇 → x10\n` +
      `☩  🍋🍋🍋 → x7   |  🍊🍊🍊 → x5\n` +
      `✝  🍒🍒🍒 → x3   |  🍒🍒 → x2\n` +
      `☠  💎💎 → x1.5\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *FONDS INSUFFISANTS* 〕━━━☩\n☠\n⛧  Tu as ${user.coins} ${ECONOMY.SYMBOL}, mise = ${bet} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '🎰 ROTATION EN COURS...')
    await new Promise(r => setTimeout(r, 800))

    const reels  = spinSlots()
    const result = calcSlotWin(reels, bet)

    await deleteLoader(sock, sender, loadKey); loadKey = null

    const display = `[ ${reels[0]} | ${reels[1]} | ${reels[2]} ]`

    if (result.win) {
      const prize = Math.floor(bet * result.mult)
      ecoDb.addCoins(senderJid, prize - bet, 'slots win')
      const u = ecoDb.get(senderJid)
      await sendMessage(sock, sender,
        `☩━━━〔 🎰 *MACHINE À SOUS* 〕━━━☩\n☠\n` +
        `⛧  ${display}\n☠\n` +
        `✝  🎉 *GAGNÉ !* x${result.mult}\n` +
        `☠  💰 *Gain:* +${prize} ${ECONOMY.SYMBOL}\n` +
        `⛧  💵 *Net:* +${prize - bet} ${ECONOMY.SYMBOL}\n` +
        `☠  💰 *Poche:* ${u.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    } else {
      ecoDb.removeCoins(senderJid, bet, 'slots loss')
      const u = ecoDb.get(senderJid)
      await sendMessage(sock, sender,
        `☩━━━〔 🎰 *MACHINE À SOUS* 〕━━━☩\n☠\n` +
        `⛧  ${display}\n☠\n` +
        `✝  💀 *Perdu !* -${bet} ${ECONOMY.SYMBOL}\n` +
        `☠  💰 *Poche:* ${u.coins} ${ECONOMY.SYMBOL}\n` +
        `⛧  💡 Réessaie: ${prefix}slots ${bet}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
  } catch(e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender, `☠ Erreur slots: ${e.message.slice(0,100)}`)
  }
}
