import { sendMessage } from '../lib/sendMessage.js'
export default async function vigenere(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  const sub = args[0]?.toLowerCase()
  const key = args[1]?.toUpperCase()
  const text = args.slice(2).join(' ').toUpperCase()
  if (!sub || !key || !text) return await sendMessage(sock, sender,
    `☩━━━〔 🔐 *CHIFFRE DE VIGENÈRE* 〕━━━☩\n☠\n⛧  Usage: ${prefix}vigenere chiffrer <clé> <texte>\n☩  Usage: ${prefix}vigenere dechiffrer <clé> <texte>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const encode = sub === 'chiffrer' || sub === 'encode'
  let result = '', ki = 0
  for (const c of text) {
    if (/[A-Z]/.test(c)) {
      const shift = key[ki % key.length].charCodeAt(0) - 65
      const code = encode ? ((c.charCodeAt(0) - 65 + shift) % 26 + 65) : ((c.charCodeAt(0) - 65 - shift + 26) % 26 + 65)
      result += String.fromCharCode(code); ki++
    } else { result += c }
  }
  await sendMessage(sock, sender,
    `☩━━━〔 🔐 *VIGENÈRE* 〕━━━☩\n☠\n⛧  🔑 Clé: *${key}*\n☩  📝 Original: _${text}_\n☠  ${encode?'🔒':'🔓'} Résultat: *${result}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
