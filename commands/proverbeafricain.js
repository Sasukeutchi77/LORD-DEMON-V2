import { sendMessage } from '../lib/sendMessage.js'
const PROVERBES = ['*L\'union fait la force* — Si tu veux aller vite, marche seul. Si tu veux aller loin, marche ensemble. 🌍','*La patience* — Quelle que soit la longueur de la nuit, le jour finit par paraître. ☀️','*L\'entraide* — La main unique ne peut pas soulever un rocher. 🤝','*La vie* — Un arbre qui tombe fait plus de bruit qu\'une forêt qui pousse. 🌳','*La persévérance* — Même si la tortue a une carapace dure, elle continue d\'avancer. 🐢','*La connaissance* — Celui qui pose une question reste ignorant une minute. Celui qui ne pose pas reste ignorant à vie. 💡','*La sagesse* — Un enfant qui n\'est pas aimé de son village brûlera ce village pour se faire remarquer. 🔥','*La famille* — Je suis parce que nous sommes. Ubuntu. 👥']
export default async function proverbeafricain(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌍 *PROVERBE AFRICAIN*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${PROVERBES[Math.floor(Math.random() * PROVERBES.length)]}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
