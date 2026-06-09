import { sendMessage } from '../lib/sendMessage.js'
export default async function attaque(sock, sender, args, msg, ctx = {}) {
  try {
    const emojis = ['⚔️','🛡️','🏆','💎','🔥','⚡','🌟','💫','🎯','👑']
    const emoji = emojis[Math.floor(Math.random()*emojis.length)]
    const outcomes = ['🏆 Succès total!','⚡ Action accomplie!','🌟 Résultat excellent!','🔥 Impressionnant!','💎 Légendaire!']
    const score = Math.floor(Math.random()*500)+100
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ${emoji} *ATTAQUE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${outcomes[Math.floor(Math.random()*outcomes.length)]}\n☩ Gain : *+${score} XP*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
