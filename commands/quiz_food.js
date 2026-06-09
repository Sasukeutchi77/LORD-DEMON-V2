import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"De quel pays vient la pizza?","a":"Italie,Italy"},{"q":"Quel épice est le plus cher du monde?","a":"Safran,Saffron"},{"q":"Quel est l'ingrédient principal du guacamole?","a":"Avocat,Avocado"},{"q":"De quel pays vient le sushi?","a":"Japon,Japan"},{"q":"Quel gaz est utilisé dans les chips?","a":"Azote,Nitrogen"},{"q":"Quel fruit est surnommé roi des fruits en Asie?","a":"Durian"},{"q":"Dans quel pays le chocolat a-t-il été inventé?","a":"Mexique,Mexico,Aztèques"},{"q":"Quel légume a le plus de variétés?","a":"Tomate,Pomme de terre,Piment"}]
const games = new Map()
export default async function quiz_food(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🍽️ ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🍽️ ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🍽️ *QUIZ_FOOD* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_food <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}