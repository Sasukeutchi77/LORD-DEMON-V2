import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function autoban(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const sub = args[0]?.toLowerCase()
  const status = ['on', 'off'].includes(sub) ? sub : 'status'
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔨 *AUTO-BAN SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚙️ *Commande:* autoban ${sub || ''}\n` +
    `⛧  ${status === 'on' ? '✅ *Activé* — Bans automatiques actifs' : status === 'off' ? '❌ *Désactivé* — Protection suspendue' : '📊 *Statut:* Vérification en cours...'}\n\n` +
    `✝  🛡️ _Réservé aux administrateurs._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
