import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const REVES = [
  "Tu voles au-dessus des nuages, libre comme un ange déchu ⛧",
  "Tu affrontes un démon ancestral dans un donjon de cristal noir 💎",
  "Des esprits t'entourent et murmurent des secrets interdits 🌑",
  "Tu règnes sur un empire de ténèbres depuis ton trône d'obsidienne 👑",
  "Tu traverses un portail vers une dimension inconnue 🌀",
  "Les étoiles te parlent dans une langue oubliée ⭐",
  "Tu deviens invincible et inarrêtable dans ta conquête 🗡️",
]
export default async function dormir(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const reve = REVES[Math.floor(Math.random() * REVES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   😴 *BONNE NUIT*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🌙 Bonne nuit, @${target.split('@')[0]}\n\n` +
    `⛧  💭 *Ce soir, tu rêveras que...*\n` +
    `✝  _${reve}_\n\n` +
    `☩  ⛧ _Que les ombres veillent sur ton sommeil._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
