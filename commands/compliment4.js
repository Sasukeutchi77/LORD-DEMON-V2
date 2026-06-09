import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COMPLIMENTS = [
  "Ta présence illumine même les recoins les plus sombres de ce groupe. ✨",
  "Tu as l'intelligence d'un stratège et le cœur d'un lion. 🦁",
  "Rare sont ceux qui rayonnent comme toi — continue d'éblouir le monde.",
  "Ton sourire brise même les armures les plus épaisses. 💫",
  "Tu es la preuve vivante que grandeur et humilité peuvent coexister. 👑",
  "Chaque mot que tu prononces porte le poids de la sagesse. 📿",
  "Tu portes en toi une lumière que personne ne peut éteindre. 🔥",
  "Les étoiles t'observent avec admiration. ⭐",
]
export default async function compliment4(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const c = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💬 *COMPLIMENT DIVIN*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  💬 _"${c}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
