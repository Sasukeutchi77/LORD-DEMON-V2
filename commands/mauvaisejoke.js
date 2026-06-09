import { sendMessage } from '../lib/sendMessage.js'
const JOKES = ['Qu\'est-ce qu\'un vampire végétarien? Un carotte-cula! 🧛','Pourquoi les plongeurs plongent-ils toujours en arrière? Parce que sinon ils tomberaient dans le bateau! 🤿','Quel est le comble pour un électricien? Ne pas être au courant! ⚡','Pourquoi Batman va à l\'église? Pour trouver Robin! 🦇','Qu\'est-ce qu\'un canif? Le petit fils du caniche! 🐩','Qu\'est-ce qu\'un chat tombé dans un pot de peinture? Un chat-peint! 🎨','Comment appelle-t-on un cerf sans yeux? Pas d\'idée 🦌']
export default async function mauvaisejoke(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  😬 *MAUVAISE BLAGUE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${JOKES[Math.floor(Math.random() * JOKES.length)]}\n\n😬 *Ouuuuf...*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
