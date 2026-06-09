import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Combien font 15 × 15?","a":"225"},{"q":"Quelle est la valeur de pi (2 décimales)?","a":"3.14,3.14159"},{"q":"Combien de secondes dans une heure?","a":"3600"},{"q":"Quel est le carré de 12?","a":"144"},{"q":"Racine carrée de 144?","a":"12"},{"q":"Combien font 2 puissance 10?","a":"1024"},{"q":"Quel est le plus petit nombre premier?","a":"2"},{"q":"Combien de côtés a un hexagone?","a":"6,six"}]
const games = new Map()
export default async function quiz_math(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🔢 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🔢 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🔢 *QUIZ_MATH* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_math <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}