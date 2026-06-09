import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "Charisme Divin ✨", desc: "Magnétisme absolu — les foules se prosternent", emoji: "✨" },
  { label: "Leader Naturel 👑", desc: "Influence totale, on t'écoute instinctivement", emoji: "👑" },
  { label: "Séducteur Confirmé 🔥", desc: "Charme évident, présence remarquée", emoji: "🔥" },
  { label: "Agréable 😊", desc: "Sympathique et facile à aborder", emoji: "😊" },
  { label: "Discret 👤", desc: "Ni repoussant ni magnétique", emoji: "👤" },
  { label: "Charisme... en construction 😬", desc: "Travaille sur ta présence", emoji: "🔨" },
]
export default async function charisme(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor((100 - num) / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '✨'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✨ *CHARISME-O-MÈTRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *${niveau.label}*\n` +
    `☩  📖 _${niveau.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
