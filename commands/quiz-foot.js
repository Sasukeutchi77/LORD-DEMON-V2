// commands/quiz-foot.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Quelle equipe a remporte le plus de Coupes du Monde ?","r":"Le Bresil (5)","opts":["L Allemagne (4)","L Italie (4)","Le Bresil (5)","La France (2)"]},{"q":"Qui detient le record de Ballons d Or ?","r":"Lionel Messi (8)","opts":["Cristiano Ronaldo (5)","Zinedine Zidane (1)","Lionel Messi (8)","Ronaldinho (1)"]},{"q":"En quelle annee a ete fonde le FC Barcelone ?","r":"1899","opts":["1882","1899","1901","1910"]},{"q":"Quel stade a la plus grande capacite ?","r":"Rungrado (Coree du Nord)","opts":["Camp Nou","Wembley","Rungrado (Coree du Nord)","Maracana"]}]
const sessions = new Map()

export default async function cmd_quiz_foot(sock, sender, args, msg) {
  const s = sessions.get(sender)
  if (s && args.length) {
    const ans = args.join(' ').trim()
    sessions.delete(sender)
    const correct = ans.toLowerCase() === s.r.toLowerCase() || s.opts.some(o => o.toLowerCase() === ans.toLowerCase())
    return sendMessage(sock, sender, correct ? '✅ CORRECT ! Reponse: *' + s.r + '*' : '❌ FAUX ! C etait: *' + s.r + '*')
  }
  const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
  sessions.set(sender, q)
  setTimeout(() => sessions.delete(sender), 30000)
  const opts = q.opts.map((o, i) => ['A','B','C','D'][i] + '. ' + o).join('\n')
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   QUIZ FOOTBALL   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n❓ ' + q.q + '\n\n' + opts + '\n\n⏱️ 30 sec ! Tapez la reponse.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
