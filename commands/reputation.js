// commands/reputation.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_reputation(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const reps=['Legendaire — Connu dans tous les royaumes','Heroique — Admire des masses','Redoute — Craint de tous','Mysterieux — Personne ne sait qui tu es vraiment','Infame — Pourchasse par la justice','Neutre — Ni ange ni demon','Honore — Respecte des anciens','Maudit — Fui par tous']; const result=reps[Math.floor(Math.random()*reps.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TA REPUTATION   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
