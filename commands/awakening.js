import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const EVEILS = [
  { titre: "L'Éveil du Démon Intérieur", desc: "Tu vois au-delà du voile des mortels", pouvoir: "Vision démoniaque + aura de terreur" },
  { titre: "Conscience Élargie", desc: "La conscience s'étend vers l'infini obscur", pouvoir: "Perçoit les esprits et les intentions" },
  { titre: "L'Irréversible Éveil", desc: "Tu n'es plus le même être qu'avant", pouvoir: "Résistance à toute manipulation mentale" },
  { titre: "Éveil du Guerrier Sombre", desc: "Ton pouvoir de combat se libère enfin", pouvoir: "+300% force, instinct de combat parfait" },
  { titre: "Transcendance Démoniaque", desc: "La frontière entre humain et démon s'efface", pouvoir: "Transformation partielle à volonté" },
]
export default async function awakening(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const e = EVEILS[Math.floor(Math.random() * EVEILS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌅 *ÉVEIL DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ✨ *Éveil:* ${e.titre}\n` +
    `⛧  💬 *Manifestation:* ${e.desc}\n` +
    `✝  ⚡ *Pouvoir acquis:* ${e.pouvoir}\n\n` +
    `☩  _@${jid.split('@')[0]}, ton éveil a commencé..._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
