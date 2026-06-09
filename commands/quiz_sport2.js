import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Combien de joueurs dans une équipe de football?","a":"11,onze"},{"q":"Qui détient le record du 100m avec 9.58 secondes?","a":"Bolt,Usain Bolt"},{"q":"Quel pays a remporté le plus de Coupes du Monde foot?","a":"Brésil,Brazil"},{"q":"Combien de points vaut un essai au rugby?","a":"5,cinq"},{"q":"Quelle est la durée d'un match de basketball NBA?","a":"48 minutes,48"},{"q":"Dans quel sport parle-t-on d'un \"smash\"?","a":"tennis,badminton,volley"},{"q":"Quel sport se joue avec un volant?","a":"badminton"},{"q":"En quelle année ont eu lieu les premiers JO modernes?","a":"1896"}]
const games = new Map()
export default async function quiz_sport2(sock, sender, args, msg, ctx) {
  try {
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

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}