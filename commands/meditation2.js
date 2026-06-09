// commands/meditation2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Ton esprit s apaise","Les pensées se dissolvent","Concentration absolue atteinte","Connexion au cosmos établie","Paix intérieure retrouvée"]
export default async function cmd_meditation2(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *MEDITATION PROFONDE*\n\n'+item)}
