import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BENEDICTIONS = [
  { titre: "Grâce Éternelle", formule: "Que la fortune te sourie à chaque aurore", bonus: "+100% chance pendant 24h" },
  { titre: "Bouclier Divin", formule: "Que tes ennemis tombent à tes pieds impuissants", bonus: "+200 DEF, immunité malédictions" },
  { titre: "Chemin Ouvert", formule: "Que chaque porte s'ouvre devant ta volonté", bonus: "Accès à toutes les zones interdites" },
  { titre: "Aura de Victoire", formule: "Que le triomphe t'accompagne dans chaque épreuve", bonus: "+50% probabilité de victoire" },
  { titre: "Sagesse des Anciens", formule: "Que la sagesse guide chacun de tes pas", bonus: "+150 INT, résistance aux illusions" },
]
export default async function benediction2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const b = BENEDICTIONS[Math.floor(Math.random() * BENEDICTIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✨ *BÉNÉDICTION SACRÉE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🙏 *${b.titre}*\n\n` +
    `⛧  _"${b.formule}"_\n\n` +
    `✝  ⚡ *Effet:* ${b.bonus}\n` +
    `☩  👤 *Béni:* @${target.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
