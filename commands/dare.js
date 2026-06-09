import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DEFIS = [
  { defi: "Envoie un message gênant à quelqu'un de ta liste", diff: "🔥 Courageux", pts: 200 },
  { defi: "Chante une chanson en note vocale maintenant", diff: "😂 Drôle", pts: 150 },
  { defi: "Imite quelqu'un du groupe pendant 1 minute", diff: "🎭 Créatif", pts: 180 },
  { defi: "Dis 3 qualités sincères à quelqu'un du groupe", diff: "💙 Doux", pts: 100 },
  { defi: "Écris une poésie sur toi-même en 2 minutes", diff: "✍️ Artistique", pts: 220 },
  { defi: "Fais 20 pompes avant de reprendre le téléphone", diff: "💪 Sportif", pts: 250 },
  { defi: "Appelle quelqu'un au hasard dans tes contacts", diff: "😰 Extrême", pts: 300 },
  { defi: "Change ta photo de profil pendant 1h en quelque chose d'original", diff: "🎨 Fun", pts: 170 },
]
export default async function dare(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const d = DEFIS[Math.floor(Math.random() * DEFIS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   😈 *DÉFI OSÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🎯 _${d.defi}_\n\n` +
    `✝  ${d.diff}\n` +
    `☩  🏆 *Points si réussi:* ${d.pts}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
