import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COMPLIMENTS = [
  "Tu es la raison pour laquelle l'évolution n'est pas un accident.",
  "Ton existence justifie la théorie de l'amour cosmique.",
  "Tu brilles plus que les étoiles dans un ciel sans nuage.",
  "On te clonerait si la technologie le permettait.",
  "Tu es l'exception qui confirme la règle.",
  "Même les démons s'inclinent devant ta force de caractère.",
  "Ta présence transforme le chaos en harmonie.",
  "Tu combines intelligence et grâce comme personne d'autre.",
]
export default async function compliment3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💕 *COMPLIMENT DIVIN*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  💬 _"${item}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
