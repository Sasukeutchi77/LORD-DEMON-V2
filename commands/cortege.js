import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CORTÈGES = [
  { nom: "Cortège du Démon Primordial ⛧", membres: "13 spectres, 7 chevaliers noirs, 3 archontes", puissance: 9999 },
  { nom: "Procession Royale 👑", membres: "50 gardes d'élite, 10 nobles, le roi en personne", puissance: 8500 },
  { nom: "Marche des Guerriers 🗡️", membres: "100 berserkers, 30 mages de combat, 5 généraux", puissance: 7800 },
  { nom: "Convoi des Sages 📜", membres: "20 archimages, 15 druides, gardiens de savoir", puissance: 6500 },
  { nom: "Parade des Champions 🏆", membres: "Les 10 plus grands combattants du continent", puissance: 9200 },
]
export default async function cortege(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = CORTÈGES[Math.floor(Math.random() * CORTÈGES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🚶 *CORTÈGE LÉGENDAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏴 *Cortège:* ${c.nom}\n` +
    `⛧  👥 *Membres:* ${c.membres}\n` +
    `✝  ⚡ *Puissance:* ${c.puissance.toLocaleString()}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
