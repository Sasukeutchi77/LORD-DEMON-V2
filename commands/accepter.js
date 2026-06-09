import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ACCEPTATIONS = [
  { phrase: "Challenge accepté. Que le meilleur gagne.", desc: "Défi relevé avec honneur" },
  { phrase: "Bring it on ! Je suis prêt pour tout.", desc: "Courage total, sans peur" },
  { phrase: "Vous affrontez un adversaire coriace.", desc: "Avertissement aux téméraires" },
  { phrase: "Que les dieux témoignent de notre duel.", desc: "Combat sous les étoiles" },
  { phrase: "Aucune peur. Aucune pitié. Aucune limite.", desc: "Guerrier sans compromis" },
  { phrase: "Je l'accepte — et je le gagnerai.", desc: "Confiance absolue" },
]
export default async function accepter(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const a = ACCEPTATIONS[Math.floor(Math.random() * ACCEPTATIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✅ *DÉFI ACCEPTÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚡ *@${jid.split('@')[0]}* déclare :\n\n` +
    `⛧  💬 _"${a.phrase}"_\n` +
    `✝  📖 ${a.desc}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
