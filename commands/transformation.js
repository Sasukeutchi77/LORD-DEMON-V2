// commands/transformation.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Tu te transformes en loup","Forme bestiale activée","Métamorphose sombre enclenchée","Tu deviens ton animal totem","La forme finale est atteinte"]
export default async function cmd_transformation(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *TRANSFORMATION*\n\n'+item)}
