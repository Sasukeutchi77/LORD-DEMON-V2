import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ROLES = [
  "prend sous son aile comme disciple",
  "accueille dans le cercle démoniaque",
  "reconnaît comme protégé officiel",
  "engage comme apprenti du chaos",
  "intègre dans la légion des élus",
]
export default async function adopter(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .adopter @user`)
  const role = ROLES[Math.floor(Math.random() * ROLES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤝 *ADOPTION DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *@${jid.split('@')[0]}* ${role} *@${target.split('@')[0]}*\n\n` +
    `⛧  📜 _Ce lien est désormais gravé dans l'éternité._\n` +
    `✝  🩸 _Signé sous les étoiles démoniaques._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
