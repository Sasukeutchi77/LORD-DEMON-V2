import { sendMessage } from '../lib/sendMessage.js'
const PLATS = [
  { nom: "Ndolé 🇨🇲", pays: "Cameroun", desc: "Feuilles de ndolé, viande, crevettes — plat national", diff: "⭐⭐⭐" },
  { nom: "Thiéboudienne 🇸🇳", pays: "Sénégal", desc: "Riz au poisson, légumes, sauce tomate riche", diff: "⭐⭐⭐" },
  { nom: "Jollof Rice 🇬🇭", pays: "Afrique de l'Ouest", desc: "Riz épicé aux tomates, incontournable des fêtes", diff: "⭐⭐" },
  { nom: "Egusi Soup 🇳🇬", pays: "Nigeria", desc: "Soupe aux graines de melon, légumes-feuilles, poisson", diff: "⭐⭐⭐" },
  { nom: "Couscous 🇲🇦", pays: "Maroc", desc: "Semoule, légumes, agneau — vendredi familial sacré", diff: "⭐⭐⭐" },
  { nom: "Mafé 🇲🇱", pays: "Mali", desc: "Ragoût à la pâte d'arachide, viande tendre", diff: "⭐⭐" },
]
export default async function cuisine3(sock, sender, args, msg, ctx = {}) {
  const p = PLATS[Math.floor(Math.random() * PLATS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🍽️ *CUISINE AFRICAINE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🍽️ *Plat:* ${p.nom} — ${p.pays}\n` +
    `⛧  📖 _${p.desc}_\n` +
    `✝  ⭐ *Difficulté:* ${p.diff}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
