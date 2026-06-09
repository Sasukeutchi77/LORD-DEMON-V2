import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ENCOURAGEMENTS = [
  "Tu es plus fort que tu ne le penses — chaque épreuve te forge.",
  "L'échec n'est qu'une leçon déguisée. Reprends-toi et recommence.",
  "Ta valeur ne se mesure pas aux obstacles — elle se mesure à ta résilience.",
  "Les ténèbres les plus profondes précèdent toujours l'aube la plus lumineuse.",
  "Continue. La persévérance brise même la pierre la plus dure.",
  "Tu n'as pas besoin de leur validation — ta propre conviction suffit.",
  "Chaque pas en avant, aussi petit soit-il, est une victoire sur l'inertie.",
  "Le monde appartient à ceux qui se lèvent quand tout le monde reste couché.",
]
export default async function cheer(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const msg_cheer = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌟 *ENCOURAGEMENT DIVIN*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  💪 _"${msg_cheer}"_\n\n` +
    `✝  🌅 _Les ténèbres se dissipent pour ceux qui avancent._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
