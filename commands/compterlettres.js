import { sendMessage } from '../lib/sendMessage.js'
export default async function compterlettres(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: .compterlettres <texte>`)
  const lettres = text.replace(/[^a-zA-ZÀ-ÿ]/g, '').length
  const espaces = text.split(' ').length - 1
  const freq = {}
  for (const c of text.toLowerCase()) { if (/[a-zA-ZÀ-ÿ]/.test(c)) freq[c] = (freq[c] || 0) + 1 }
  const topLettres = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0,3).map(([l,n]) => `${l}(${n})`).join(', ')
  const out =
    `☩━━━〔 🔡 *COMPTEUR DE LETTRES* 〕━━━☩\n\n` +
    `☠  📝 *Texte:* "${text}"\n\n` +
    `⛧  🔤 *Lettres:* ${lettres}\n` +
    `✝  📏 *Caractères total:* ${text.length}\n` +
    `☩  🔝 *Plus fréquentes:* ${topLettres}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
