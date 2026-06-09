import { sendMessage } from '../lib/sendMessage.js'
export default async function course(sock, sender, args, msg, ctx = {}) {
  try {
    const scores = [100,200,300,500,750,1000,1500,2000]
    const score = scores[Math.floor(Math.random()*scores.length)]
    const res = Math.random()>0.5 ? '🏆 *VICTOIRE!*' : '💀 *DÉFAITE!*'
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎮 *COURSE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${res}\n☩ Score : *${score} pts*\n✝ Rang : *${score>=1000?'👑 LÉGENDAIRE':score>=500?'💎 ÉLITE':'🥉 DÉBUTANT'}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
