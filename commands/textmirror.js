import { sendMessage } from '../lib/sendMessage.js'
export default async function textmirror(sock, sender, args, msg, ctx) {
  const text = args.join(' ')
  if (!text.trim()) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}textmirror <texte>`)
  const reversed = text.split('').reverse().join('')
  await sendMessage(sock, sender,
    `☩━━━〔 🪞 *MIROIR* 〕━━━☩\n☠\n⛧  Original: _${text}_\n☠  Miroir:   _${reversed}_\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
