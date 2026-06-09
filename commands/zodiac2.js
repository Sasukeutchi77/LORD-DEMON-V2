import { sendMessage } from '../lib/sendMessage.js'
export default async function zodiac2(sock, sender, args, msg, ctx = {}) {
  try {
    const responses = [
      '✨ Résultat incroyable! 🌟',
      '🔥 Excellent résultat! ⚡',
      '💫 Magnifique! 🎉',
      '👑 Exceptionnel! 💎',
      '🌈 Fantastique! 🚀'
    ]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎯 *ZODIAC2*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${responses[Math.floor(Math.random()*responses.length)]}\n\n_Commande: .${ctx.command || 'zodiac2'}_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
