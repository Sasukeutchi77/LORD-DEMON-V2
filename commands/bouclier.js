import { sendMessage } from '../lib/sendMessage.js'
const BOUCLIERS = [
  { nom: "Bouclier de l'Abîsse", defense: 800, special: "Absorbe les sorts magiques", duree: "5 tours" },
  { nom: "Aegis Démoniaque", defense: 1200, special: "Reflète 30% des dégâts", duree: "3 tours" },
  { nom: "Mur de Ténèbres", defense: 600, special: "Invisibilité lors de l'activation", duree: "2 tours" },
  { nom: "Fortification Sacrée", defense: 2000, special: "Immunité absolue 1 tour", duree: "1 tour" },
  { nom: "Armure Spectrale", defense: 900, special: "Revient à 50% PV si brisée", duree: "4 tours" },
]
export default async function bouclier(sock, sender, args, msg, ctx = {}) {
  const b = BOUCLIERS[Math.floor(Math.random() * BOUCLIERS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🛡️ *BOUCLIER DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🛡️ *${b.nom}*\n` +
    `⛧  💪 *Défense:* ${b.defense} pts\n` +
    `✝  ✨ *Capacité:* ${b.special}\n` +
    `☩  ⏱️ *Durée:* ${b.duree}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
