import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function autowarn(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const sub = args[0]?.toLowerCase()
  const seuil = parseInt(args[1]) || 3
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚠️ *AUTO-WARN SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚙️ *Commande:* autowarn ${sub || ''}\n` +
    `⛧  ${sub === 'on' ? '✅ *Activé* — Avertissements auto actifs' : sub === 'off' ? '❌ *Désactivé* — Système en pause' : '📊 *Statut:* Mode standard'}\n` +
    `✝  🔢 *Seuil:* ${seuil} avertissements → action\n\n` +
    `☩  🛡️ _Réservé aux administrateurs._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
