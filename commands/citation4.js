import { sendMessage } from '../lib/sendMessage.js'
const CITATIONS_POWER = [
  { texte: "Il ne faut pas rêver sa vie mais vivre ses rêves.", auteur: "Inconnnu" },
  { texte: "La patience est amère, mais son fruit est doux.", auteur: "Jean-Jacques Rousseau" },
  { texte: "La connaissance est la seule richesse qu'on ne peut pas voler.", auteur: "Proverbe africain" },
  { texte: "Un homme qui ne cesse d'apporter du feu garde chaud son entourage.", auteur: "Sagesse Bambara" },
  { texte: "Même les étoiles ont besoin de l'obscurité pour briller.", auteur: "Inconnu" },
  { texte: "La gratitude transforme ce que nous avons en assez.", auteur: "Melody Beattie" },
  { texte: "Chaque jour est une nouvelle page de ton histoire — écris quelque chose de beau.", auteur: "Proverbe sénégalais" },
  { texte: "Ce n'est pas la taille du chien dans le combat, c'est la taille du combat dans le chien.", auteur: "Mark Twain" },
]
export default async function citation4(sock, sender, args, msg, ctx = {}) {
  const c = CITATIONS_POWER[Math.floor(Math.random() * CITATIONS_POWER.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💎 *CITATION PUISSANCE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💬 _"${c.texte}"_\n\n` +
    `⛧  ✍️ — *${c.auteur}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
