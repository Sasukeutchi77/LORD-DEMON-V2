// commands/groupstats.js — STATS GROUPE 📊
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { userDb } from '../lib/database.js'

export default async function groupstats(sock, sender, args, msg, ctx = {}) {
  try {
    const groupId = msg.key.remoteJid
    const meta = await sock.groupMetadata(groupId).catch(()=>null)
    if (!meta) return sendMessage(sock, sender, '☠ Utilisez cette commande dans un groupe.')
    const count = meta.participants?.length || 0
    const admins = meta.participants?.filter(p=>p.admin)?.length || 0
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   📊 STATS GROUPE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🏷️ Nom: *${meta.subject}*\n👥 Membres: *${count}*\n👑 Admins: *${admins}*\n📅 Créé: ${new Date(meta.creation*1000).toLocaleDateString('fr-FR')}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, '☠ Erreur: '+e.message) }
}
