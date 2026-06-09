// commands/awakening.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Ton pouvoir s éveille !","La conscience s élargit","Tu vois au-delà du voile","L éveil est irréversible","Tu n es plus le même"]
export default async function cmd_awakening(sock,sender,args,msg,ctx={}){const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock,sender,'⛧ *EVEIL*\n\n'+item)}
