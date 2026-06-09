import { sendMessage } from '../lib/sendMessage.js'
const WORDS = ['soleil','maison','jardin','musique','voyage','lumière','liberté','courage','amitié','sagesse','aventure','bonheur','espoir','nature','univers','mystère','victoire','passion','rêveur','démon']
export default async function jeuxmots(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const word = WORDS[Math.floor(Math.random()*WORDS.length)]
  const scrambled = word.split('').sort(()=>Math.random()-0.5).join('')
  const hint = word[0] + '_'.repeat(word.length-2) + word[word.length-1]
  await sendMessage(sock, sender, `☩━━━〔 🔤 *ANAGRAMME* 〕━━━☩\n☠\n⛧  🔤 Déchiffre ce mot:\n☠  \`${scrambled.toUpperCase()}\`\n✝  Indice: ${hint.toUpperCase()}\n☠  (${word.length} lettres)\n☠\n✝  ${prefix}motinverse — pour retourner un mot\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}