// commands/tirage.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_tirage(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
  if (!mentions.length) return sendMessage(sock, sender, 'Mentionnez les participants !')
  const winner = mentions[Math.floor(Math.random() * mentions.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TIRAGE AU SORT   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🏆 Gagnant: @' + winner.split('@')[0] + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    { mentions }
  )
}
