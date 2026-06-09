import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function archiver(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Cette commande est réservée aux administrateurs.`)
  }
  const sujet = args.join(' ') || 'événement récent'
  const id = Date.now().toString(36).toUpperCase()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📁 *ARCHIVAGE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📄 *Sujet:* ${sujet}\n` +
    `⛧  🔢 *Référence:* #${id}\n` +
    `✝  📅 *Date:* ${new Date().toLocaleDateString('fr-FR')}\n` +
    `☩  ✅ *Statut:* Archivé avec succès\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
