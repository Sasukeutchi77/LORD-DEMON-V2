import { sendMessage } from '../lib/sendMessage.js'
const PALINDROMES = ['KAYAK','RADAR','LEVEL','RACECAR','CIVIC','ROTOR','SAGAS','SOLOS','STATS','MADAM','REFER','DEIFIED','REVIVER','ROTATOR','REPAPER']
export default async function palindrome2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  const text = args.join(' ')
  if (!text.trim() || text === 'exemple') {
    const ex = PALINDROMES[Math.floor(Math.random()*PALINDROMES.length)]
    return await sendMessage(sock, sender, `☩━━━〔 🔄 *PALINDROME* 〕━━━☩\n☠\n⛧  Exemple: *${ex}* ✅\n☠\n✝  Teste: ${prefix}palindrome2 <texte>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const clean = text.toLowerCase().replace(/[^a-zà-ÿ]/g,'')
  const reversed = clean.split('').reverse().join('')
  const isPalin = clean === reversed
  await sendMessage(sock, sender,
    `☩━━━〔 🔄 *PALINDROME* 〕━━━☩\n☠\n⛧  Texte: *${text}*\n☠  Inversé: *${clean.split('').reverse().join('')}*\n☠\n✝  ${isPalin ? '✅ OUI — C\'est un palindrome !' : '❌ NON — Ce n\'est pas un palindrome'}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
