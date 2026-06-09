import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX_ENERGIE = [
  { label: "ÉNERGIE DIVINE ⚡", desc: "Tu traverses les murs avec ta puissance — rien ne peut t'arrêter", emoji: "🌟" },
  { label: "Énergie Maximale 🔥", desc: "Tu es en feu aujourd'hui — profites-en pleinement", emoji: "🔥" },
  { label: "Bonne Énergie 💪", desc: "Bien rechargé et prêt pour le défi", emoji: "💪" },
  { label: "Énergie Correcte 😊", desc: "Moyen mais capable d'accomplir l'essentiel", emoji: "😊" },
  { label: "Énergie Basse 😴", desc: "Repos nécessaire — recharge tes batteries", emoji: "😴" },
  { label: "Énergie Vide 💀", desc: "Mode survie activé — mange et dors immédiatement", emoji: "💀" },
]
export default async function energie(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const pct = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor((100-pct) / 17), NIVEAUX_ENERGIE.length-1)
  const niv = NIVEAUX_ENERGIE[idx]
  const filled = Math.floor(pct / 10)
  const bar = '⚡'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚡ *NIVEAU D'ÉNERGIE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${pct}%*\n\n` +
    `✝  ${niv.emoji} *${niv.label}*\n` +
    `☩  📖 _${niv.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
