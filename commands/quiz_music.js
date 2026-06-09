import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qui est surnommé le \"King of Pop\"?","a":"Michael Jackson,MJ"},{"q":"De quel pays vient le reggae?","a":"Jamaïque,Jamaica"},{"q":"Qui a composé la Symphonie n°5?","a":"Beethoven"},{"q":"Quel instrument a 88 touches?","a":"piano"},{"q":"Combien de cordes a une guitare classique?","a":"6,six"},{"q":"Quel artiste a vendu le plus d'albums de tous les temps?","a":"Michael Jackson,Beatles"},{"q":"De quel pays vient l'afrobeat?","a":"Nigeria"},{"q":"Quel chanteur a chanté \"Thriller\"?","a":"Michael Jackson"}]
const games = new Map()
export default async function quiz_music(sock, sender, args, msg, ctx) {
  try {
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

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}