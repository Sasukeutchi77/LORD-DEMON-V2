// commands/musique.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Dark Metal — Lourds et intense","Lofi Hip-Hop — Chill et creatif","Phonk — Sombre et hypnotique","Classical — Elegant et sophistique","Jazz — Libre et improvise","Trap — Bas et haute energie","Synthwave — Retrowave nocturne","Opera — Dramatique et puissant"]

export default async function cmd_musique(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   GENRE MUSICAL   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
