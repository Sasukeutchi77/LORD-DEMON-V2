import { sendMessage } from '../lib/sendMessage.js'
const CAVERNES = [
  { nom: "Grotte des Murmures", danger: "⭐⭐⭐", tresor: "Gemmes noires + Armure spectrale", monstre: "Goules silencieuses (x12)" },
  { nom: "Caverne des Âmes Perdues", danger: "⭐⭐⭐⭐", tresor: "Or ancien + Anneau de résurrection", monstre: "Lich gardien niveau 50" },
  { nom: "Abîme Infernal", danger: "⭐⭐⭐⭐⭐", tresor: "Arme légendaire + Titre de champion", monstre: "Démon primordial dormant" },
  { nom: "Tunnels de Cristal Noir", danger: "⭐⭐", tresor: "Cristaux magiques + Parchemins rares", monstre: "Golems de pierre (x5)" },
  { nom: "Sépulcre Oublié", danger: "⭐⭐⭐", tresor: "Reliques sacrées + Élixir d'immortalité", monstre: "Squelettes de chevaliers (x20)" },
]
export default async function caverne(sock, sender, args, msg, ctx = {}) {
  const c = CAVERNES[Math.floor(Math.random() * CAVERNES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🕳️ *CAVERNE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🗺️ *Lieu:* ${c.nom}\n` +
    `⛧  ⚠️ *Niveau de danger:* ${c.danger}\n` +
    `✝  👹 *Monstre:* ${c.monstre}\n` +
    `☩  💎 *Trésor:* ${c.tresor}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
