import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const REACTIONS = [
  { action: "chatouille les côtes sans pitié 😂", reaction: "HAHAHA non non arrête !! 😭" },
  { action: "attaque avec les dix doigts 🤭", reaction: "AHH c'est trop !! Je peux plus respirer ! 💀" },
  { action: "trouve la zone sensible 🌀", reaction: "NON PAS LÀ NOOOON 😱" },
  { action: "chatouille sans aucune clémence ⚡", reaction: "AU SECOURS QUELQU'UN !! 🆘😂" },
  { action: "s'acharne pendant 10 secondes 🔥", reaction: "Ok ok j'abandonne tu as gagné... 😮‍💨" },
]
export default async function chatouiller(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .chatouiller @quelqu'un`)
  const r = REACTIONS[Math.floor(Math.random() * REACTIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   😂 *CHATOUILLES DÉMONIAQUES*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  😈 @${jid.split('@')[0]} *${r.action}* @${target.split('@')[0]}\n\n` +
    `⛧  😂 @${target.split('@')[0]}: _"${r.reaction}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
