import { sendMessage } from '../lib/sendMessage.js'
export default async function pyramide(sock, sender, args, msg, ctx = {}) {
  try {
    const n = parseInt(args[0]), sym = args[1] || '⭐'
    if (isNaN(n) || n < 1 || n > 20) return await sendMessage(sock, sender, '☠ Usage: .pyramide <1-20> [symbole]\nEx: .pyramide 5 🔥')
    let out = ''
    for (let i = 1; i <= n; i++) out += sym.repeat(i) + '\n'
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔺 *PYRAMIDE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${out}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
