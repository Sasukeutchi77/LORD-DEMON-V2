// commands/serment2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Par le sang de mes ancêtres","Je jure sur ma vie","Que les ombres témoignent","Mon honneur est en jeu","Serment irrévocable"]
export default async function cmd_serment2(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *SERMENT DE SANG*\n\n'+item)}
