// commands/bank.js — LORD DEMON (Wallet + Banque + Transfert)
import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
import { cleanNumber } from '../lib/ownerSystem.js'

export default async function bank(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const sub       = args[0]?.toLowerCase()
  const user      = ecoDb.ensure(senderJid)

  // ── Solde (défaut) ───────────────────────────────────
  if (!sub || sub === 'solde' || sub === 'balance' || sub === 'bal') {
    const total = user.coins + user.bank
    return await sendMessage(sock, sender,
      `☩━━━〔 🏦 *BANQUE DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  👤 *${cleanNumber(senderJid)}*\n` +
      `☠\n` +
      `☩  💰 *Poche:*  ${user.coins.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `✝  🏦 *Banque:* ${user.bank.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☠  💎 *Total:*  ${total.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `⛧  📊 *Gains totaux:* ${user.total_earned.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☩  💸 *Dépenses:*    ${user.total_spent.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `✝  💡 ${prefix}bank depot <montant>\n` +
      `☠  💡 ${prefix}bank retrait <montant>\n` +
      `⛧  💡 ${prefix}bank envoyer @user <montant>\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Dépôt ───────────────────────────────────────────
  if (sub === 'depot' || sub === 'deposit' || sub === 'dep') {
    const amt = args[1] === 'tout' || args[1] === 'all' ? user.coins : parseInt(args[1])
    if (!amt || amt <= 0) return await sendMessage(sock, sender, `☠ Usage: ${prefix}bank depot <montant|tout>`)
    const res = ecoDb.deposit(senderJid, amt)
    if (!res.ok) return await sendMessage(sock, sender, `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  ${res.reason}\n☠  💰 Poche: ${user.coins} ${ECONOMY.SYMBOL}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    const u2 = ecoDb.get(senderJid)
    return await sendMessage(sock, sender,
      `☩━━━〔 🏦 *DÉPÔT EFFECTUÉ* 〕━━━☩\n☠\n⛧  ✅ +${amt} ${ECONOMY.SYMBOL} déposés en banque\n☠\n☩  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n✝  🏦 Banque: ${u2.bank} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Retrait ─────────────────────────────────────────
  if (sub === 'retrait' || sub === 'withdraw' || sub === 'ret') {
    const u = ecoDb.get(senderJid)
    const amt = args[1] === 'tout' || args[1] === 'all' ? u.bank : parseInt(args[1])
    if (!amt || amt <= 0) return await sendMessage(sock, sender, `☠ Usage: ${prefix}bank retrait <montant|tout>`)
    const res = ecoDb.withdraw(senderJid, amt)
    if (!res.ok) return await sendMessage(sock, sender, `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  ${res.reason}\n☠  🏦 Banque: ${u.bank} ${ECONOMY.SYMBOL}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    const u2 = ecoDb.get(senderJid)
    return await sendMessage(sock, sender,
      `☩━━━〔 🏦 *RETRAIT EFFECTUÉ* 〕━━━☩\n☠\n⛧  ✅ ${amt} ${ECONOMY.SYMBOL} retirés de la banque\n☠\n☩  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n✝  🏦 Banque: ${u2.bank} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Envoyer ─────────────────────────────────────────
  if (sub === 'envoyer' || sub === 'send' || sub === 'give' || sub === 'donner') {
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    const quoted   = msg.message?.extendedTextMessage?.contextInfo?.participant
    let targetJid  = mentions?.[0] || quoted
    let amtArg     = args[1]
    if (!targetJid) {
      const num = cleanNumber(args[1])
      if (num) { targetJid = `${num}@s.whatsapp.net`; amtArg = args[2] }
    }
    if (!targetJid) return await sendMessage(sock, sender, `☠ Usage: ${prefix}bank envoyer @user <montant>`)
    const amt = parseInt(amtArg)
    if (!amt || amt <= 0) return await sendMessage(sock, sender, `☠ Montant invalide.`)
    if (targetJid === senderJid) return await sendMessage(sock, sender, `☠ Tu ne peux pas t'envoyer à toi-même.`)

    const res = ecoDb.transfer(senderJid, targetJid, amt)
    if (!res.ok) return await sendMessage(sock, sender, `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  ${res.reason}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    const u2 = ecoDb.get(senderJid)
    return await sendMessage(sock, sender,
      `☩━━━〔 💸 *TRANSFERT ENVOYÉ* 〕━━━☩\n☠\n⛧  ✅ ${amt} ${ECONOMY.SYMBOL} envoyés à @${cleanNumber(targetJid)}\n☠\n☩  💰 Poche restante: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Top richesse ─────────────────────────────────────
  if (sub === 'top' || sub === 'classement') {
    const top = ecoDb.leaderboard(10)
    let text  = `☩━━━〔 🏆 *TOP FORTUNE* 〕━━━☩\n☠\n`
    const medals = ['🥇','🥈','🥉']
    top.forEach((u, i) => {
      const medal = medals[i] || `${i+1}.`
      text += `⛧  ${medal} ${cleanNumber(u.jid)}\n☩  💎 ${u.total.toLocaleString()} ${ECONOMY.SYMBOL}\n☠\n`
    })
    return await sendMessage(sock, sender, text + `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }

  await sendMessage(sock, sender,
    `☩━━━〔 🏦 *BANQUE — AIDE* 〕━━━☩\n☠\n⛧  ${prefix}bank → solde\n☩  ${prefix}bank depot <montant|tout>\n✝  ${prefix}bank retrait <montant|tout>\n☠  ${prefix}bank envoyer @user <montant>\n⛧  ${prefix}bank top\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
