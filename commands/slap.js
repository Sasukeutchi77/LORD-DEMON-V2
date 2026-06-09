// commands/slap.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ACTIONS = ["*gifle violemment* 👋💥","*CLAP !* 🤚😤","*gifle avec l'élan du bras droit* 💢","*baffe monumentale* 👐"]

export default async function slap(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const mentions = target ? [target] : []
  const targetStr = target ? `@${target.split('@')[0]}` : `vous`
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   👋 GIFLE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n${action}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions: [jid, ...mentions] } : { mentions: [jid] }
  )
}
