// commands/quiz-anim.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Quel animal peut se tourner la tete a 270 degres ?","r":"Le hibou","opts":["Le chat","Le hibou","La chouette","Le pigeon"]},{"q":"Combien de pattes a une araignee ?","r":"8","opts":["6","7","8","10"]},{"q":"Quel est le plus grand animal du monde ?","r":"La baleine bleue","opts":["L elephant","La girafe","La baleine bleue","Le requin baleine"]},{"q":"Le koala mange principalement ?","r":"Des feuilles d eucalyptus","opts":["Du bambou","Des feuilles d eucalyptus","Des insectes","Des fruits"]}]
const sessions = new Map()

export default async function cmd_quiz_anim(sock, sender, args, msg) {
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
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   QUIZ ANIMAUX   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n❓ ' + q.q + '\n\n' + opts + '\n\n⏱️ 30 sec ! Tapez la reponse.\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
