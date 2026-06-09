// commands/membercount.js — NOMBRE DE MEMBRES 👥
import { sendMessage } from '../lib/sendMessage.js'
export default async function membercount(sock, sender, args, msg) {
  try {
    const meta = await sock.groupMetadata(msg.key.remoteJid)
    await sendMessage(sock, sender, `☩━━━〔 ⛧ *MEMBERCOUNT* 〕━━━☩

👥 *Membres du groupe:* ${meta.participants?.length || 0}

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, '☠ Utilisez dans un groupe.') }
}
