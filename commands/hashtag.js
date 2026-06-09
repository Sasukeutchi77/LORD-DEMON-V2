// commands/hashtag.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_hashtag(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const tags=['#Motivation','#Viral','#Trending','#Dark','#Demon','#Lord','#Power','#Legendary','#Elite','#Unstoppable']; const result=tags[Math.floor(Math.random()*tags.length)]+' '+tags[Math.floor(Math.random()*tags.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   HASHTAG VIRAL   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
