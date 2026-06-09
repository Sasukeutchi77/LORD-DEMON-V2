import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Quelle est la capitale du Japon?","a":"Tokyo"},{"q":"Quel est le plus grand pays d'Afrique?","a":"Algérie,Algeria"},{"q":"Dans quel pays se trouve le Mont Everest?","a":"Népal,Nepal"},{"q":"Quelle est la capitale de l'Australie?","a":"Canberra"},{"q":"Quel pays a la plus grande superficie?","a":"Russie,Russia"},{"q":"Quel est le plus petit pays du monde?","a":"Vatican"},{"q":"Quel pays est traversé par l'équateur et a 3 capitales?","a":"Équateur,Afrique du Sud,Ecuador"},{"q":"Quelle est la capitale du Canada?","a":"Ottawa"}]
const games = new Map()
export default async function quiz_pays2(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🌍 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🌍 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🌍 *QUIZ_PAYS2* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_pays2 <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}