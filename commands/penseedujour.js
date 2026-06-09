import { sendMessage } from '../lib/sendMessage.js'
const PENSEES = ['La vie est trop courte pour ne pas aimer ce qu\'on fait. — Anonyme','Ce que tu penses, tu le deviens. — Bouddha','La meilleure façon de prédire l\'avenir est de le créer. — Peter Drucker','Le succès, c\'est tomber 7 fois et se relever 8. — Proverbe japonais','La patience est amère, mais son fruit est doux. — Rousseau','Sois le changement que tu veux voir dans le monde. — Gandhi','Les rêves sont la nourriture de l\'âme. — Paulo Coelho','Chaque jour est une nouvelle chance de changer ta vie. — Anonyme','L\'échec est simplement l\'opportunité de recommencer, cette fois plus intelligemment. — Henry Ford','Crois en toi-même et tout devient possible. — Anonyme']
export default async function penseedujour(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  💭 *PENSÉE DU JOUR*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n_${PENSEES[Math.floor(Math.random() * PENSEES.length)]}_\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
