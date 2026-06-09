// commands/trahison.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["L allié devient ennemi...","La confiance brisée à jamais","Un poignard dans le dos","La trahison du siècle !","Plus jamais confiance"]
export default async function cmd_trahison(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *TRAHISON (FUN)*\n\n'+item)}
