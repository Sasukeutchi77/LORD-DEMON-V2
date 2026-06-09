// commands/puissance.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_puissance(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const b=parseFloat(args[0]),e=parseFloat(args[1]); if(!b||e===undefined) return sendMessage(sock,sender,'Usage: .puissance <base> <exposant>'); const result=b+'^'+e+' = *'+Math.pow(b,e)+'*'
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   PUISSANCE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
