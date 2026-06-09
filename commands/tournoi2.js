import { sendMessage } from '../lib/sendMessage.js'
export default async function tournoi2(sock, sender, args, msg, ctx = {}) {
  try {
    const outcomes = ['🏆 VICTOIRE!','💀 DÉFAITE!','🤝 ÉGALITÉ!','⚡ CRITIQUE!','🌟 PARFAIT!','🔥 DOMINANT!']
    const out = outcomes[Math.floor(Math.random()*outcomes.length)]
    const score = Math.floor(Math.random()*1000)+100
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚔️ *TOURNOI2*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${out}\n☩ Score : *${score} pts*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
