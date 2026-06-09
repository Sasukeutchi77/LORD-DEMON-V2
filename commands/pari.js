// commands/pari.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_pari(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const events=['Match de foot','Course de chevaux','Tournoi de poker','Duel de gladiateurs','Course de robots']; const ev=events[Math.floor(Math.random()*events.length)]; const win=Math.random()<0.5; const result=win?'✅ Votre pari sur ['+ev+'] a gagne ! +Coins':'❌ Votre pari sur ['+ev+'] a perdu.'
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   PARI (FUN)   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}