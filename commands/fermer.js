// commands/fermer.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_fermer(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isOwner && !ctx.isSudo) return sendMessage(sock,sender,'☠ Owner uniquement.'); try { await sock.groupSettingUpdate(msg.key.remoteJid,'announcement'); const result='Groupe ferme — seuls les admins peuvent ecrire.' } catch(e) { const result='Erreur: '+e.message }
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   FERMER LE GROUPE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
