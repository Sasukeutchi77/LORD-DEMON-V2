import { sendMessage } from '../lib/sendMessage.js'
export default async function signe2(sock, sender, args, msg, ctx = {}) {
  try {
    const responses = [
      '✨ Résultat incroyable! 🌟',
      '🔥 Excellent résultat! ⚡',
      '💫 Magnifique! 🎉',
      '👑 Exceptionnel! 💎',
      '🌈 Fantastique! 🚀'
    ]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎯 *SIGNE2*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${responses[Math.floor(Math.random()*responses.length)]}\n\n_Commande: .${ctx.command || 'signe2'}_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
