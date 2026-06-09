// commands/streakbattle.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_streakbattle(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const s=Math.floor(Math.random()*30); const result='*'+s+' victoires consecutives*\n'+(s>=20?'IMBATTABLE !':s>=10?'En feu !':s>=5?'Bien parti !':'Continue !')
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   BATTLE STREAK   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 @' + target.split('@')[0] + '\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
