import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BADGES = [
  { badge: "🏆 Conquérant", condition: "Remporté 50 batailles", rareté: "Légendaire" },
  { badge: "⚡ Foudre Vivante", condition: "Vitesse d'action maximale", rareté: "Épique" },
  { badge: "🌟 Étoile Montante", condition: "Progression fulgurante", rareté: "Rare" },
  { badge: "🛡️ Gardien des Ombres", condition: "Protection de 100 membres", rareté: "Élite" },
  { badge: "⛧ Élu Démoniaque", condition: "Pacte avec les forces anciennes", rareté: "Mythique" },
  { badge: "👑 Roi Incontesté", condition: "Domination totale du classement", rareté: "Divin" },
  { badge: "🔥 Phénix Renaissant", condition: "Survécu à 10 défaites consécutives", rareté: "Épique" },
]
export default async function badge2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const name = msg?.pushName || jid.split('@')[0]
  const b = BADGES[Math.floor(Math.random() * BADGES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎖️ *BADGE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *${name}*\n\n` +
    `⛧  🎖️ *Badge:* ${b.badge}\n` +
    `✝  📋 *Condition:* ${b.condition}\n` +
    `☩  💎 *Rareté:* ${b.rareté}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
