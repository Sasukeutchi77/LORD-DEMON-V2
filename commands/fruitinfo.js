import { sendMessage } from '../lib/sendMessage.js'
export default async function fruitinfo(sock, sender, args, msg, ctx = {}) {
  try {
    const responses = [
      '✨ Résultat incroyable! 🌟',
      '🔥 Excellent résultat! ⚡',
      '💫 Magnifique! 🎉',
      '👑 Exceptionnel! 💎',
      '🌈 Fantastique! 🚀'
    ]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎯 *FRUITINFO*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${responses[Math.floor(Math.random()*responses.length)]}\n\n_Commande: .${ctx.command || 'fruitinfo'}_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
