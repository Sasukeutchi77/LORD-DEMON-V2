// commands/anime2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Attack on Titan — Action/Drame","Demon Slayer — Combat/Emotion","Death Note — Thriller/Psychologique","Fullmetal Alchemist Brotherhood — Aventure/Philosophie","Jujutsu Kaisen — Surnaturel/Combat","One Piece — Aventure/Amitie","Steins Gate — Sci-Fi/Drama","Re:Zero — Isekai/Psychologique"]

export default async function cmd_anime2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   ANIME RECOMMANDE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
