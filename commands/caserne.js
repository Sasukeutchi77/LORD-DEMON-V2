import { sendMessage } from '../lib/sendMessage.js'
const UNITES = [
  { nom: "Garde Démoniaque", type: "Infanterie lourde", force: 850, defense: 700, special: "Aura de terreur — ennemis -30% ATK" },
  { nom: "Cavalerie de l'Ombre", type: "Unité mobile", force: 1100, defense: 400, special: "Charge fantôme — ignore obstacles" },
  { nom: "Archers Maudits", type: "Distance", force: 950, defense: 350, special: "Flèches empoisonnées — dégâts sur durée" },
  { nom: "Mages de Sang", type: "Magie de guerre", force: 1300, defense: 250, special: "Sort de zone — touche tous les ennemis" },
  { nom: "Titans de Pierre", type: "Siège", force: 2000, defense: 1500, special: "Indestructible — résiste 3 coups fatals" },
]
export default async function caserne(sock, sender, args, msg, ctx = {}) {
  const u = UNITES[Math.floor(Math.random() * UNITES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏰 *CASERNE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚔️ *Unité:* ${u.nom}\n` +
    `⛧  🎭 *Type:* ${u.type}\n` +
    `✝  💥 *Force:* ${u.force} | 🛡️ *Défense:* ${u.defense}\n` +
    `☩  ⭐ *Capacité spéciale:* ${u.special}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
