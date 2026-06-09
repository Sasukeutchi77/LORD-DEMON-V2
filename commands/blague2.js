import { sendMessage } from '../lib/sendMessage.js'
const BLAGUES2 = [
  "😄 Pourquoi les plongeurs plongent en arrière ? Sinon ils tomberaient dans le bateau !",
  "😂 Mon chien garde un silence total quand je lui demande ce que 2-2 fait.",
  "🤣 Dans une bibliothèque : \"Un steak SVP !\" — La bibliothécaire : \"C'est une biblio !\" — Il murmure : \"Un steak SVP...\"",
  "😄 Pourquoi les squelettes ne se battent jamais ? Ils n'ont pas le cran !",
  "😂 Mon chat me regarde à 3h du mat. Il sait exactement ce qu'il fait.",
  "🤣 Un livre m'est tombé sur la tête. J'ai que moi à blâmer — c'était un tome sur ma responsabilité.",
  "😄 C'est quoi un canif ? Un petit fien !",
  "😂 Chat tombé dans peinture rouge le jour de Noël = Chat-peint de Noël !",
]
export default async function blague2(sock, sender, args, msg, ctx = {}) {
  const item = BLAGUES2[Math.floor(Math.random() * BLAGUES2.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤣 *BLAGUE ULTIME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${item}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
