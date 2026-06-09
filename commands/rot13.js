// commands/rot13.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function rot13(sock, sender, args, msg) {
  try {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, '☠ Usage: .rot13 <texte>')
  const result = text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)))
  await sendMessage(sock, sender, `☩━━━〔 ⛧ *ROT13* 〕━━━☩

🔄 ROT13:\n${result}

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}