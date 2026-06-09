import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ELEMENTS = [
  { nom: "Feu 🔥", type: "Offensif", force: "Eau", faiblesse: "Terre", pouvoir: "Flammes dévorantes" },
  { nom: "Eau 💧", type: "Défensif", force: "Feu", faiblesse: "Foudre", pouvoir: "Vagues guérisseuses" },
  { nom: "Terre 🌍", type: "Équilibré", force: "Foudre", faiblesse: "Feu", pouvoir: "Murs invincibles" },
  { nom: "Foudre ⚡", type: "Agile", force: "Eau", faiblesse: "Terre", pouvoir: "Éclairs paralysants" },
  { nom: "Vent 🌪️", type: "Rapide", force: "Terre", faiblesse: "Feu", pouvoir: "Tempêtes ravageuses" },
  { nom: "Ombre ⛧", type: "Mystique", force: "Lumière", faiblesse: "Soleil", pouvoir: "Ténèbres absolues" },
  { nom: "Lumière ☀️", type: "Sacré", force: "Ombre", faiblesse: "Feu", pouvoir: "Rayonnement divin" },
]
export default async function element2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const e = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌀 *ÉLÉMENT MYSTIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🌀 *Élément:* ${e.nom}\n` +
    `✝  🏷️ *Type:* ${e.type}\n` +
    `☩  ⚡ *Pouvoir:* ${e.pouvoir}\n` +
    `☠  ✅ *Fort contre:* ${e.force}\n` +
    `⛧  ❌ *Faible contre:* ${e.faiblesse}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
