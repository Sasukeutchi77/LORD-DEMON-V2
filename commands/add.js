import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function add(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Réservé aux administrateurs.`)
  }
  const numero = args[0]?.replace(/[^0-9]/g, '')
  if (!numero) return sendMessage(sock, sender, `☠ Usage: .add <numéro>\nEx: .add 22123456789`)
  const groupId = sender.endsWith('@g.us') ? sender : null
  if (!groupId) return sendMessage(sock, sender, `☠ Cette commande fonctionne uniquement en groupe.`)
  try {
    const targetJid = `${numero}@s.whatsapp.net`
    await sock.groupParticipantsUpdate(groupId, [targetJid], 'add')
    const text =
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ➕ *MEMBRE AJOUTÉ*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  📞 *Numéro:* +${numero}\n` +
      `⛧  ✅ *Invitation envoyée avec succès*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    await sendMessage(sock, sender, text)
  } catch(e) {
    await sendMessage(sock, sender, `☠ Impossible d'ajouter ce membre: ${e.message}`)
  }
}
