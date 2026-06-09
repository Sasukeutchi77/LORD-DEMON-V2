import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COULEURS = [
  { couleur: "Rouge Passion ❤️", signif: "Amour, désir, intensité émotionnelle", energie: "Feu ardent" },
  { couleur: "Noir Mystique ⛧", signif: "Pouvoir, élégance, mystère profond", energie: "Ombres éternelles" },
  { couleur: "Or Royal 👑", signif: "Richesse, noblesse, succès absolu", energie: "Lumière divine" },
  { couleur: "Violet Céleste 💜", signif: "Sagesse, spiritualité, magie ancienne", energie: "Mystère cosmique" },
  { couleur: "Blanc Pur 🤍", signif: "Pureté, innocence, renouveau total", energie: "Lumière sacrée" },
  { couleur: "Bleu Glacial 💙", signif: "Calme, profondeur, intuition forte", energie: "Eau abyssale" },
  { couleur: "Vert Poison 💚", signif: "Nature, croissance, mais aussi danger", energie: "Venin naturel" },
]
export default async function couleurdame(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const c = COULEURS[Math.floor(Math.random() * COULEURS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎨 *COULEUR DE L'ÂME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🎨 *Couleur:* ${c.couleur}\n` +
    `✝  📖 *Signification:* ${c.signif}\n` +
    `☩  ✨ *Énergie:* ${c.energie}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
