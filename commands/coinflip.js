import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function coinflip(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const choix = args[0]?.toLowerCase()
  const face = Math.random() > 0.5 ? 'pile' : 'face'
  const emojiFace = face === 'pile' ? '🔵' : '🟡'
  let result
  if (!choix) {
    result = `${emojiFace} La pièce montre : *${face.toUpperCase()}*`
  } else if (choix !== 'pile' && choix !== 'face') {
    return sendMessage(sock, sender, `☠ Usage: .coinflip [pile|face]`)
  } else {
    result = choix === face
      ? `${emojiFace} *${face.toUpperCase()}* — 🏆 Tu as gagné !`
      : `${emojiFace} *${face.toUpperCase()}* — 💀 Tu as perdu...`
  }
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🪙 *PILE OU FACE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${choix ? `🎯 *Ton choix:* ${choix}` : '🎲 *Tirage aléatoire*'}\n\n` +
    `⛧  ${result}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
