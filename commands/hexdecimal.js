import { sendMessage } from '../lib/sendMessage.js'
export default async function hexdecimal(sock, sender, args, msg, ctx = {}) {
  try {
    const input = args[0]
    if (!input) return await sendMessage(sock, sender, '☠ Usage: .hexdecimal <nombre>\nEx: .hexdecimal 255 ou FF')
    const dec = /^[A-Fa-f]+$/.test(input) ? parseInt(input, 16) : parseInt(input, 10)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  💻 *CONVERSION BASES*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Décimal : *${dec}*\n✝ Hex : *${dec.toString(16).toUpperCase()}*\n☠ Binaire : *${dec.toString(2)}*\n⛧ Octal : *${dec.toString(8)}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
