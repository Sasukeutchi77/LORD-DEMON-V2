import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function abandonner(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const targetStr = target ? `@${target.split('@')[0]}` : "l'ennemi"
  const text =
    `☩━━━〔 ⛧ *ABANDONNER* 〕━━━☩\n\n` +
    `☠  @${jid.split('@')[0]} abandonne le combat contre ${targetStr}\n\n` +
    `✝  _"Seul le sage sait quand retraiter..."_\n` +
    `⛧  _Parfois fuir c'est survivre pour mieux revenir._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
