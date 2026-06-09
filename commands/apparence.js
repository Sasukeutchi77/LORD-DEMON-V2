import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const APPARENCES = [
  { style: "Guerrier des Ombres", traits: "Cicatrices rituelles, regard de glace", tenue: "Armure noire gravée de runes", aura: "Intimidante — ennemis -20% moral" },
  { style: "Noble Démoniaque", traits: "Élégance froide, sourire qui cache tout", tenue: "Cape écarlate, bijoux d'os", aura: "Mystérieuse — attire l'attention involontairement" },
  { style: "Spectre de Combat", traits: "Silhouette floue, yeux lumineux", tenue: "Vêtements qui absorbent la lumière", aura: "Terrifiante — adversaires reculent instinctivement" },
  { style: "Mage des Abysses", traits: "Cheveux blancs, mains tatouées", tenue: "Robe couverte de glyphes vivants", aura: "Arcanique — distorsion de l'espace autour" },
  { style: "Champion Infernal", traits: "Musculature imposante, cicatrices en or", tenue: "Armure de cuir bestial, cape de pelage rare", aura: "Dominante — les gens s'écartent naturellement" },
]
export default async function apparence(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const a = APPARENCES[Math.floor(Math.random() * APPARENCES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👁️ *APPARENCE RPG*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *@${target.split('@')[0]}*\n\n` +
    `⛧  🎭 *Style:* ${a.style}\n` +
    `✝  💬 *Traits:* ${a.traits}\n` +
    `☩  👘 *Tenue:* ${a.tenue}\n` +
    `☠  ✨ *Aura:* ${a.aura}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
