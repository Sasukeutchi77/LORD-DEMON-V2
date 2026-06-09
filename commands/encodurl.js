import { sendMessage } from '../lib/sendMessage.js'
export default async function encodurl(sock, sender, args, msg, ctx = {}) {
  const url = args.join(' ').trim()
  if (!url) return sendMessage(sock, sender, `☠ Usage: .encodurl <url>`)
  const encoded = encodeURIComponent(url)
  const out =
    `☩━━━〔 🔗 *ENCODAGE URL* 〕━━━☩\n\n` +
    `☠  📥 *Original:* ${url.slice(0,80)}\n` +
    `⛧  📤 *Encodé:* ${encoded.slice(0,200)}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
