import { sendMessage } from '../lib/sendMessage.js'
const COCKTAILS = [
  { nom: "Mojito", recette: "Rhum blanc, menthe fraîche, citron vert, sucre, soda", origine: "Cuba 🇨🇺" },
  { nom: "Piña Colada", recette: "Rhum, crème de noix de coco, ananas frais", origine: "Porto Rico 🇵🇷" },
  { nom: "Tequila Sunrise", recette: "Tequila, jus d'orange, grenadine", origine: "Mexique 🇲🇽" },
  { nom: "Cosmopolitan", recette: "Vodka, triple sec, jus de canneberge, citron", origine: "USA 🇺🇸" },
  { nom: "Aperol Spritz", recette: "Aperol, prosecco, eau gazeuse, orange", origine: "Italie 🇮🇹" },
  { nom: "Gin Tonic", recette: "Gin London Dry, tonic premium, citron vert", origine: "Angleterre 🇬🇧" },
  { nom: "Margarita", recette: "Tequila blanco, Cointreau, jus citron vert", origine: "Mexique 🇲🇽" },
  { nom: "Negroni", recette: "Gin, vermouth rosso, Campari 1:1:1", origine: "Italie 🇮🇹" },
  { nom: "Dark & Stormy", recette: "Rhum noir Goslings, ginger beer", origine: "Bermudes 🇧🇲" },
  { nom: "Daiquiri", recette: "Rhum blanc, jus citron vert, sucre de canne", origine: "Cuba 🇨🇺" },
]
export default async function cocktail2(sock, sender, args, msg, ctx = {}) {
  const c = COCKTAILS[Math.floor(Math.random() * COCKTAILS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🍹 *COCKTAIL DU BARMAN*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🍹 *Cocktail:* ${c.nom}\n` +
    `⛧  📋 *Recette:* ${c.recette}\n` +
    `✝  🌍 *Origine:* ${c.origine}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
