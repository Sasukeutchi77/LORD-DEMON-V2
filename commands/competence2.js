import { sendMessage } from '../lib/sendMessage.js'
const COMPETENCES = [
  { nom: "Frappe de l'Abîsse", type: "Combat", niveau: "Maître", effet: "Dégâts x3 sur les démons ennemis", cd: "3 tours" },
  { nom: "Bouclier Spectral", type: "Défense", niveau: "Légende", effet: "Absorbe 2000 dégâts, reflète 30%", cd: "5 tours" },
  { nom: "Invocation des Ombres", type: "Magie", niveau: "Élite", effet: "Invoque 3 entités spectrales de combat", cd: "4 tours" },
  { nom: "Régénération Sombre", type: "Soutien", niveau: "Expert", effet: "Restaure 40% PV max instantanément", cd: "6 tours" },
  { nom: "Explosion Infernale", type: "Ultimate", niveau: "Divin", effet: "Dégâts massifs zone, ignore toute armure", cd: "10 tours" },
]
export default async function competence2(sock, sender, args, msg, ctx = {}) {
  const c = COMPETENCES[Math.floor(Math.random() * COMPETENCES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚡ *COMPÉTENCE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🌟 *Nom:* ${c.nom}\n` +
    `⛧  🏷️ *Type:* ${c.type} | *Niveau:* ${c.niveau}\n` +
    `✝  ✨ *Effet:* ${c.effet}\n` +
    `☩  ⏱️ *Rechargement:* ${c.cd}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
