import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "GIGACHAD COSMIQUE 👑", desc: "Déité de la masculinité — au-delà du réel", emoji: "👑" },
  { label: "CHAD LÉGENDAIRE ⚡", desc: "Indomptable, admiré de tous", emoji: "⚡" },
  { label: "Chad Confirmé 🔥", desc: "Respect total, aucun doute", emoji: "🔥" },
  { label: "Chad en Devenir 💪", desc: "En chemin vers la grandeur", emoji: "💪" },
  { label: "Normal 😐", desc: "Ni chad, ni anti-chad", emoji: "😐" },
  { label: "Anti-Chad 😬", desc: "Retourne dans ta caverne", emoji: "🦤" },
]
export default async function chad(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor((100 - num) / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '💪'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👑 *CHAD-O-MÈTRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *${niveau.label}*\n` +
    `☩  📖 _${niveau.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
