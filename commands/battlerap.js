import { sendMessage } from '../lib/sendMessage.js'
const BARS = ['Tu pensais être le meilleur? Mon flow te dépasse, tes rimes sont des erreurs / Mon micro est une arme, le tien est juste pour les pleurs 🎤','Mes lyrics sont en or, les tiens valent des sous / Je suis le roi de ce ring, toi tu es juste un fou 👑','Chaque syllabe que je crache est une vérité / Le public m\'acclame pendant que tu restes ignoré ⚡','Tu parles fort mais tes actes sont silencieux / Moi j\'avance sans bruit mais mon impact est sérieux 💯','J\'ai des bars chauds comme le soleil d\'Abidjan, ton flow est froid comme un frigo / Pendant que tu cherches tes mots, moi j\'écris des épigraphes 🔥']
export default async function battlerap(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎤 *BATTLE RAP*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${BARS[Math.floor(Math.random() * BARS.length)]}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
