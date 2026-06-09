import { sendMessage } from '../lib/sendMessage.js'
const RECETTES = [
  { nom: "Élixir de Force", ingredients: "🌿 Herbe + 🔥 Flamme + 💎 Cristal", effet: "+200 ATK pendant 3 tours", rareté: "Rare" },
  { nom: "Potion de Vie", ingredients: "🌺 Rose noire + 💧 Eau de source + ☠ Os broyés", effet: "+500 PV instantanés", rareté: "Commun" },
  { nom: "Elixir Démoniaque", ingredients: "🩸 Sang de démon + ⛧ Essence noire + 🌑 Poudre lunaire", effet: "+100% dégâts 1 tour", rareté: "Légendaire" },
  { nom: "Huile de Combat", ingredients: "⚔️ Acier + 🔥 Soufre + 💀 Cendres", effet: "Arme +150 ATK permanent", rareté: "Épique" },
  { nom: "Brume Fantôme", ingredients: "🌫️ Brume + 👁️ Oeil de hibou + 🕯️ Cire noire", effet: "Invisibilité 5 tours", rareté: "Rare" },
]
export default async function alchimie(sock, sender, args, msg, ctx = {}) {
  const r = RECETTES[Math.floor(Math.random() * RECETTES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚗️ *ALCHIMIE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🧪 *Recette:* ${r.nom}\n` +
    `⛧  📦 *Ingrédients:* ${r.ingredients}\n` +
    `✝  ✨ *Effet:* ${r.effet}\n` +
    `☩  💎 *Rareté:* ${r.rareté}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
