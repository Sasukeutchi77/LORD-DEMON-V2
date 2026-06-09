import { sendMessage } from '../lib/sendMessage.js'
import { randomBytes } from 'crypto'
export default async function tokengen(sock, sender, args, msg, ctx) {
  const format = args[0]?.toLowerCase() || 'hex'
  const len = Math.min(64, Math.max(8, parseInt(args[1]) || 32))
  let token
  if (format === 'base64') token = randomBytes(len).toString('base64').slice(0, len)
  else if (format === 'alphanum') { const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; token = Array.from(randomBytes(len)).map(b => chars[b % chars.length]).join('') }
  else token = randomBytes(len).toString('hex').slice(0, len)
  await sendMessage(sock, sender,
    `☩━━━〔 🎲 *GÉNÉRATEUR TOKEN* 〕━━━☩\n☠\n⛧  Format: *${format}* | Longueur: *${len}*\n☠\n✝  \`${token}\`\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
