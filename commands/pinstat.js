// commands/pinstat.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_pinstat(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const result='Fonctionnalite de pin disponible dans les groupes WhatsApp. Utilisez repondre + .pin pour epingler un message.'
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   STATS EPINGLAGE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
