// commands/background.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_background(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const bg=['Ancien mercenaire reconverti en aventurier','Mage exilé qui cherche sa redemption','Guerrier sans memoire qui reconstruit son identite','Explorateur maudit qui cherche la mort','Noble dechue qui prouve sa valeur','Orphelin eleve par des assassins','Heritier d un empire qui a tout perdu','Gardien d un secret millénaire']; const result=bg[Math.floor(Math.random()*bg.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   BACKGROUND RPG   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
