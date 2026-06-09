// commands/duel2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Challenge epique","+100 XP","Victoire ecrasante","-50 HP adversaire","Combat acharné","Match nul"]
export default async function cmd_duel2(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *DUEL RPG*\n\n'+item)}
