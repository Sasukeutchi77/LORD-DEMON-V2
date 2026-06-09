import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "Saint vivant ✨", emoji: "👼" },
  { label: "Très béni", emoji: "✝️" },
  { label: "Béni", emoji: "☩" },
  { label: "Normal", emoji: "😐" },
  { label: "Légèrement maudit", emoji: "☠" },
  { label: "Cherchez un exorciste !", emoji: "😈" },
]
export default async function beni(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor((100 - num) / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '🙏'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✝️ *NIVEAU DE BÉNÉDICTION*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *Statut:* ${niveau.label}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
