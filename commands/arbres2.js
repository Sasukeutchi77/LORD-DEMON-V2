import { sendMessage } from '../lib/sendMessage.js'
const ARBRES = [
  { nom: "Séquoia géant", fact: "94m de hauteur, 1385 tonnes — le plus grand être vivant", emoji: "🌳" },
  { nom: "Pin Bristlecone", fact: "5000 ans d'âge, le plus vieux arbre au monde, Californie", emoji: "🌲" },
  { nom: "Baobab", fact: "2000 ans, 9m de diamètre, stocke jusqu'à 120 000L d'eau", emoji: "🌴" },
  { nom: "Érable du Japon", fact: "Feuilles rouges spectaculaires, source du sirop d'érable canadien", emoji: "🍁" },
  { nom: "Bambou", fact: "Pousse de 91cm/jour, le plus rapide — c'est une graminée géante", emoji: "🌿" },
  { nom: "Sakura (Cerisier)", fact: "Floraison de 1-2 semaines par an, symbole du Japon", emoji: "🌸" },
  { nom: "Manchineel", fact: "L'arbre le plus dangereux du monde — même la pluie qui le touche brûle", emoji: "☠️" },
]
export default async function arbres2(sock, sender, args, msg, ctx = {}) {
  const a = ARBRES[Math.floor(Math.random() * ARBRES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌳 *ARBRE EXTRAORDINAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${a.emoji} *${a.nom}*\n\n` +
    `⛧  📖 _${a.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
