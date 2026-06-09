import { sendMessage } from '../lib/sendMessage.js'
const RECETTES = [
  {
    nom: "Poulet Yassa 🇸🇳", origine: "Sénégal", temps: "45 min", diff: "⭐⭐",
    ingredients: ["1kg poulet", "3 oignons", "2 citrons", "moutarde", "huile", "sel/poivre", "cube bouillon"],
    etapes: ["Mariner le poulet 30min avec citron et moutarde", "Faire dorer à la poêle", "Caraméliser les oignons", "Ajouter le poulet + bouillon", "Laisser mijoter 20 min"]
  },
  {
    nom: "Thiéboudienne 🐟", origine: "Sénégal", temps: "90 min", diff: "⭐⭐⭐",
    ingredients: ["500g riz brisé", "500g poisson", "tomate", "oignons", "légumes variés", "huile de palme"],
    etapes: ["Faire revenir oignons + tomates", "Ajouter poisson et épices", "Incorporer légumes + eau", "Cuire le riz dans ce bouillon"]
  },
  {
    nom: "Jollof Rice 🇬🇭", origine: "Afrique de l'Ouest", temps: "60 min", diff: "⭐⭐",
    ingredients: ["2 tasses riz", "tomates mixées", "oignons", "poivrons", "épices africaines", "huile"],
    etapes: ["Mixer tomates + poivrons + oignons", "Faire revenir le mélange", "Ajouter eau + riz + épices", "Cuire à feu doux 30 min"]
  },
]
export default async function chefrecette(sock, sender, args, msg, ctx = {}) {
  const r = RECETTES[Math.floor(Math.random() * RECETTES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👨‍🍳 *CHEF RECETTE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🍽️ *${r.nom}* — ${r.origine}\n` +
    `⛧  ⏱️ *Temps:* ${r.temps} | *Difficulté:* ${r.diff}\n\n` +
    `✝  🛒 *Ingrédients:*\n${r.ingredients.map(i=>`  • ${i}`).join('\n')}\n\n` +
    `☩  📋 *Étapes:*\n${r.etapes.map((e,i)=>`  ${i+1}. ${e}`).join('\n')}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
