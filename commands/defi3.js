import { sendMessage } from '../lib/sendMessage.js'
const DEFIS = ['Fais 20 pompes maintenant! 💪','Envoie un message gênant à quelqu\'un de ta liste 📱','Chante une chanson dans vocal 🎵','Danse pendant 30 secondes 💃','Imite quelqu\'un du groupe 🎭','Mange quelque chose de bizarre 🍽️','Appelle quelqu\'un au hasard dans tes contacts 📞','Fais une blague que tout le monde va noter 😂','Écris une poésie en 2 minutes ✍️','Raconte une histoire de 5 minutes minimum 📖']
export default async function defi3(sock, sender, args, msg, ctx = {}) {
  try {
    const d = DEFIS[Math.floor(Math.random() * DEFIS.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔥 *DÉFI*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🎯 ${d}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
