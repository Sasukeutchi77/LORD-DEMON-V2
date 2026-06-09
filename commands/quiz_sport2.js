import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Combien de joueurs dans une équipe de football?","a":"11,onze"},{"q":"Qui détient le record du 100m (9.58s)?","a":"Bolt,Usain Bolt"},{"q":"Dans quel pays le basketball a-t-il été inventé?","a":"états-unis,usa,canada"},{"q":"Combien de sets faut-il pour gagner Wimbledon (hommes)?","a":"3,trois"},{"q":"Quelle est la durée d'un match de football?","a":"90 minutes,90"},{"q":"Quel pays a remporté le plus de Coupes du Monde football?","a":"Brésil"},{"q":"En quelle année se déroulent les prochains JO d'été?","a":"2028"},{"q":"Quel sport se joue avec un volant?","a":"badminton"}]
const games = new Map()
export default async function quiz_sport2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 ⚽ ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 ⚽ ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 ⚽ *QUIZ_SPORT2* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_sport2 <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}