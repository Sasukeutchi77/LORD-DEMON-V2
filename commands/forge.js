import { sendMessage } from '../lib/sendMessage.js'
export default async function forge(sock, sender, args, msg, ctx = {}) {
  try {
    const emojis = ['⚔️','🛡️','🏆','💎','🔥','⚡','🌟','💫','🎯','👑','🌑','☠️','⛧','✝️','☩']
    const emoji = emojis[Math.floor(Math.random()*emojis.length)]
    const msgs = [
      'Action accomplie avec succès! ✅',
      'Puissance débloquée! ⚡',
      'Résultat légendaire obtenu! 👑',
      'Mission réussie! 🏆',
      'Niveau maximum atteint! 🌟'
    ]
    const score = Math.floor(Math.random()*2000)+500
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ${emoji} *FORGE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${msgs[Math.floor(Math.random()*msgs.length)]}\n\n☩ XP gagné : *+${score}*\n✝ Rang : *LORD DEMON*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
