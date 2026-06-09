import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ACTIONS = ["*te chatouille les côtes* 🤭","*attaque avec les doigts* 😂","*chatouilles intensives* 🌀","*chatouille sans pitié* 😱"]
export default async function chatouiller(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const targetStr = target ? `@${target.split('@')[0]}` : 'vous'
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🤭 *CHATOUILLES*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n${action}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    { mentions: [jid, ...(target ? [target] : [])] }
  )
}
