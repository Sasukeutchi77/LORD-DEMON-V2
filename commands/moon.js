// commands/moon.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_moon(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const phases=['🌑 Nouvelle Lune','🌒 Premier Croissant','🌓 Premier Quartier','🌔 Lune Gibbeuse Croissante','🌕 Pleine Lune','🌖 Lune Gibbeuse Decroissante','🌗 Dernier Quartier','🌘 Dernier Croissant']; const result=phases[Math.floor(Date.now()/2551442800*8)%8]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   PHASE DE LUNE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
