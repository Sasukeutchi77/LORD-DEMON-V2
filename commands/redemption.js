// commands/redemption.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Tes erreurs sont pardonnées","La rédemption est possible","Un nouveau chapitre s ouvre","Tu peux repartir de zéro","La lumière accueille les repentis"]
export default async function cmd_redemption(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *REDEMPTION*\n\n'+item)}
