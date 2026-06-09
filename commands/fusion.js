// commands/fusion.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Energie combinée x2","Fusion partielle 50%","Fusion totale accomplie !","Puissance fusionnée instable","Connexion parfaite etablie"]
export default async function cmd_fusion(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *FUSION DE POUVOIR*\n\n'+item)}
