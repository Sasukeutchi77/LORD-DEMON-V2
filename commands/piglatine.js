import { sendMessage } from '../lib/sendMessage.js'
function toPigLatin(word) {
  const vowels = 'aeiouAEIOU'
  if (!word) return word
  if (vowels.includes(word[0])) return word + 'yay'
  let i = 0
  while (i < word.length && !vowels.includes(word[i])) i++
  return word.slice(i) + word.slice(0, i) + 'ay'
}
export default async function piglatine(sock, sender, args, msg, ctx) {
  const text = args.join(' ')
  if (!text.trim()) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}piglatine <texte>`)
  const result = text.split(' ').map(toPigLatin).join(' ')
  await sendMessage(sock, sender,
    `☩━━━〔 🐷 *PIG LATIN* 〕━━━☩\n☠\n⛧  📝 Original: _${text}_\n☠  🐷 Pig Latin: *${result}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
