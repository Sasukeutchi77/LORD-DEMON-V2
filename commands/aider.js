// commands/aider.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Je suis la pour toi.","Dis-moi ce dont tu as besoin.","Ensemble on est plus forts.","Je te couvre dans cette bataille.","Tu peux compter sur moi."]

export default async function cmd_aider(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   AIDER   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
