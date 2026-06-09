// commands/cocktail.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Demon Blood — Vodka grenadine tabasco","Dark Angel — Rhum citron glace pilée","Chaos Storm — Whisky triple sec citron vert","Fire Phoenix — Tequila sauce piquante","Night Poison — Gin limonade sirops noirs"]

export default async function cmd_cocktail(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   COCKTAIL (RP)   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
