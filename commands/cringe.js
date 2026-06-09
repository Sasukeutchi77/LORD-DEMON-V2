import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { label: "CRINGE APOCALYPTIQUE 😱", desc: "Fuite immédiate de toutes les personnes autour", emoji: "🚨" },
  { label: "Cringe Légendaire 💀", desc: "On s'en souvient encore 10 ans plus tard", emoji: "💀" },
  { label: "Cringe Notable 😬", desc: "Le groupe est silencieux pendant 5 minutes", emoji: "😬" },
  { label: "Légèrement Cringe 😅", desc: "Un peu gênant mais on survit", emoji: "😅" },
  { label: "Neutre 😐", desc: "Ni cringe ni cool", emoji: "😐" },
  { label: "Anti-Cringe 😎", desc: "Niveau de coolitude impeccable", emoji: "😎" },
]
export default async function cringe(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.min(Math.floor(num / (100 / NIVEAUX.length)), NIVEAUX.length - 1)
  const niveau = NIVEAUX[idx]
  const filled = Math.floor(num / 10)
  const bar = '😬'.repeat(filled) + '░'.repeat(10 - filled)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   😬 *CRINGE-O-MÈTRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${num}%*\n\n` +
    `✝  ${niveau.emoji} *${niveau.label}*\n` +
    `☩  📖 _${niveau.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
