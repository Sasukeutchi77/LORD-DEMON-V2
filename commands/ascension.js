import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const STADES = [
  { stade: "Éveil Initial", rang: "Apprenti", bonus: "+50 ATK, +25 DEF", condition: "Premier pas vers la grandeur" },
  { stade: "Initiation Sombre", rang: "Initié", bonus: "+150 ATK, +75 DEF, aura faible", condition: "Le vrai chemin commence ici" },
  { stade: "Transformation", rang: "Adepte", bonus: "+300 ATK, +150 DEF, régén 5%/tour", condition: "Tu n'es plus qui tu étais" },
  { stade: "Ascension Véritable", rang: "Champion", bonus: "+600 ATK, +300 DEF, résurrection 1x", condition: "Peu atteignent ce stade" },
  { stade: "Transcendance", rang: "Légende", bonus: "+1200 ATK, +600 DEF, immortalité partielle", condition: "Les dieux te reconnaissent" },
]
export default async function ascension(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const s = STADES[Math.floor(Math.random() * STADES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌅 *ASCENSION DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🌟 *Stade:* ${s.stade}\n` +
    `⛧  🎖️ *Rang atteint:* ${s.rang}\n` +
    `✝  ⚡ *Bonus:* ${s.bonus}\n` +
    `☩  📖 _"${s.condition}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
