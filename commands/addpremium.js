import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo } from '../lib/ownerSystem.js'
export default async function addpremium(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!isDeployer(jid) && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Réservé aux sudos et propriétaires.`)
  }
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const duree = args[1] || '30j'
  if (!target) return sendMessage(sock, sender, `☠ Usage: .addpremium @membre [durée]\nEx: .addpremium @user 30j`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💎 *PREMIUM ACCORDÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n` +
    `⛧  💎 *Statut Premium:* Activé\n` +
    `✝  ⏱️ *Durée:* ${duree}\n` +
    `☩  🌟 _Accès aux fonctionnalités exclusives débloqué_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [target] })
}
