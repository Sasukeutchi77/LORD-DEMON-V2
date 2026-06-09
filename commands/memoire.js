// commands/memoire.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_memoire(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const result='Fonctionnalite de memoire RPG: vos aventures sont sauvegardees dans la base de donnees. Consultez .rpg profil pour votre historique.'
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   MEMOIRE RPG   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
