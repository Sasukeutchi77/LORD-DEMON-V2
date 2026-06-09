import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Quelle planète est la plus proche du Soleil?","a":"Mercure,Mercury"},{"q":"Combien de lunes a Mars?","a":"2,deux"},{"q":"Quelle est la plus grande planète?","a":"Jupiter"},{"q":"En quelle année l'Homme a marché sur la Lune?","a":"1969"},{"q":"Quel est le nom de notre galaxie?","a":"Voie Lactée,Milky Way"},{"q":"Quelle planète est connue pour ses anneaux?","a":"Saturne,Saturn"},{"q":"Combien de planètes dans notre système solaire?","a":"8,huit"},{"q":"Quelle est l'étoile la plus proche?","a":"Soleil,Proxima du Centaure,Sun"}]
const games = new Map()
export default async function quiz_astro(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🌌 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🌌 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🌌 *QUIZ_ASTRO* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_astro <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}