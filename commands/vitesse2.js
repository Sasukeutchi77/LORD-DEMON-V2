// commands/vitesse2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_vitesse2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const val=parseFloat(args[0]),u=(args[1]||'kmh').toLowerCase(); if(!val) return sendMessage(sock,sender,'Usage: .vitesse2 <val> <kmh/mph/ms>'); let res; if(u==='kmh') res=val+' km/h = '+(val/3.6).toFixed(2)+' m/s = '+(val*0.621).toFixed(2)+' mph'; else if(u==='mph') res=val+' mph = '+(val*1.609).toFixed(2)+' km/h'; else res=val+' m/s = '+(val*3.6).toFixed(2)+' km/h'; const result=res
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CONVERTISSEUR VITESSE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
