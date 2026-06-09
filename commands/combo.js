import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const LABELS = [
  { min: 30, label: "COMBO DIVIN ⭐⭐⭐⭐⭐", bonus: "+500 XP, aura légendaire" },
  { min: 20, label: "COMBO LÉGENDAIRE ⭐⭐⭐⭐", bonus: "+300 XP, respect +100" },
  { min: 10, label: "COMBO ÉPIQUE ⭐⭐⭐", bonus: "+150 XP, moral boosté" },
  { min: 5, label: "COMBO RARE ⭐⭐", bonus: "+75 XP" },
  { min: 0, label: "COMBO ⭐", bonus: "+25 XP" },
]
export default async function combo(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const count = Math.floor(Math.random() * 50) + 1
  const label = LABELS.find(l => count >= l.min) || LABELS[LABELS.length - 1]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💥 *COMBO METER*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🔢 *x${count} ${label.label}*\n` +
    `✝  ✨ *Bonus:* ${label.bonus}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
