// commands/invocation.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Familier invoqué !","Esprit ancestral convoqué","Démon mineur au service","Ange gardien appelé","Créature spectrale apparue"]
export default async function cmd_invocation(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *INVOCATION*\n\n'+item)}
