import { sendMessage } from '../lib/sendMessage.js'
export default async function palindrome(sock, sender, args, msg, ctx = {}) {
  try {
    const text = args.join(' ').trim()
    if (!text) return await sendMessage(sock, sender, '☠ Usage: .palindrome <texte>\nEx: .palindrome kayak')
    const clean = text.toLowerCase().replace(/[^a-z]/g, '')
    const rev = clean.split('').reverse().join('')
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔄 *PALINDROME*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Texte : *${text}*\n✝ Inversé : *${text.split('').reverse().join('')}*\n☠ Palindrome : *${clean === rev ? '✅ OUI' : '❌ NON'}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
