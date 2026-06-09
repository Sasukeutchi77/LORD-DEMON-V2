import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const AIDES = ["porte un message important","tend la main dans l'obscurité","offre sa protection","partage sa sagesse démoniaque","guide vers la lumière","brise les chaînes"]
export default async function aider(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const aide = AIDES[Math.floor(Math.random() * AIDES.length)]
  const targetStr = target ? `@${target.split('@')[0]}` : "l'assemblée"
  const text =
    `☩━━━〔 🤝 *AIDE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  @${jid.split('@')[0]} ${aide} pour ${targetStr}\n\n` +
    `⛧  _"La vraie force est dans le soutien des autres."_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
