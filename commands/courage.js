import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const MESSAGES = [
  "Tu es plus fort que tu ne le crois.",
  "Cette épreuve ne te définit pas — elle te forge.",
  "Chaque pas en avant compte, peu importe sa taille.",
  "Tu as déjà surmonté pire que ça.",
  "La peur n'est qu'une étape vers le courage.",
  "Respire et avance, même lentement.",
  "Les héros ont aussi peur mais ils agissent quand même.",
  "Tu peux le faire — je le sais.",
  "L'obscurité ne dure jamais éternellement.",
  "Chaque cicatrice est une preuve que tu as survécu.",
]
export default async function courage(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💪 *DOSE DE COURAGE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  💬 _"${item}"_\n\n` +
    `✝  _— Force démoniaque transmise_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
