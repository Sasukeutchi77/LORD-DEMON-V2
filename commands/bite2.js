import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const TAILLES = [
  { label: "🌵 Cactus de compétition", note: "Légendaire !" },
  { label: "🗼 Tour Eiffel miniature", note: "Hors norme" },
  { label: "🍌 Banane tropicale", note: "Impressionnant" },
  { label: "🌭 Hotdog standard", note: "Respectable" },
  { label: "🌽 Maïs de saison", note: "Convenable" },
  { label: "🔩 Vis de vélo", note: "On fait avec..." },
  { label: "🦠 Sous le microscope", note: "Cherchez mieux" },
]
export default async function bite2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const taille = Math.floor(Math.random() * 30) + 1
  const idx = Math.min(Math.floor((30 - taille) / (30 / TAILLES.length)), TAILLES.length - 1)
  const niveau = TAILLES[idx]
  const bar = '█'.repeat(Math.floor(taille/3)) + '░'.repeat(10 - Math.floor(taille/3))
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📏 *MESUREUR ULTIME (RP)*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  [${bar}] *${taille} cm*\n` +
    `✝  ${niveau.label}\n` +
    `☩  📊 _${niveau.note}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
