// commands/blague.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Pourquoi les plongeurs plongent-ils toujours en arriere ? Parce que sinon ils tomberaient dans le bateau.","C est l histoire d un homme qui entre dans un bar... il dit Aie.","Qu est ce qu un crocodile qui surveille des grains ? Un alligateur.","Comment appelle-t-on un chat tombe dans un pot de peinture le jour de Noel ? Un chat-peint de Noel.","Qu est ce que un canif ? Un petit fien."]

export default async function cmd_blague(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   BLAGUE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
