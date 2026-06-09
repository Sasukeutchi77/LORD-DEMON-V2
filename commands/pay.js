// commands/pay.js — PAYER QUELQU'UN 💸
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb } from '../lib/economySystem.js'
import { getSenderJid, cleanNumber } from '../lib/ownerSystem.js'

export default async function pay(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)

  if (args.length < 2) {
    return sendMessage(sock, sender,
      `☩━━━〔 💸 *PAYER* 〕━━━☩\n` +
      `⛧ Usage: \`.pay @mention <montant>\`\n` +
      `⛧ Ex: \`.pay @ami 100\`\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }

  const amount = parseInt(args[args.length - 1])
  if (isNaN(amount) || amount <= 0) return sendMessage(sock, sender, `☠ Montant invalide.`)
  if (amount < 10) return sendMessage(sock, sender, `☠ Minimum 10 🪙.`)

  const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const targetJid = quoted || mentioned
  if (!targetJid) return sendMessage(sock, sender, `☠ Mentionnez la personne à payer !`)
  if (targetJid === jid) return sendMessage(sock, sender, `☠ Vous ne pouvez pas vous payer vous-même !`)

  const result = economyDb.transfer(jid, targetJid, amount)
  if (!result.ok) return sendMessage(sock, sender, `☠ ${result.reason}`)

  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💸 *PAIEMENT EFFECTUÉ*         ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `✅ Vous avez envoyé *${amount} 🪙* !\n` +
    `📤 De: vous\n` +
    `📥 À: @${targetJid.split('@')[0]}\n\n` +
    `💳 Nouveau solde: *${economyDb.get(jid).coins} 🪙*\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    { mentions: [targetJid] }
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}