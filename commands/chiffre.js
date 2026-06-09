import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function chiffre(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const min = parseInt(args[0]) || 1
  const max = parseInt(args[1]) || 100
  if (min >= max) return sendMessage(sock, sender, `☠ Le minimum doit être inférieur au maximum.`)
  const num = Math.floor(Math.random() * (max - min + 1)) + min
  const pair = num % 2 === 0
  const prime = (() => {
    if (num < 2) return false
    for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false
    return true
  })()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎲 *NOMBRE ALÉATOIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔢 *Intervalle:* [${min}, ${max}]\n\n` +
    `⛧  🎯 *Résultat: ${num}*\n\n` +
    `✝  🔍 ${pair ? '⚫ Pair' : '⚪ Impair'} | ${prime ? '⭐ Nombre premier' : '📊 Non premier'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
