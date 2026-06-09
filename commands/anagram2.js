import { sendMessage } from '../lib/sendMessage.js'
export default async function anagram2(sock, sender, args, msg, ctx) {
  const w1 = args[0]?.toLowerCase().replace(/[^a-zà-ÿ]/g,'')
  const w2 = args[1]?.toLowerCase().replace(/[^a-zà-ÿ]/g,'')
  if (!w1 || !w2) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}anagram2 <mot1> <mot2>`)
  const sort = s => s.split('').sort().join('')
  const isAnagram = sort(w1) === sort(w2)
  await sendMessage(sock, sender,
    `☩━━━〔 🔤 *ANAGRAMME* 〕━━━☩\n☠\n⛧  Mot 1: *${w1}* → ${sort(w1)}\n☩  Mot 2: *${w2}* → ${sort(w2)}\n☠\n✝  ${isAnagram ? '✅ OUI — Ce sont des anagrammes !' : '❌ NON — Pas des anagrammes'}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
