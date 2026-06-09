import { sendMessage } from '../lib/sendMessage.js'
const BOSS_LIST = [
  { nom: "Lich Éternel", hp: 5000, atk: 450, special: "Ressuscite en 3 tours", faiblesse: "Feu sacré" },
  { nom: "Dragon Ancien", hp: 8000, atk: 700, special: "Souffle de feu de zone", faiblesse: "Magie de glace" },
  { nom: "Léviathan des Abysses", hp: 10000, atk: 600, special: "Tsunami dévastateur", faiblesse: "Foudre" },
  { nom: "Seigneur des Morts", hp: 6000, atk: 550, special: "Invoque 10 zombies/tour", faiblesse: "Lumière divine" },
  { nom: "Démon Primordial", hp: 15000, atk: 1000, special: "Toutes les magies, téléportation", faiblesse: "Relique ancienne" },
  { nom: "Phénix Corrompu", hp: 4000, atk: 400, special: "Renaît à 50% PV à la mort", faiblesse: "Eau bénite" },
  { nom: "Titan de Pierre", hp: 12000, atk: 800, special: "Séisme + immunité physique", faiblesse: "Acide de démon" },
  { nom: "Ombre Absolue", hp: 7000, atk: 650, special: "Intangible de jour, x200% la nuit", faiblesse: "Cristal de lumière" },
]
export default async function boss2(sock, sender, args, msg, ctx = {}) {
  const b = BOSS_LIST[Math.floor(Math.random() * BOSS_LIST.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👹 *BOSS LÉGENDAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👹 *Nom:* ${b.nom}\n` +
    `⛧  ❤️ *PV:* ${b.hp.toLocaleString()} | 💥 *ATK:* ${b.atk}\n` +
    `✝  ⭐ *Capacité:* ${b.special}\n` +
    `☩  ⚠️ *Faiblesse:* ${b.faiblesse}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
