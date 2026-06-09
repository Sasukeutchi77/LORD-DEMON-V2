import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "Enfant du futur 🚀", desc: "Né trop tôt, pense trop en avance", emoji: "🚀" },
  { label: "Zoomer Digital 📱", desc: "100% dans son époque, maîtrise tout", emoji: "📱" },
  { label: "Millénial Équilibré ⚖️", desc: "Un pied dans l'ancien, l'autre dans le futur", emoji: "⚖️" },
  { label: "Boomer Modéré 🕹️", desc: "Nostalgique mais s'adapte encore", emoji: "🕹️" },
  { label: "Boomer Authentique 📻", desc: "Préfère les choses comme avant", emoji: "📻" },
  { label: "Né au mauvais siècle ⏳", desc: "Complètement dépassé par son époque", emoji: "⏳" },
]
export default async function boomer(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor(num / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '📻'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📻 *BOOMER-O-MÈTRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *${niveau.label}*\n` +
    `☩  📖 _${niveau.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
