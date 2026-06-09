import { sendMessage } from '../lib/sendMessage.js'
const CHAMPIONS = [
  { nom: "Arken le Devastateur", classe: "Guerrier", rang: "S", wins: 847, signature: "Coup de tonnerre" },
  { nom: "Valkara la Maudite", classe: "Nécromancienne", rang: "S+", wins: 1203, signature: "Armée des morts" },
  { nom: "Drakon le Brûleur", classe: "Mage de feu", rang: "A+", wins: 634, signature: "Météore de sang" },
  { nom: "Seraph l'Invisible", classe: "Assassin", rang: "S", wins: 990, signature: "Coup fantôme" },
  { nom: "Titan de Fer", classe: "Paladin sombre", rang: "A", wins: 512, signature: "Mur infranchissable" },
]
export default async function champions(sock, sender, args, msg, ctx = {}) {
  const c = CHAMPIONS[Math.floor(Math.random() * CHAMPIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏆 *CHAMPION DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👑 *Nom:* ${c.nom}\n` +
    `⛧  🎭 *Classe:* ${c.classe}\n` +
    `✝  📊 *Rang:* ${c.rang} | *Victoires:* ${c.wins}\n` +
    `☩  ⭐ *Technique signature:* ${c.signature}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
