// commands/quiz-manga.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Dans quel manga trouve-t-on Naruto Uzumaki ?","r":"Naruto","opts":["Bleach","One Piece","Naruto","Dragon Ball"]},{"q":"Quel est le pouvoir de Luffy dans One Piece ?","r":"Corps en caoutchouc","opts":["Controler la glace","Corps en caoutchouc","Lire les pensees","Voler"]},{"q":"Dans Attack on Titan qui est le protagoniste ?","r":"Eren Yaeger","opts":["Levi Ackerman","Mikasa Ackerman","Eren Yaeger","Armin Arlert"]},{"q":"Quel est le manga le plus vendu de tous les temps ?","r":"One Piece","opts":["Dragon Ball","Naruto","One Piece","Demon Slayer"]}]
const sessions = new Map()

export default async function cmd_quiz_manga(sock, sender, args, msg) {
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
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   QUIZ MANGA   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n❓ ' + q.q + '\n\n' + opts + '\n\n⏱️ 30 sec ! Tapez la reponse.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
