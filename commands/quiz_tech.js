import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qui a fondé Apple?","a":"Steve Jobs,Jobs"},{"q":"En quelle année Internet a-t-il été inventé?","a":"1969,1991"},{"q":"Quel langage de programmation a été créé pour le web?","a":"javascript,java script"},{"q":"Que signifie HTML?","a":"HyperText Markup Language,hypertext markup language"},{"q":"Quel est le système d'exploitation le plus utilisé au monde?","a":"Windows"},{"q":"Qui a inventé le téléphone?","a":"Bell,Alexander Graham Bell,Graham Bell"},{"q":"Combien de bits dans un byte?","a":"8,huit"},{"q":"Que signifie CPU?","a":"Central Processing Unit,processeur central"}]
const games = new Map()
export default async function quiz_tech(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 💻 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 💻 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 💻 *QUIZ_TECH* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_tech <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}