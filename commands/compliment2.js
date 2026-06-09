// commands/compliment2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ACTIONS = ["Tu es une personne extraordinaire ✨","Ta présence illumine la pièce 🌟","Tu es unique en ton genre 💎","On est chanceux de t'avoir 🙏"]

export default async function compliment_v2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const mentions = target ? [target] : []
  const targetStr = target ? `@${target.split('@')[0]}` : `vous`
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💐 COMPLIMENT   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n${action}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions: [jid, ...mentions] } : { mentions: [jid] }
  )
}
