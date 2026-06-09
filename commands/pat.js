// commands/pat.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ACTIONS = ["*caresse doucement la tête* 🥰","*tapote gentiment* 💕","*petite caresse affectueuse* 🫶","*pat pat* ❤️"]

export default async function pat(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const mentions = target ? [target] : []
  const targetStr = target ? `@${target.split('@')[0]}` : `vous`
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🫶 CARESSE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n${action}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions: [jid, ...mentions] } : { mentions: [jid] }
  )
}
