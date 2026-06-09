import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BENEDICTIONS = [
  { nom: "Grâce Divine", effet: "+100% régénération PV, immunité malédictions", duree: "Permanente" },
  { nom: "Aura de Foudre", effet: "Riposte électrique à chaque attaque reçue", duree: "5 tours" },
  { nom: "Lumière Éternelle", effet: "Révèle ennemis cachés, vision totale", duree: "3 tours" },
  { nom: "Mur Infranchissable", effet: "Immunité physique complète", duree: "3 tours" },
  { nom: "Bénédiction du Feu", effet: "+100 ATQ feu, brûle les adjacents auto", duree: "4 tours" },
  { nom: "Corps Cristallin", effet: "+500 DEF, dégâts magiques convertis en PV", duree: "2 tours" },
  { nom: "Toucher Guérisseur", effet: "Soigne 30% PV de chaque allié au contact", duree: "Instantané" },
  { nom: "Couronne Sainte", effet: "Double les effets de soutien, aura divine", duree: "Combat entier" },
]
export default async function benediction3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const b = BENEDICTIONS[Math.floor(Math.random() * BENEDICTIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✨ *BÉNÉDICTION DIVINE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🙏 *${b.nom}*\n` +
    `⛧  ✨ *Effet:* ${b.effet}\n` +
    `✝  ⏱️ *Durée:* ${b.duree}\n` +
    `☩  👤 *Béni:* @${target.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
