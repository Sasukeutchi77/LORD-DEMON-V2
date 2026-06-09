import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function surprendre(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const targetStr = target ? `@${target.split('@')[0]}` : 'vous'
  const emoji = '✨'
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ${emoji} *ACTION: SURPRENDRE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n*Action exécutée!* ⚡\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    { mentions: [jid, ...(target ? [target] : [])] }
  )
}
