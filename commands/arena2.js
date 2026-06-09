import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COMBATTANTS = [
  { nom: "Gladiateur d'Acier", force: 850, style: "Corps à corps brutal" },
  { nom: "Mage des Ombres", force: 920, style: "Sorts dévastateurs à distance" },
  { nom: "Assassin Fantôme", force: 780, style: "Frappe critique depuis l'ombre" },
  { nom: "Paladin Sacré", force: 760, style: "Défense + contre-attaque divine" },
  { nom: "Berserk Infernal", force: 1050, style: "Rage totale, ignore la douleur" },
]
export default async function arena2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c1 = COMBATTANTS[Math.floor(Math.random() * COMBATTANTS.length)]
  let c2
  do { c2 = COMBATTANTS[Math.floor(Math.random() * COMBATTANTS.length)] } while (c2.nom === c1.nom)
  const winner = c1.force > c2.force ? c1 : c2
  const margin = Math.abs(c1.force - c2.force)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏟️ *ARÈNE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚔️ *${c1.nom}* VS *${c2.nom}*\n\n` +
    `⛧  🩸 ${c1.nom} — ${c1.force} pts (${c1.style})\n` +
    `✝  🩸 ${c2.nom} — ${c2.force} pts (${c2.style})\n\n` +
    `☩  🏆 *VAINQUEUR: ${winner.nom}* (+${margin} pts)\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
