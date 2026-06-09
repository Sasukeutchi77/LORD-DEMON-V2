// commands/investir.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_investir(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const amount=parseInt(args[0])||0; if(!amount) return sendMessage(sock,sender,'Usage: .investir <montant>'); const mult=[0.5,0.8,1.0,1.2,1.5,2.0,3.0]; const m=mult[Math.floor(Math.random()*mult.length)]; const result='Investissement: '+amount+' coins\nResultat: *'+(Math.floor(amount*m))+' coins* (x'+m+')'
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   INVESTIR   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
