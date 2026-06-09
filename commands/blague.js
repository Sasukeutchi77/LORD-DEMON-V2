import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BLAGUES = [
  "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tomberaient dans le bateau.",
  "C'est l'histoire d'un homme qui entre dans un bar... il dit : Aïe.",
  "Qu'est-ce qu'un crocodile qui surveille des grains ? Un alligateur.",
  "Comment appelle-t-on un chat tombé dans un pot de peinture le jour de Noël ? Un chat-peint de Noël.",
  "Qu'est-ce qu'un canif ? Un petit fien.",
  "Pourquoi les informaticiens confondent Halloween et Noël ? Parce que Oct 31 = Dec 25.",
  "Un squelette entre dans un bar. Il demande : un verre d'eau... et un balai.",
  "Pourquoi le livre de mathématiques est-il triste ? Parce qu'il a trop de problèmes.",
]
export default async function blague(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = BLAGUES[Math.floor(Math.random() * BLAGUES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   😂 *BLAGUE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  😂 _${item}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
