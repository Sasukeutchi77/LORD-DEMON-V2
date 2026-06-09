import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COCKTAILS = [
  { nom: "Demon Blood", recette: "Vodka + Grenadine + Tabasco", effet: "Feu dans les veines +50 ATK" },
  { nom: "Dark Angel", recette: "Rhum + Citron + Glace pilée", effet: "Agilité +30, vision nocturne" },
  { nom: "Chaos Storm", recette: "Whisky + Triple sec + Citron vert", effet: "Folie contrôlée, dégâts imprévisibles" },
  { nom: "Fire Phoenix", recette: "Tequila + Sauce piquante + Sel noir", effet: "Régénération 10%/tour pendant 3 tours" },
  { nom: "Night Poison", recette: "Gin + Limonade + Sirop d'ombre", effet: "Invisibilité 2 tours" },
  { nom: "Elixir du Démon", recette: "Absinthe + Sang de dragon + Essence noire", effet: "Tous stats +100 temporairement" },
]
export default async function cocktail(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = COCKTAILS[Math.floor(Math.random() * COCKTAILS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🍹 *COCKTAIL DÉMONIAQUE (RP)*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🍹 *Nom:* ${c.nom}\n` +
    `⛧  📋 *Recette:* ${c.recette}\n` +
    `✝  ✨ *Effet RP:* ${c.effet}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
