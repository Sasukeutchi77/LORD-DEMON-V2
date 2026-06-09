// commands/ascension.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Tu montes vers le rang supérieur","L ascension commence","Bientôt au sommet","Le chemin est tracé","La gloire t attend en haut"]
export default async function cmd_ascension(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *ASCENSION*\n\n'+item)}
