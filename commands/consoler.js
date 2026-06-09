import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CONSOLATIONS = [
  { msg: "Les larmes d'aujourd'hui sont la pluie qui fait pousser la force de demain.", emoji: "🌱" },
  { msg: "Même le roi des démons connaît la douleur. Ce qui te brise ne fait que te forger.", emoji: "⚔️" },
  { msg: "La nuit la plus profonde précède toujours l'aube la plus lumineuse.", emoji: "🌅" },
  { msg: "Tu n'es pas seul(e). Les ombres veillent sur ceux qui souffrent en silence.", emoji: "🌑" },
  { msg: "Chaque blessure devient une médaille. Tu es plus fort(e) que tu ne le crois.", emoji: "🏆" },
  { msg: "Respire. La tempête passe. Seuls ceux qui restent debout voient l'arc-en-ciel.", emoji: "🌈" },
]
export default async function consoler(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const c = CONSOLATIONS[Math.floor(Math.random() * CONSOLATIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💙 *CONSOLATION DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 Pour @${target.split('@')[0]}\n\n` +
    `⛧  ${c.emoji} _"${c.msg}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
