import { sendMessage } from '../lib/sendMessage.js'
export default async function numbersystem(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  const num = parseInt(args[0])
  if (isNaN(num) || num < 0) return await sendMessage(sock, sender, `☠ Usage: ${prefix}numbersystem <nombre> (ex: ${prefix}numbersystem 255)`)
  const bin = num.toString(2), oct = num.toString(8), hex = num.toString(16).toUpperCase(), b32 = num.toString(32).toUpperCase()
  await sendMessage(sock, sender,
    `☩━━━〔 🔢 *SYSTÈMES NUMÉRIQUES* 〕━━━☩\n☠\n⛧  Nombre: *${num}*\n☠\n☩  🔟 *Décimal:*    ${num}\n✝  2️⃣  *Binaire:*    ${bin}\n☠  8️⃣  *Octal:*      ${oct}\n⛧  🔡 *Hexadécimal:* ${hex}\n☩  *Base 32:*      ${b32}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
