// commands/des2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_des2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const n=parseInt(args[0])||1, s=parseInt(args[1])||6; const rolls=Array.from({length:Math.min(n,10)},()=>1+Math.floor(Math.random()*s)); const result='De'+s+' x'+rolls.length+': '+rolls.join(', ')+' | Total: '+rolls.reduce((a,b)=>a+b,0)
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   LANCER DE DES   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
