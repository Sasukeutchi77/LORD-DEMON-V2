// commands/tournoi.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Phase de poules","Quart de finale","Demi-finale","Finale approche!","Champion couronné!","Elimination"]
export default async function cmd_tournoi(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *TOURNOI*\n\n'+item)}
