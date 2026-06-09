import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ACTIONS = [
  "pose un bisou tendre sur la joue 😘",
  "envoie un bisou volant avec amour 💋",
  "offre un bisou sonore sur le front 😚",
  "surprend avec un bisou inattendu 💕",
  "pose un bisou respectueux sur la main 👄",
]
export default async function bisou(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .bisou @user`)
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💋 *BISOU (RP)*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *@${jid.split('@')[0]}* ${action} à *@${target.split('@')[0]}*\n\n` +
    `⛧  💕 _Un moment de douceur dans les ténèbres..._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
