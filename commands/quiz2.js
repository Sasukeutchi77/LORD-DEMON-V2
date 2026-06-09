import { sendMessage } from '../lib/sendMessage.js'
const QS = [{q:'Quelle est la capitale du Sénégal?',r:'Dakar',c:['Thiès','Dakar','Kaolack','Ziguinchor']},{q:'En quelle année a eu lieu la Révolution française?',r:'1789',c:['1776','1789','1804','1815']},{q:'Quel est le plus grand océan du monde?',r:'Pacifique',c:['Atlantique','Indien','Arctique','Pacifique']},{q:'Combien de continents y a-t-il?',r:'7',c:['5','6','7','8']},{q:'Quelle est la planète la plus proche du Soleil?',r:'Mercure',c:['Vénus','Mercure','Mars','Terre']},{q:'Qui a peint la Joconde?',r:'Léonard de Vinci',c:['Picasso','Michel-Ange','Léonard de Vinci','Raphaël']},{q:'Quel est le pays le plus grand du monde?',r:'Russie',c:['Canada','USA','Chine','Russie']}]
export default async function quiz2(sock, sender, args, msg, ctx = {}) {
  try {
    const q = QS[Math.floor(Math.random() * QS.length)]
    const shuffled = [...q.c].sort(() => Math.random() - 0.5)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🧠 *QUIZ*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${q.q}\n\n${shuffled.map((c,i) => `${'ABCD'[i]}. ${c}`).join('\n')}\n\n⏳ Réponse dans 30s...\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    setTimeout(async () => await sendMessage(sock, sender, `✅ *Bonne réponse: ${q.r}*`), 30000)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
