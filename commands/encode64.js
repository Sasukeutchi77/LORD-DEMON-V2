import { sendMessage } from '../lib/sendMessage.js'
export default async function encode64(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ').trim()
  if (!text) return sendMessage(sock, sender, `☠ Usage: .encode64 <texte>`)
  const encoded = Buffer.from(text, 'utf8').toString('base64')
  const out =
    `☩━━━〔 🔒 *BASE64 ENCODE* 〕━━━☩\n\n` +
    `☠  📥 *Original:* ${text.slice(0,80)}\n` +
    `⛧  📤 *Encodé:* \`${encoded.slice(0,200)}\`\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
