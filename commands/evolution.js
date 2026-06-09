// commands/evolution.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Niveau suivant débloqué !","Evolution en cours...","Tu as évolué vers une forme supérieure","Capacités améliorées","Potentiel maximum atteint"]
export default async function cmd_evolution(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *EVOLUTION*\n\n'+item)}
