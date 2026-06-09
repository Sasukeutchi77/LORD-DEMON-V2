import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DEVOTIONS = [
  { msg: "Je consacre chaque souffle à la conquête de l'excellence.", emoji: "🔥" },
  { msg: "Ma dévotion dépasse la mort — seule la victoire m'arrête.", emoji: "⛧" },
  { msg: "Je reste debout quand tout s'effondre autour de moi.", emoji: "🗡️" },
  { msg: "Mon but est gravé dans la pierre. Rien ne peut l'effacer.", emoji: "📿" },
  { msg: "La fatigue ne m'atteint pas. Ma volonté est infinie.", emoji: "💀" },
  { msg: "Je suis dévoué corps et âme à ce qui me définit.", emoji: "☩" },
  { msg: "Même les dieux tremblent devant une telle dévotion.", emoji: "✝" },
]
export default async function devotion(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const d = DEVOTIONS[Math.floor(Math.random() * DEVOTIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🙏 *SERMENT DE DÉVOTION*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${jid.split('@')[0]}\n\n` +
    `${d.emoji}  _"${d.msg}"_\n\n` +
    `⛧  — LORD DEMON\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
