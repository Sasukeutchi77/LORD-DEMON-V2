// commands/oracle.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Les astres s alignent en ta faveur","Une grande épreuve approche","La victoire sera tienne","Méfie-toi des faux alliés","Le destin te sourit ce soir"]
export default async function cmd_oracle(sock,sender,args,msg,ctx={}) {
  try {const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔮 *ORACLE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n⛧ *ORACLE PARLE*\n\n\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`+item)
  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}