// commands/setnom.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_setnom(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) return sendMessage(sock,sender,'☠ Reserves aux admins.'); const nom=args.join(' '); if(!nom) return sendMessage(sock,sender,'Usage: .setnom <nom>'); try { await sock.groupUpdateSubject(msg.key.remoteJid,nom); const result='Nom du groupe mis a jour: *'+nom+'*' } catch(e) { const result='Erreur: '+e.message }
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CHANGER NOM GROUPE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
