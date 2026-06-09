import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qui a fondé Apple?","a":"Steve Jobs,Jobs"},{"q":"Que signifie HTML?","a":"HyperText Markup Language"},{"q":"Combien de bits dans un byte?","a":"8,huit"},{"q":"Quel est le système d'exploitation le plus utilisé?","a":"Windows"},{"q":"Que signifie CPU?","a":"Central Processing Unit"},{"q":"En quelle année le premier iPhone est sorti?","a":"2007"},{"q":"Quel langage est utilisé pour les pages web?","a":"HTML,CSS,JavaScript"},{"q":"Qui a inventé le World Wide Web?","a":"Tim Berners-Lee,Berners-Lee"}]
const games = new Map()
export default async function quiz_tech(sock, sender, args, msg, ctx) {
  try {
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

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}