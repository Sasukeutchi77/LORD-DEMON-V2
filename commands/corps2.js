import { sendMessage } from '../lib/sendMessage.js'
const ORGANES = [
  { org: "Cœur", emoji: "🫀", fact: "300g, 100 000 battements/jour, claque en 3 min sans O2" },
  { org: "Cerveau", emoji: "🧠", fact: "1.4kg, 86 milliards de neurones, consomme 20% de l'oxygène" },
  { org: "Poumons", emoji: "🫁", fact: "Surface 70m², 300M alvéoles, 12-20 respirations/min" },
  { org: "Fémur", emoji: "🦴", fact: "Os le plus long et solide, supporte 30x le poids du corps" },
  { org: "Œil", emoji: "👁️", fact: "7M cônes (couleurs), 120M bâtonnets (lumière), résolution 576MP" },
  { org: "Reins", emoji: "💧", fact: "Filtrent 180L de sang/jour, 2 millions de néphrons chacun" },
  { org: "Foie", emoji: "🩸", fact: "500 fonctions, seul organe qui se régénère en 6 semaines" },
  { org: "Microbiome", emoji: "🦠", fact: "3.8 trillions de bactéries — plus que les cellules humaines !" },
]
export default async function corps2(sock, sender, args, msg, ctx = {}) {
  const o = ORGANES[Math.floor(Math.random() * ORGANES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🧬 *CORPS HUMAIN*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${o.emoji} *${o.org}*\n\n` +
    `⛧  📖 _${o.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
