import { sendMessage } from '../lib/sendMessage.js'
export default async function charcount(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: .charcount <texte>`)
  const words = text.trim().split(/\s+/).filter(Boolean)
  const out =
    `☩━━━〔 📊 *COMPTEUR DE TEXTE* 〕━━━☩\n\n` +
    `☠  📝 *Caractères:* ${text.length}\n` +
    `⛧  💬 *Mots:* ${words.length}\n` +
    `✝  📄 *Lignes:* ${text.split('\n').length}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
