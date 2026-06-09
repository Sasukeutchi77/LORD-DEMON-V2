import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const AURAS = [
  { couleur: "Or Légendaire", signif: "Grandeur et puissance absolue", effet: "Attire le respect universel", emoji: "✨" },
  { couleur: "Violet Mystique", signif: "Sagesse et magie profonde", effet: "Connexion aux forces occultes", emoji: "🔮" },
  { couleur: "Bleu Glacial", signif: "Calme et contrôle total", effet: "Immunité aux provocations", emoji: "🧊" },
  { couleur: "Rouge Infernal", signif: "Rage et force explosive", effet: "Dégâts de feu au combat", emoji: "🔥" },
  { couleur: "Vert Abyssal", signif: "Guérison et nature sauvage", effet: "Régénération passive permanente", emoji: "🌿" },
  { couleur: "Noir Démoniaque ⛧", signif: "Terreur et domination totale", effet: "Les ennemis reculent instinctivement", emoji: "⛧" },
  { couleur: "Blanc Divin", signif: "Pureté et protection divine", effet: "Bouclier céleste permanent", emoji: "👼" },
]
export default async function aura(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const a = AURAS[Math.floor(Math.random() * AURAS.length)]
  const intensity = Math.floor(Math.random() * 30) + 70
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${a.emoji} *AURA SPIRITUELLE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🌟 *Aura:* ${a.couleur}\n` +
    `✝  📖 *Signification:* ${a.signif}\n` +
    `☩  ✨ *Effet:* ${a.effet}\n` +
    `☠  📊 *Intensité:* ${intensity}%\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
