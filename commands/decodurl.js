import { sendMessage } from '../lib/sendMessage.js'
export default async function decodurl(sock, sender, args, msg, ctx = {}) {
  const url = args.join(' ').trim()
  if (!url) return sendMessage(sock, sender, `☠ Usage: .decodurl <url_encodée>`)
  try {
    const decoded = decodeURIComponent(url)
    const out =
      `☩━━━〔 🔗 *DÉCODAGE URL* 〕━━━☩\n\n` +
      `☠  📥 *Entrée:* ${url.slice(0,60)}${url.length>60?'…':''}\n` +
      `⛧  📤 *Décodé:* ${decoded.slice(0,200)}${decoded.length>200?'…':''}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    await sendMessage(sock, sender, out)
  } catch {
    await sendMessage(sock, sender, `☠ URL invalide ou impossible à décoder.`)
  }
}
