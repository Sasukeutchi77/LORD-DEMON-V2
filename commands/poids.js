// commands/poids.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_poids(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const val=parseFloat(args[0]),u=(args[1]||'kg').toLowerCase(); if(!val) return sendMessage(sock,sender,'Usage: .poids <val> <kg/g/lb/oz>'); let res; if(u==='kg') res=val+'kg = '+(val*1000)+'g = '+(val*2.205).toFixed(2)+'lb'; else if(u==='lb') res=val+'lb = '+(val*0.453).toFixed(3)+'kg'; else res=val+'g = '+(val/1000)+'kg'; const result=res
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CONVERTISSEUR POIDS   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
