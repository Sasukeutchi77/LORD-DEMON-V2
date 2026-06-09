import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CLANS = [
  { nom: "Clan des Cendres", embleme: "🔥", devise: "Nous brûlons tout sur notre passage", puissance: 9200, membres: 47 },
  { nom: "Ordre du Crâne Noir", embleme: "☠", devise: "La mort est notre alliée", puissance: 8750, membres: 31 },
  { nom: "Cercle des Démons", embleme: "⛧", devise: "Le pouvoir absolu ou rien", puissance: 9800, membres: 52 },
  { nom: "Fraternité de l'Abîsse", embleme: "🌑", devise: "Les ténèbres nous protègent", puissance: 7600, membres: 28 },
  { nom: "Légion Infernale", embleme: "⚔️", devise: "Conquérir, dominer, transcender", puissance: 10500, membres: 65 },
]
export default async function clan(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = CLANS[Math.floor(Math.random() * CLANS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${c.embleme} *CLAN DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏴 *Nom:* ${c.nom}\n` +
    `⛧  📜 *Devise:* _"${c.devise}"_\n` +
    `✝  💥 *Puissance:* ${c.puissance.toLocaleString()} pts\n` +
    `☩  👥 *Membres:* ${c.membres}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
