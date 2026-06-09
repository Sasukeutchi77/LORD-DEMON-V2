import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const TERRITOIRES = [
  { nom: "Forteresse des Cendres", taille: "Grand territoire", garnison: 500, richesse: 8500, bonus: "Production de fer +200%" },
  { nom: "Citadelle Infernale", taille: "Territoire légendaire", garnison: 1200, richesse: 15000, bonus: "Armée démoniaque recrutable" },
  { nom: "Village des Ombres", taille: "Petit territoire", garnison: 80, richesse: 1200, bonus: "Informateurs secrets" },
  { nom: "Port du Crâne", taille: "Territoire côtier", garnison: 300, richesse: 6000, bonus: "Commerce maritime" },
  { nom: "Ruines Antiques", taille: "Territoire mystique", garnison: 0, richesse: 3000, bonus: "Accès à des sorts interdits" },
]
export default async function conquete(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const t = TERRITOIRES[Math.floor(Math.random() * TERRITOIRES.length)]
  const victoire = Math.random() > 0.3
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌑 *CONQUÊTE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏰 *Cible:* ${t.nom}\n` +
    `⛧  📐 *Taille:* ${t.taille}\n` +
    `✝  ⚔️ *Garnison:* ${t.garnison} soldats\n` +
    `☩  💰 *Richesse:* ${t.richesse.toLocaleString()} 🪙\n\n` +
    `☠  ${victoire ? `✅ *VICTOIRE ! Territoire conquis !*\n⛧  ✨ *Bonus:* ${t.bonus}` : `❌ *DÉFAITE — résistance trop forte*`}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
