import { sendMessage } from '../lib/sendMessage.js'
export default async function calc(sock, sender, args, msg, ctx = {}) {
  const expr = args.join(' ').replace(/[^0-9+\-*/().,%^ ]/g, '')
  if (!expr.trim()) return sendMessage(sock, sender, `☠ Usage: .calc <expression>\nEx: .calc 15 * 8 + 32`)
  let result
  try {
    const safe = expr.replace(/\^/g, '**').replace(/%/g, '/100*')
    result = Function(`"use strict"; return (${safe})`)()
    if (!isFinite(result)) throw new Error('Division par zéro')
  } catch (e) {
    return sendMessage(sock, sender, `☠ Expression invalide: ${e.message}`)
  }
  const text =
    `☩━━━〔 🧮 *CALCULATRICE* 〕━━━☩\n\n` +
    `☠  📝 *Calcul:* ${expr}\n` +
    `⛧  🎯 *Résultat:* *${result}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
