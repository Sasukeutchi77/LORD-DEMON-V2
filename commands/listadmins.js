// commands/listadmins.js — LISTE DES ADMINS 👑
import { sendMessage } from '../lib/sendMessage.js'
export default async function listadmins(sock, sender, args, msg) {
  try {
    const meta = await sock.groupMetadata(msg.key.remoteJid)
    const admins = meta.participants.filter(p=>p.admin)
    const lines = admins.map(a=>`👑 @${a.id.split('@')[0]}`).join('\n')
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   👑 ADMINS   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${lines || 'Aucun admin'}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: admins.map(a=>a.id) }
    )
  } catch(e) { await sendMessage(sock, sender, '☠ Utilisez dans un groupe.') }
}
