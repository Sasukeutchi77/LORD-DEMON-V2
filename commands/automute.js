import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function automute(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const sub = args[0]?.toLowerCase()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔇 *AUTO-MUTE SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚙️ *Commande:* automute ${sub || ''}\n` +
    `⛧  ${sub === 'on' ? '✅ *Activé* — Mutes automatiques actifs' : sub === 'off' ? '❌ *Désactivé* — Système en pause' : '📊 *Statut:* Inactif par défaut'}\n\n` +
    `✝  🛡️ _Réservé aux administrateurs._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
