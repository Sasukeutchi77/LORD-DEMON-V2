import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CLANS2 = [
  { nom: "Cercle de l'Éternité", rang: "Légendaire", territoire: "7 régions conquises", alliance: "Ordre des Cendres" },
  { nom: "Pacte Infernal", rang: "Mythique", territoire: "12 régions conquises", alliance: "Légion Noire" },
  { nom: "Confrérie des Ombres", rang: "Épique", territoire: "4 régions conquises", alliance: "Fraternité Sombre" },
  { nom: "Ligue des Démons", rang: "Rare", territoire: "2 régions conquises", alliance: "Aucune" },
  { nom: "Ordre Primordial", rang: "Divin", territoire: "20 régions conquises", alliance: "Toutes les factions" },
]
export default async function clan2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = CLANS2[Math.floor(Math.random() * CLANS2.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏴 *CLAN AVANCÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏴 *Nom:* ${c.nom}\n` +
    `⛧  👑 *Rang:* ${c.rang}\n` +
    `✝  🗺️ *Territoire:* ${c.territoire}\n` +
    `☩  🤝 *Alliance:* ${c.alliance}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
