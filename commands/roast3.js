// commands/roast3.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Tu as l intelligence d une calculette a piles mortes","Ton niveau de jeu est tellement bas que les NPC te pitient","Ton optimisme est inversement proportionnel a ta competence","Meme les bots automatiques te blockent","Tu meriterais le badge Specialiste de l echec"]

export default async function cmd_roast3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   ROAST DEMONIAQUE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
