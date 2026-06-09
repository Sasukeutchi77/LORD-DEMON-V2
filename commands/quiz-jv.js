// commands/quiz-jv.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Dans quel jeu joue-t-on Super Mario ?","r":"Super Mario Bros (Nintendo)","opts":["Sega","Super Mario Bros (Nintendo)","Atari","Capcom"]},{"q":"Quel est le jeu video le plus vendu de l histoire ?","r":"Minecraft","opts":["Tetris","GTA V","Minecraft","Call of Duty"]},{"q":"De quel pays vient le studio CD Projekt Red (Witcher) ?","r":"Pologne","opts":["Russie","Ukraine","Pologne","Republique Tcheque"]},{"q":"Dans Zelda quel est le nom de la princesse ?","r":"Zelda","opts":["Link","Ganon","Zelda","Impa"]}]
const sessions = new Map()

export default async function cmd_quiz_jv(sock, sender, args, msg) {
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
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   QUIZ JEUX VIDEO   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n❓ ' + q.q + '\n\n' + opts + '\n\n⏱️ 30 sec ! Tapez la reponse.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
