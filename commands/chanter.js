import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CHANSONS = [
  { chanson: "une ballade démoniaque en latin", ambiance: "Ténèbres et mystère", note: "La salle gèle..." },
  { chanson: "un rap freestyle sur l'éternité", ambiance: "Urban & Spirituel", note: "Chaque barre est une vérité" },
  { chanson: "une ode épique aux anciens dieux", ambiance: "Épique & Majestueux", note: "Les murs tremblent" },
  { chanson: "un hymne de victoire démoniaque", ambiance: "Triomphant & Sombre", note: "Les spectateurs lèvent le poing" },
  { chanson: "une mélodie de l'au-delà", ambiance: "Mélancolique & Mystique", note: "Larmes et frissons" },
]
export default async function chanter(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = CHANSONS[Math.floor(Math.random() * CHANSONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎵 *CHANTER (RP)*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *@${jid.split('@')[0]}* entonne *${c.chanson}*\n\n` +
    `⛧  🎭 *Ambiance:* ${c.ambiance}\n` +
    `✝  💬 _${c.note}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
