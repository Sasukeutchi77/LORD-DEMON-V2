// commands/element3.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const elements = [
  { nom: "🔥 Feu", trait: "Passionné, impulsif, leader", faiblesse: "Eau 💧", force: "Terre 🌍", planete: "Mars" },
  { nom: "💧 Eau", trait: "Intuitif, empathique, adaptable", faiblesse: "Foudre ⚡", force: "Feu 🔥", planete: "Lune" },
  { nom: "🌍 Terre", trait: "Stable, patient, déterminé", faiblesse: "Vent 🌬️", force: "Eau 💧", planete: "Saturne" },
  { nom: "🌬️ Vent", trait: "Libre, intellectuel, créatif", faiblesse: "Feu 🔥", force: "Foudre ⚡", planete: "Mercure" },
  { nom: "⚡ Foudre", trait: "Rapide, puissant, imprévisible", faiblesse: "Terre 🌍", force: "Vent 🌬️", planete: "Jupiter" },
  { nom: "🌑 Ombre", trait: "Mystérieux, sage, patient", faiblesse: "Lumière ✨", force: "Peur 😱", planete: "Pluton" },
  { nom: "✨ Lumière", trait: "Pur, guérisseur, révélateur", faiblesse: "Ombre 🌑", force: "Malédiction 🔮", planete: "Soleil" },
]

export default async function element3(sock, sender, args, msg) {
  const name = msg?.pushName || 'Être'
  const el = elements[Math.floor(Math.random() * elements.length)]
  const text =
    `☩━━━〔 🌌 *ÉLÉMENT PRIMORDIAL* 〕━━━☩\n\n` +
    `☠  👤 *${name}*, ton élément est :\n` +
    `⛧  *${el.nom}*\n\n` +
    `✝  💭 *Traits:* _${el.trait}_\n` +
    `☩  🪐 *Planète:* ${el.planete}\n` +
    `☠  💪 *Fort contre:* ${el.force}\n` +
    `⛧  ⚠️ *Faible contre:* ${el.faiblesse}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
