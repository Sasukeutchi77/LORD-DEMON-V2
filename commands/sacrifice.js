// commands/sacrifice.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Le sacrifice honore les dieux","Ta dévotion est reconnue","L offrande est acceptée","Le rituel est accompli","Les forces obscures acquiescent"]
export default async function cmd_sacrifice(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *SACRIFICE (FUN)*\n\n'+item)}
