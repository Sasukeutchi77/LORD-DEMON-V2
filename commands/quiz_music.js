import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qui est le \"King of Pop\"?","a":"Michael Jackson,MJ"},{"q":"De quel pays vient le reggae?","a":"Jamaïque,Jamaica"},{"q":"Qui a composé la Symphonie n°5?","a":"Beethoven,Ludwig van Beethoven"},{"q":"Quel artiste africain a eu le plus de streams en 2023?","a":"Burna Boy,Wizkid"},{"q":"Quel instrument a 88 touches?","a":"piano"},{"q":"Que signifie \"Do Re Mi Fa Sol La Si\"?","a":"solfège,notes,gamme"},{"q":"Combien de cordes a une guitare classique?","a":"6,six"},{"q":"Qui a inventé le phonographe?","a":"Edison,Thomas Edison"}]
const games = new Map()
export default async function quiz_music(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🎵 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🎵 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🎵 *QUIZ_MUSIC* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_music <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}