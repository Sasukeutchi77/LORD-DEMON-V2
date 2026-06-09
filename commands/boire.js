import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BOISSONS = [
  { nom: "Café Noir", effet: "Regain d'énergie +50, vigilance accrue" },
  { nom: "Thé des Anciens", effet: "Sagesse +30, calme l'esprit agité" },
  { nom: "Potion de Force", effet: "ATK +100 pendant 10 minutes" },
  { nom: "Élixir Démoniaque", effet: "Tous les stats +50, yeux rouges" },
  { nom: "Eau Bénite ✝", effet: "Purification totale, annule malédictions" },
  { nom: "Bubble Tea", effet: "Humeur +100, sourire impossible à cacher" },
  { nom: "Mead du Valhalla", effet: "Courage maximal, peur de rien" },
  { nom: "Cocktail Infernal", effet: "Folie contrôlée, dégâts +200% imprévisible" },
]
export default async function boire(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const boisson = BOISSONS[Math.floor(Math.random() * BOISSONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🍷 *BOIRE (RP)*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *@${jid.split('@')[0]}* lève son verre de *${boisson.nom}*\n\n` +
    `⛧  ✨ *Effet:* ${boisson.effet}\n` +
    `✝  _Sante ! 🥂_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
