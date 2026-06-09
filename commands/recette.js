// commands/recette.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Tarte aux pommes et cannelle","Ramen Miso Spicy","Poulet mariné aux herbes","Brownie ultra fondant","Salade Nicoise revisitee","Curry de pois chiches","Crepes au nutella","Gazpacho andalou","Risotto aux champignons","Buddha bowl arc-en-ciel"]

export default async function cmd_recette(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   RECETTE ALEATOIRE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
