import { sendMessage } from '../lib/sendMessage.js'
export default async function wordfreq(sock, sender, args, msg, ctx) {
  const text = args.join(' ').toLowerCase()
  if (!text.trim()) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}wordfreq <texte>`)
  const words = text.match(/[a-zà-ÿ']+/g) || []
  const freq = {}; for (const w of words) freq[w] = (freq[w]||0)+1
  const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10)
  let text2 = `☩━━━〔 📊 *FRÉQUENCE MOTS* 〕━━━☩\n☠\n⛧  Total mots: *${words.length}* | Uniques: *${Object.keys(freq).length}*\n☠\n`
  sorted.forEach(([w,n],i)=>{ text2+=`⛧  ${i+1}. *${w}* — ${n}x ${'█'.repeat(Math.min(n,10))}\n` })
  await sendMessage(sock, sender, text2+`☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
