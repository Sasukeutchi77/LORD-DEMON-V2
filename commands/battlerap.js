import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BARS = [
  "Tu pensais être le meilleur ? Mon flow te dépasse, tes rimes sont des erreurs /\nMon micro est une arme, le tien est juste pour les pleurs 🎤",
  "Mes lyrics sont en or, les tiens valent des sous /\nJe suis le roi de ce ring, toi tu es juste un fou 👑",
  "Chaque syllabe que je crache est une vérité /\nLe public m'acclame pendant que tu restes ignoré ⚡",
  "Tu parles fort mais tes actes sont silencieux /\nMoi j'avance sans bruit mais mon impact est sérieux 💯",
  "J'ai des bars chauds comme le soleil d'Abidjan, ton flow est froid /\nPendant que tu cherches tes mots, moi j'écris des épigraphes 🔥",
  "Mon nom résonne dans les ténèbres, le tien s'efface dans la nuit /\nMa plume est ma lame — chaque vers un coup parfait ☠",
]
export default async function battlerap(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const bar = BARS[Math.floor(Math.random() * BARS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎤 *BATTLE RAP DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎤 *@${jid.split('@')[0]}* crache :*\n\n` +
    `⛧  _"${bar}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
