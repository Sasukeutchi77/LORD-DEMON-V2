import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const INTENSITES = [
  { label: "Ovation debout légendaire 👏🌟", desc: "Le public se lève comme un seul homme" },
  { label: "Tonnerre d'applaudissements ⚡👏", desc: "Résonne jusqu'aux ténèbres" },
  { label: "Applaudissements chaleureux 👏", desc: "Sincère et mérité" },
  { label: "Quelques applaudissements polis 🤏", desc: "Courtois mais réservé" },
  { label: "Silence gêné... 😶", desc: "On attendait mieux, franchement" },
]
export default async function clap(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const i = INTENSITES[Math.floor(Math.random() * INTENSITES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👏 *CLAP DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 Pour @${target.split('@')[0]}\n\n` +
    `⛧  ${i.label}\n` +
    `✝  📖 _${i.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
