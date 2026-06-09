import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Dans quel pays est né Cristiano Ronaldo?","a":"Portugal"},{"q":"Qui a écrit la série Harry Potter?","a":"JK Rowling,Rowling"},{"q":"Quel rappeur s'appelle Aubrey Drake Graham?","a":"Drake"},{"q":"Qui est le PDG de Tesla et SpaceX?","a":"Elon Musk,Musk"},{"q":"Dans quel film DiCaprio joue Jack Dawson?","a":"Titanic"},{"q":"Qui joue Iron Man dans les films Marvel?","a":"Robert Downey Jr,RDJ"},{"q":"Qui a chanté Despacito?","a":"Luis Fonsi,Daddy Yankee"},{"q":"Quel footballeur a le plus de Ballons d'Or?","a":"Messi,Lionel Messi"}]
const games = new Map()
export default async function quiz_celeb(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 ⭐ ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 ⭐ ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 ⭐ *QUIZ_CELEB* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_celeb <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}