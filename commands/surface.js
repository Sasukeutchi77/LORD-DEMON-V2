// commands/surface.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_surface(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const val=parseFloat(args[0]),u=(args[1]||'m2').toLowerCase(); if(!val) return sendMessage(sock,sender,'Usage: .surface <val> <m2/km2/ha/ft2>'); let res; if(u==='m2') res=val+'m² = '+(val/10000)+'ha = '+(val/1000000)+'km²'; else if(u==='km2') res=val+'km² = '+(val*100)+'ha = '+(val*1000000)+'m²'; else res=val+'ha = '+(val*10000)+'m²'; const result=res
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CONVERTISSEUR SURFACE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
