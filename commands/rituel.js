// commands/rituel.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Cercle de protection tracé","Invocation commencée","Les portails s ouvrent","Le démon répond à l appel","Rituel accompli avec succès"]
export default async function cmd_rituel(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *RITUEL*\n\n'+item)}
