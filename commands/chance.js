import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "Sniper de Légende 🎯", desc: "Ne rate jamais sa cible — destin favorisé", emoji: "🎯" },
  { label: "Très Chanceux ⭐", desc: "La fortune te sourit régulièrement", emoji: "⭐" },
  { label: "Correct 😊", desc: "Ni trop lucky ni pas assez", emoji: "😊" },
  { label: "Passable 😐", desc: "Parfois ça passe, souvent ça rate", emoji: "😐" },
  { label: "Malchanceux 😬", desc: "L'univers te tourne le dos", emoji: "😬" },
  { label: "Malédiction Totale ☠️", desc: "Tu touches pas l'eau dans un bain", emoji: "☠️" },
]
export default async function chance(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor((100 - num) / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '🍀'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🍀 *COMPTEUR DE CHANCE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *${niveau.label}*\n` +
    `☩  📖 _${niveau.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
