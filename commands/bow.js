import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const REVERENCES = [
  { action: "s'incline profondément en signe de respect absolu", desc: "Révérence du guerrier honorable" },
  { action: "effectue une révérence royale, cape au sol", desc: "Salut de noblesse démoniaque" },
  { action: "pose un genou à terre, tête baissée", desc: "Soumission volontaire honorifique" },
  { action: "s'incline, main sur le cœur", desc: "Salut du chevalier des ombres" },
  { action: "croise les bras en révérence silencieuse", desc: "Respect total et admiration" },
]
export default async function bow(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const r = REVERENCES[Math.floor(Math.random() * REVERENCES.length)]
  const targetStr = target ? `*@${target.split('@')[0]}*` : `l'assemblée`
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🙇 *RÉVÉRENCE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *@${jid.split('@')[0]}* ${r.action} devant ${targetStr}\n\n` +
    `⛧  📖 _${r.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
