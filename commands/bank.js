// commands/bank.js — BANQUE 🏦
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function bank(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()
  const amount = parseInt(args[1])

  if (!sub || sub === 'info') {
    const e = economyDb.ensure(jid)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🏦 *BANQUE DÉMONIAQUE*         ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `💵 En poche: *${e.coins || 0} 🪙*\n` +
      `🏦 En banque: *${e.bank || 0} / ${e.bank_capacity || 5000} 🪙*\n\n` +
      `☩━━━〔 📋 *COMMANDES* 〕━━━☩\n` +
      `⛧ \`.bank depot <montant>\`    — Déposer\n` +
      `☩ \`.bank retrait <montant>\`  — Retirer\n` +
      `✝ \`.bank depot tout\`         — Tout déposer\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'depot' || sub === 'deposit' || sub === 'dep') {
    const e = economyDb.ensure(jid)
    const depositAmount = (args[1] === 'tout' || args[1] === 'all') ? (e.coins || 0) : amount
    if (!depositAmount || depositAmount <= 0) return sendMessage(sock, sender, `☠ Montant invalide.`)
    const result = economyDb.deposit(jid, depositAmount)
    if (!result.ok) return sendMessage(sock, sender, `☠ ${result.reason}`)
    const updated = economyDb.get(jid)
    return sendMessage(sock, sender,
      `✅ *Dépôt réussi !*\n💰 +${result.deposited} 🪙 en banque\n🏦 Banque: *${updated.bank}/${updated.bank_capacity} 🪙*`
    )
  }

  if (sub === 'retrait' || sub === 'withdraw' || sub === 'ret') {
    const e = economyDb.ensure(jid)
    const withdrawAmount = (args[1] === 'tout' || args[1] === 'all') ? (e.bank || 0) : amount
    if (!withdrawAmount || withdrawAmount <= 0) return sendMessage(sock, sender, `☠ Montant invalide.`)
    const result = economyDb.withdraw(jid, withdrawAmount)
    if (!result.ok) return sendMessage(sock, sender, `☠ ${result.reason}`)
    const updated = economyDb.get(jid)
    return sendMessage(sock, sender,
      `✅ *Retrait réussi !*\n💵 +${result.withdrawn} 🪙 en poche\n💵 Poche: *${updated.coins} 🪙*`
    )
  }

  await sendMessage(sock, sender, `☠ Sous-commande inconnue. Utilisez \`.bank\` pour l'aide.`)
}
