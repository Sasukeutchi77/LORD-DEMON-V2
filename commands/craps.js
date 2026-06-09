import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function craps(sock, sender, args, msg, ctx = {}) {
  const mise = parseInt(args[0]) || 100
  const d1 = Math.floor(Math.random() * 6) + 1
  const d2 = Math.floor(Math.random() * 6) + 1
  const total = d1 + d2
  let resultat, gain
  if (total === 7 || total === 11) { resultat = '🎉 *NATUREL — VICTOIRE !*'; gain = mise }
  else if (total === 2 || total === 3 || total === 12) { resultat = '💀 *CRAPS — DÉFAITE !*'; gain = -mise }
  else {
    const win = Math.random() > 0.5
    resultat = win ? `✅ *POINT ${total} — GAGNÉ !*` : `❌ *POINT ${total} — PERDU !*`
    gain = win ? mise : -mise
  }
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎲 *CRAPS DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎲 *Dés:* [${d1}] + [${d2}] = *${total}*\n` +
    `⛧  💰 *Mise:* ${mise.toLocaleString()} pièces\n\n` +
    `✝  ${resultat}\n` +
    `☩  ${gain >= 0 ? '💰' : '💸'} *${gain >= 0 ? '+' : ''}${gain.toLocaleString()}* pièces\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
