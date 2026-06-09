// commands/alliance.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Alliance de feu et ombres","Pacte de sang scelle","Coalition des demons","Union des anciens","Accord fragile signé"]
export default async function cmd_alliance(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *ALLIANCE*\n\n'+item)}
