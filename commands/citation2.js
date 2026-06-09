// commands/citation2.js
import { sendMessage } from '../lib/sendMessage.js'

const FACTS = ["💭 *\"La vie c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.\"* — Albert Einstein","💭 *\"Le seul moyen de faire du bon travail est d'aimer ce que vous faites.\"* — Steve Jobs","💭 *\"L'ignorance mène à la peur, la peur mène à la haine.\"* — Aristote","💭 *\"Sois le changement que tu veux voir dans le monde.\"* — Gandhi","💭 *\"La connaissance s'acquiert par l'expérience.\"* — Albert Einstein","💭 *\"Le succès c'est tomber sept fois, se relever huit.\"* — Proverbe japonais","💭 *\"Agis comme si ce que tu fais fait une différence. C'est le cas.\"* — William James","💭 *\"La vie est brève, l'art est long.\"* — Hippocrate","💭 *\"La meilleure façon de prédire l'avenir est de le créer.\"* — Peter Drucker","💭 *\"Le monde est un livre, et ceux qui ne voyagent pas n'en lisent qu'une page.\"* — Saint Augustin"]

export default async function citation2(sock, sender, args, msg) {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💭 CITATION DU MOMENT   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${fact}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
