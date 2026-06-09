// commands/pardon.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Les erreurs sont humaines","Je t accorde mon pardon","La paix vaut mieux que la guerre","Avançons ensemble","Repartons de zéro"]
export default async function cmd_pardon(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *PARDON*\n\n'+item)}
