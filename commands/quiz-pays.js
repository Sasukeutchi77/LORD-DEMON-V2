// commands/quiz-pays.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Quel pays a la plus grande superficie ?","r":"La Russie","opts":["La Chine","Le Canada","La Russie","Les USA"]},{"q":"Quelle est la capitale de l Australie ?","r":"Canberra","opts":["Sydney","Melbourne","Canberra","Brisbane"]},{"q":"Combien de pays composent l Union Europeenne ?","r":"27","opts":["25","26","27","28"]},{"q":"Quel pays compte le plus d habitants ?","r":"L Inde","opts":["La Chine","L Inde","Les USA","L Indonesie"]}]
const sessions = new Map()

export default async function cmd_quiz_pays(sock, sender, args, msg) {
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
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   QUIZ PAYS   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n❓ ' + q.q + '\n\n' + opts + '\n\n⏱️ 30 sec ! Tapez la reponse.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
