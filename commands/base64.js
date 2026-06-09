import { sendMessage } from '../lib/sendMessage.js'
export default async function base64(sock, sender, args, msg, ctx = {}) {
  const sub = args[0]?.toLowerCase()
  const text = args.slice(1).join(' ')
  if (!sub || !text) return sendMessage(sock, sender, `☠ Usage: .base64 encode|decode <texte>`)
  let result
  try {
    result = sub === 'encode' ? Buffer.from(text).toString('base64') : Buffer.from(text, 'base64').toString('utf8')
  } catch { return sendMessage(sock, sender, `☠ Impossible de déchiffrer ce Base64.`) }
  const out =
    `☩━━━〔 💻 *BASE64* 〕━━━☩\n\n` +
    `☠  📝 *${sub === 'encode' ? 'Original' : 'Encodé'}:* ${text}\n` +
    `⛧  🔄 *${sub === 'encode' ? 'Encodé' : 'Décodé'}:* ${result}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
