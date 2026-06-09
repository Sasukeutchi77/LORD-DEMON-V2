// commands/seduire.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Ton sourire pourrait declencher des alarmes d incendie","Tu es la raison pour laquelle j ai besoin de lunettes de soleil","Tes yeux brillent plus que mon ecran a 100%","Tu fais battre mon CPU trop vite","Je demande a Google ton prenom pour pas l oublier"]

export default async function cmd_seduire(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   SEDUIRE (FUN)   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
