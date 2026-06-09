import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function autokick(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const sub = args[0]?.toLowerCase()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👢 *AUTO-KICK SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚙️ *Commande:* autokick ${sub || ''}\n` +
    `⛧  ${sub === 'on' ? '✅ *Activé* — Expulsions automatiques actives' : sub === 'off' ? '❌ *Désactivé* — Protection suspendue' : '📊 *Statut:* Système en veille'}\n\n` +
    `✝  🛡️ _Réservé aux administrateurs._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
