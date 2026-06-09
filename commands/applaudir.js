import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const REACTIONS = [
  "une ovation debout de toute l'assemblée !",
  "des applaudissements qui résonnent jusqu'aux ténèbres !",
  "un tonnerre d'applaudissements légendaire !",
  "un silence respectueux suivi d'une ovation lente",
  "des sifflets d'admiration et des cris de victoire !",
]
export default async function applaudir(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const reaction = REACTIONS[Math.floor(Math.random() * REACTIONS.length)]
  const targetStr = target ? `@${target.split('@')[0]}` : "la performance"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👏 *APPLAUDISSEMENTS*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👏 *@${jid.split('@')[0]}* déclenche ${reaction}\n\n` +
    `⛧  🎭 _Pour:_ *${targetStr}*\n` +
    `✝  _Bravo ! Chapeau bas !_ 🎩\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
