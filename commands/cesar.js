// commands/cesar.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function cesar(sock, sender, args, msg) {
  const shift = parseInt(args[0]) || 3
  const text = args.slice(1).join(' ')
  if (!text) return sendMessage(sock, sender, '☠ Usage: .cesar <décalage> <texte>\nEx: .cesar 3 bonjour')
  const result = text.replace(/[a-zA-Z]/g, c => {
    const base = c >= 'a' ? 97 : 65
    return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base)
  })
  await sendMessage(sock, sender, `🔐 César (décalage ${shift}):\n${result}`)
}
