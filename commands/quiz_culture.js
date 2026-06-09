import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qui a peint la Joconde?","a":"Léonard de Vinci,Vinci,Da Vinci"},{"q":"Qui a écrit Les Misérables?","a":"Victor Hugo"},{"q":"Quel auteur a créé Sherlock Holmes?","a":"Conan Doyle,Arthur Conan Doyle"},{"q":"Qui a composé la Lettre à Élise?","a":"Beethoven"},{"q":"Dans quelle ville se trouve le Louvre?","a":"Paris"},{"q":"Qui a écrit 1984?","a":"George Orwell,Orwell"},{"q":"Qui a peint la Chapelle Sixtine?","a":"Michel-Ange,Michelangelo"},{"q":"Qui a écrit Don Quichotte?","a":"Cervantes,Miguel de Cervantes"}]
const games = new Map()
export default async function quiz_culture(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🎭 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🎭 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🎭 *QUIZ_CULTURE* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_culture <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}