// commands/pouvoirspecial.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_pouvoirspecial(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const pows=['Controler le temps pendant 10 secondes','Teleporter a 100m de distance','Voir les intentions des gens','Creer des illusions parfaites','Absorber les competences des adversaires','Regenerer en temps reel','Predire les attaques une seconde avant','Invoquer une arme legendaire']; const result=pows[Math.floor(Math.random()*pows.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   POUVOIR SPECIAL   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
