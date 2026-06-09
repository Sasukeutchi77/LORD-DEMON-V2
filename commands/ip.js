// commands/ip.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_ip(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const result='IP du serveur bot: Non expose\nConseil: Utilisez .google pour rechercher votre IP publique'
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   INFOS IP   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
