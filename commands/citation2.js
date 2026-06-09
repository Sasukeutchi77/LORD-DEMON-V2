import { sendMessage } from '../lib/sendMessage.js'
const CITATIONS = [
  { texte: "La vie c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", auteur: "Albert Einstein" },
  { texte: "Ce n'est pas la destination qui compte, c'est le voyage.", auteur: "Robert Louis Stevenson" },
  { texte: "L'imagination est plus importante que le savoir.", auteur: "Albert Einstein" },
  { texte: "La vraie générosité envers l'avenir consiste à tout donner au présent.", auteur: "Albert Camus" },
  { texte: "Le succès c'est d'aller d'échec en échec sans perdre son enthousiasme.", auteur: "Winston Churchill" },
  { texte: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.", auteur: "Saint-Exupéry" },
  { texte: "Sois le changement que tu veux voir dans le monde.", auteur: "Mahatma Gandhi" },
  { texte: "Le seul vrai voyage, c'est d'aller vers les autres.", auteur: "Ella Maillart" },
]
export default async function citation2(sock, sender, args, msg, ctx = {}) {
  const c = CITATIONS[Math.floor(Math.random() * CITATIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📜 *CITATION INSPIRANTE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💬 _"${c.texte}"_\n\n` +
    `⛧  ✍️ — *${c.auteur}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
