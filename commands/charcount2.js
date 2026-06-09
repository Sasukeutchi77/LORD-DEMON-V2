import { sendMessage } from '../lib/sendMessage.js'
export default async function charcount2(sock, sender, args, msg, ctx) {
  const text = args.join(' ')
  if (!text.trim()) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}charcount2 <texte>`)
  const letters = text.replace(/[^a-zA-ZÀ-ÿ]/g, '').length
  const digits = text.replace(/[^0-9]/g, '').length
  const spaces = text.split(' ').length - 1
  const special = text.replace(/[a-zA-ZÀ-ÿ0-9 ]/g, '').length
  const words = text.trim().split(/\s+/).length
  const sentences = text.split(/[.!?]+/).filter(s=>s.trim()).length
  const freq = {}; for (const c of text.toLowerCase()) { if (/[a-zà-ÿ]/.test(c)) freq[c] = (freq[c]||0) + 1 }
  const topLetters = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([c,n])=>`${c}:${n}`).join(' ')
  await sendMessage(sock, sender,
    `☩━━━〔 📊 *ANALYSE DE TEXTE* 〕━━━☩\n☠\n⛧  📝 Caractères total: *${text.length}*\n☠  🔤 Lettres: *${letters}*\n☩  🔢 Chiffres: *${digits}*\n✝  ⎵  Espaces: *${spaces}*\n☠  ✨ Spéciaux: *${special}*\n☠\n⛧  💬 Mots: *${words}*\n☩  📖 Phrases: *${sentences}*\n☠\n✝  🏆 Top lettres: ${topLetters}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
