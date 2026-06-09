import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qui a inventé la théorie de la relativité?","a":"Einstein,Albert Einstein"},{"q":"Quel est le plus long fleuve d'Afrique?","a":"Nil,Nile"},{"q":"En quelle langue a été écrit le Coran?","a":"Arabe,Arabic"},{"q":"Quelle est la plus haute montagne d'Afrique?","a":"Kilimandjaro,Kilimanjaro"},{"q":"Quel pays a inventé l'écriture cunéiforme?","a":"Mésopotamie,Irak,Sumer"},{"q":"Qui a découvert la gravité (pomme)?","a":"Newton,Isaac Newton"},{"q":"Quel est le pays le plus peuplé d'Afrique?","a":"Nigeria"},{"q":"Quelle est la capitale de l'Égypte?","a":"Le Caire,Cairo"}]
const games = new Map()
export default async function quiz4(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  if (games.has(sender)) {
    const g = games.get(sender)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(sender)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🎓 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 Bonne réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🎓 ❌ *FAUX!* 〕━━━☩\n☠\n⛧  La réponse était: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(sender, { q })
  setTimeout(() => games.delete(sender), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🎓 *QUIZ4* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz4 <réponse> (60s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}