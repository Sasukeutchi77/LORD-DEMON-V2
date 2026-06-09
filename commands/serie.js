// commands/serie.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Breaking Bad — Crime/Drama","Dark — Science-Fiction","Squid Game — Thriller/Action","Game of Thrones — Fantasy","Black Mirror — Anticipation","The Boys — Superheros/Satire","Mindhunter — Thriller/Crime","Stranger Things — Horreur/Aventure"]

export default async function cmd_serie(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   SERIE TV   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
