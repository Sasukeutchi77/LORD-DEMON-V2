import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "Beauté Mythique ✨", desc: "Divinité incarnée — au-delà du réel", emoji: "👑" },
  { label: "Beauté Légendaire 🌟", desc: "Rare et inoubliable — 1 sur un million", emoji: "✨" },
  { label: "Beauté Épique 💎", desc: "Impressionnant — regard qui captive", emoji: "💎" },
  { label: "Beau(belle) 💫", desc: "Charme évident, agréable à regarder", emoji: "😍" },
  { label: "Correct(e) 🙂", desc: "Rien à redire, dans la moyenne haute", emoji: "😊" },
  { label: "Ordinaire 😐", desc: "On a vu mieux... mais aussi bien pire", emoji: "😐" },
]
export default async function beaute(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor((100 - num) / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '💖'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💄 *INDICE DE BEAUTÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *${niveau.label}*\n` +
    `☩  📖 _${niveau.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
