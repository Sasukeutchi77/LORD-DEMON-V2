import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ENCOURAGEMENTS = [
  { msg: "Tu es capable de décrocher les étoiles. Personne ne peut t'arrêter. 🌟", geste: "te montre les pouces 👍" },
  { msg: "Même les plus grandes tempêtes ont une fin. La tienne approche. 🌈", geste: "te tape dans le dos 💪" },
  { msg: "Ta force intérieure est légendaire — utilise-la ! 🔥", geste: "te crie dessus avec enthousiasme 📣" },
  { msg: "Chaque pas compte. Continue et regarde jusqu'où tu arrives. 🚀", geste: "te donne confiance 🌟" },
  { msg: "Le monde a besoin de toi exactement comme tu es. Ne t'arrête jamais. ⭐", geste: "t'applaudit 👏" },
  { msg: "Les grands destins se bâtissent dans les moments difficiles. 👑", geste: "te soutient de tout cœur 💙" },
]
export default async function encourager(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const e = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💪 *ENCOURAGEMENT*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  @${jid.split('@')[0]} *${e.geste}* à @${target.split('@')[0]}\n\n` +
    `⛧  💬 _"${e.msg}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  const mentions = [...new Set([jid, target])]
  await sendMessage(sock, sender, text, { mentions })
}
