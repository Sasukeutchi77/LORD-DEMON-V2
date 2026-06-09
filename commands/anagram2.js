import { sendMessage } from '../lib/sendMessage.js'
export default async function anagram2(sock, sender, args, msg, ctx = {}) {
  const w1 = args[0]?.toLowerCase().replace(/[^a-zà-ÿ]/g, '')
  const w2 = args[1]?.toLowerCase().replace(/[^a-zà-ÿ]/g, '')
  if (!w1 || !w2) return sendMessage(sock, sender, `☠ Usage: .anagram2 <mot1> <mot2>`)
  const sort = s => s.split('').sort().join('')
  const estAnagramme = sort(w1) === sort(w2)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔤 *VÉRIFICATION ANAGRAMME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📝 *Mot 1:* ${w1}\n` +
    `⛧  📝 *Mot 2:* ${w2}\n\n` +
    `✝  ${estAnagramme ? '✅ *OUI — Ce sont des anagrammes !*' : '❌ *NON — Ces mots ne sont pas des anagrammes*'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
