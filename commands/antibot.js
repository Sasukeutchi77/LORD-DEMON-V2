import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function antibot(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const sub = args[0]?.toLowerCase()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤖 *ANTI-BOT SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚙️ *Commande:* antibot ${sub || ''}\n` +
    `⛧  ${sub === 'on' ? '✅ *Activé* — Détection bots active' : sub === 'off' ? '❌ *Désactivé* — Protection suspendue' : '📊 *Statut:* Protection standard active'}\n\n` +
    `✝  🛡️ _Réservé aux administrateurs._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
