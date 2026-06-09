// commands/romannum.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_romannum(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const n=parseInt(args[0])||1; const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1]; const syms=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']; let r='',num=Math.min(n,3999); for(let i=0;i<vals.length;i++) while(num>=vals[i]){r+=syms[i];num-=vals[i]}; const result=args[0]+' = *'+r+'*'
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CHIFFRES ROMAINS   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
