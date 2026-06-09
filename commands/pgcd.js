// commands/pgcd.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_pgcd(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const a=parseInt(args[0]),b=parseInt(args[1]); if(!a||!b) return sendMessage(sock,sender,'Usage: .pgcd <a> <b>'); const gcd=(x,y)=>y?gcd(y,x%y):x; const result='PGCD('+a+','+b+') = *'+gcd(Math.abs(a),Math.abs(b))+'*'
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   PGCD   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
