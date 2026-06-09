// commands/compliment3.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Tu es la raison pour laquelle l evolution n est pas un accident","Ton existence justifie la theorie de l amour cosmique","Tu brilles plus que les etoiles dans un ciel sans nuage","On te clonerait si la technologie le permettait","Tu es l exception qui confirme la regle"]

export default async function cmd_compliment3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   COMPLIMENT DIVIN   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
