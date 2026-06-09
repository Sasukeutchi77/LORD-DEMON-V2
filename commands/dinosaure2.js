import { sendMessage } from '../lib/sendMessage.js'
const DINOS = [
  { nom: "T-Rex", emoji: "🦕", fact: "12m de long, 9 tonnes, morsure de 35 000N — plus forte de l'histoire", epoque: "Crétacé supérieur" },
  { nom: "Diplodocus", emoji: "🦕", fact: "25m de long, 12t, herbivore, cou de 8m pour atteindre les cimes", epoque: "Jurassique" },
  { nom: "Vélociraptor", emoji: "🦎", fact: "1.8m, couvert de plumes, chassait en meute avec une intelligence redoutable", epoque: "Crétacé" },
  { nom: "Brachiosaure", emoji: "🦕", fact: "26m, 58 tonnes, cou de 9m, se nourrissait continuellement", epoque: "Jurassique supérieur" },
  { nom: "Triceratops", emoji: "🦷", fact: "3 cornes redoutables, crête osseuse d'1m, combattait le T-Rex", epoque: "Crétacé supérieur" },
  { nom: "Ankylosaure", emoji: "🥚", fact: "Armure osseuse totale, queue-massue de 45kg — tank vivant", epoque: "Crétacé" },
  { nom: "Spinosaure", emoji: "🦎", fact: "18m — le plus long dinosaure connu, semi-aquatique, Afrique du Nord", epoque: "Crétacé moyen" },
]
export default async function dinosaure2(sock, sender, args, msg, ctx = {}) {
  const d = DINOS[Math.floor(Math.random() * DINOS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🦕 *DINOSAURES*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${d.emoji} *${d.nom}*\n` +
    `⛧  📅 *Époque:* ${d.epoque}\n` +
    `✝  📖 _${d.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
