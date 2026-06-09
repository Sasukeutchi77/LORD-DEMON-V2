import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Quel est le plus grand océan?","a":"Pacifique,Pacific"},{"q":"Combien de continents y a-t-il?","a":"7,sept"},{"q":"Quel métal est liquide à température ambiante?","a":"Mercure,Mercury"},{"q":"Quelle est la vitesse de la lumière?","a":"300000,300 000 km/s"},{"q":"Combien d'os dans le corps humain?","a":"206"},{"q":"Quel est le symbole chimique de l'or?","a":"Au"},{"q":"Quelle planète est la plus proche de la Terre?","a":"Vénus,Venus"},{"q":"Dans quelle ville se trouve Big Ben?","a":"Londres,London"}]
const games = new Map()
export default async function trivia3(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  if (games.has(sender)) {
    const g = games.get(sender)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(sender)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🧠 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 Bonne réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🧠 ❌ *FAUX!* 〕━━━☩\n☠\n⛧  La réponse était: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(sender, { q })
  setTimeout(() => games.delete(sender), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🧠 *TRIVIA3* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}trivia3 <réponse> (60s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}