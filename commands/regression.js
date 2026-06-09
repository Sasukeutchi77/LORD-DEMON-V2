// commands/regression.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Retour à la case départ","Niveau réduit de moitié","La défaite te recule","Apprentissage par l échec","Tout recommencer est parfois nécessaire"]
export default async function cmd_regression(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *REGRESSION (FUN)*\n\n'+item)}
