// commands/oracle.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Les astres s alignent en ta faveur","Une grande épreuve approche","La victoire sera tienne","Méfie-toi des faux alliés","Le destin te sourit ce soir"]
export default async function cmd_oracle(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *ORACLE PARLE*\n\n'+item)}
