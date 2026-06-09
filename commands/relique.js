// commands/relique.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const reliques = [
  { nom: "💎 Orbe de Ténèbres", origine: "Abysses primordiales", pouvoir: "Absorbe l'énergie des ennemis vaincus", condition: "Actif sous la lune noire", puissance: 9500 },
  { nom: "⚡ Foudre de Zeus", origine: "Olympe", pouvoir: "Frappe tout obstacle sur le chemin", condition: "Utilisable une fois par bataille", puissance: 9800 },
  { nom: "🌑 Oeil du Néant", origine: "Dimension parallèle", pouvoir: "Voit à travers toutes les illusions", condition: "Permanent mais épuisant", puissance: 8700 },
  { nom: "🔮 Cristal d'Éternité", origine: "Avant les temps", pouvoir: "Stoppe le temps pendant 10 secondes", condition: "Rechargement : 24h", puissance: 9999 },
  { nom: "🩸 Coupe de Sang", origine: "Premier sacrifice démoniaque", pouvoir: "Lie irrémédiablement deux âmes", condition: "Irrévocable une fois utilisée", puissance: 7500 },
]

export default async function relique(sock, sender, args, msg) {
  const name = msg?.pushName || 'Gardien'
  const r = reliques[Math.floor(Math.random() * reliques.length)]
  const text =
    `☩━━━〔 💎 *RELIQUE ANCIENNE* 〕━━━☩\n\n` +
    `☠  👤 *${name}* découvre :\n\n` +
    `⛧  *${r.nom}*\n\n` +
    `✝  🌍 *Origine:* ${r.origine}\n` +
    `☩  ⚡ *Pouvoir:* ${r.pouvoir}\n` +
    `☠  📋 *Condition:* ${r.condition}\n` +
    `⛧  💫 *Puissance:* ${r.puissance}/10000\n\n` +
    `✝  _Une relique unique dans tout l'univers démoniaque._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
