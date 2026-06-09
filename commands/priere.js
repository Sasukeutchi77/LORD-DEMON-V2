// commands/priere.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Ô seigneur des ombres entend ma prière","Que la lumière guide mes pas","Je confie mon âme aux forces divines","Exauce mon voeu en ce jour","Ma prière s élève vers les cieux"]
export default async function cmd_priere(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *PRIERE*\n\n'+item)}
