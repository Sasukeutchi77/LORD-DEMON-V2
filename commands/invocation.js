// commands/invocation.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = ["Familier invoqué !","Esprit ancestral convoqué","Démon mineur au service","Ange gardien appelé","Créature spectrale apparue",
    "⛧ Démon Ancestral convoqué — il se soumet à votre volonté !",
    "☠ Spectre des Enfers matérialisé — prêt à servir !",
    "✝ Ange Déchu invoqué — lié par votre pacte !",
    "☩ Gardien Infernal apparaît — votre serviteur !",
    "⸸ Entité du Voile convoquée — elle obéit !",
    "💀 Nécromancien Fantôme réveillé — à vos ordres !",
    "🔥 Élémentaire du Chaos invoqué — sa puissance est vôtre !",
    "👹 Seigneur Démoniaque de Rang III — fait allégeance !"]
export default async function cmd_invocation(sock,sender,args,msg,ctx={}) {
  try {const jid=ctx.senderJid||getSenderJid(msg,sock);const item=ITEMS[Math.floor(Math.random()*ITEMS.length)];await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔮 *INVOCATION*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n⛧ *INVOCATION*\n\n\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`+item)
  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}