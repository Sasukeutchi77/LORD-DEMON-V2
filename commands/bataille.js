import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BATAILLES = [
  { nom: "Assaut Éclair", desc: "Attaque surprise à la vitesse de la foudre", dmg: () => Math.floor(Math.random()*400)+200 },
  { nom: "Frappe Démoniaque", desc: "Coup chargé d'énergie infernale", dmg: () => Math.floor(Math.random()*600)+300 },
  { nom: "Contre-attaque Sacrée", desc: "Riposte parfaite au dernier instant", dmg: () => Math.floor(Math.random()*500)+250 },
  { nom: "Combo Dévastateur", desc: "Série de 7 coups sans interruption", dmg: () => Math.floor(Math.random()*800)+400 },
  { nom: "Technique Secrète", desc: "Mouvement transmis par les ancêtres", dmg: () => Math.floor(Math.random()*1000)+500 },
]
export default async function bataille(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const b = BATAILLES[Math.floor(Math.random() * BATAILLES.length)]
  const dmg = b.dmg()
  const victoire = Math.random() > 0.35
  const xp = Math.floor(dmg / 10)
  const targetStr = target ? `@${target.split('@')[0]}` : "l'ennemi"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *BATAILLE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👊 *Technique:* ${b.nom}\n` +
    `⛧  📖 _${b.desc}_\n\n` +
    `✝  💥 *Dégâts infligés:* ${dmg} pts\n` +
    `☩  ${victoire ? '🏆 *VICTOIRE !*' : '💀 *DÉFAITE...*'}\n` +
    `☠  ✨ *XP gagné:* +${xp}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
