import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DANSES = [
  { danse: "Azonto 🇬🇭", style: "Afrobeat décontracté, mouvements de bras fluides" },
  { danse: "Coupé-Décalé 🇨🇮", style: "Mouvement festif ivoirien, bras et hanches" },
  { danse: "Ndombolo 🇨🇩", style: "Rumba congolaise explosive, hanches et épaules" },
  { danse: "Gwaragwara 🇿🇦", style: "Hip-hop sud-africain, chaque membre indépendant" },
  { danse: "Moonwalk 🌙", style: "Glissement mythique à la Michael Jackson" },
  { danse: "Breaking ⚡", style: "Figures acrobatiques au sol, spinning" },
  { danse: "Amapiano 🎵", style: "Log drum, vibe sud-africaine moderne" },
]
export default async function dance(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const d = DANSES[Math.floor(Math.random() * DANSES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💃 *DANSE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]} danse le...\n\n` +
    `⛧  💃 *${d.danse}*\n` +
    `✝  📖 _${d.style}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
