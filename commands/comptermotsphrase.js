import { sendMessage } from '../lib/sendMessage.js'
export default async function comptermotsphrase(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, `☠ Usage: .comptermotsphrase <texte>`)
  const mots = text.trim().split(/\s+/).filter(Boolean)
  const phrases = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const out =
    `☩━━━〔 📊 *COMPTEUR MOTS/PHRASES* 〕━━━☩\n\n` +
    `☠  💬 *Mots:* ${mots.length}\n` +
    `⛧  📄 *Phrases:* ${phrases.length}\n` +
    `✝  📏 *Caractères:* ${text.length}\n` +
    `☩  📝 *Moy. mots/phrase:* ${phrases.length ? (mots.length / phrases.length).toFixed(1) : 'N/A'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
