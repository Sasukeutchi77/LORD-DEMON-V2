import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BERCEUSES = [
  "fredonne une mélodie douce de l'au-delà",
  "berce doucement au son d'une musique spectr",
  "chuchote une berceuse des anciens démons",
  "apaise avec des vibrations de l'ombre",
  "endort avec une ritournelle millénaire",
]
export default async function bercer(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .bercer @user`)
  const berceuse = BERCEUSES[Math.floor(Math.random() * BERCEUSES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌙 *BERCER (RP)*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *@${jid.split('@')[0]}* ${berceuse} pour *@${target.split('@')[0]}*\n\n` +
    `⛧  😴 _Le calme descend sur les ténèbres..._\n` +
    `✝  🌙 _Bonne nuit, âme protégée._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
