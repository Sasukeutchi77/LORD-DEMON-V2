import { sendMessage } from '../lib/sendMessage.js'
export default async function lovetest(sock, sender, args, msg, ctx = {}) {
  try {
    const score = Math.floor(Math.random() * 41) + 60
    const msg2 = score >= 90 ? '💘 Amour parfait! Vous êtes faits l\'un pour l\'autre!' : score >= 75 ? '💕 Belle compatibilité! L\'amour est au rendez-vous!' : '💛 Bien! Il faut travailler la relation!'
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const targetStr = target ? `@${target.split('@')[0]}` : '???'
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  💕 *LOVE TEST*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💘 Vous + ${targetStr}\n\n❤️ Score : *${score}%*\n💌 ${msg2}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, target ? {mentions: [target]} : {})
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
