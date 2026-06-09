// commands/quiz-tech.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"En quelle année a été créé Internet ?","r":"1969 (ARPANET)","opts":["1965","1969 (ARPANET)","1975","1983"]},{"q":"Que signifie HTTP ?","r":"HyperText Transfer Protocol","opts":["High Tech Transfer Protocol","HyperText Transfer Protocol","Hyper Transfer Text Protocol","HyperText Transmission Protocol"]},{"q":"Qui a fondé Microsoft ?","r":"Bill Gates","opts":["Steve Jobs","Mark Zuckerberg","Bill Gates","Elon Musk"]},{"q":"Quel langage est utilisé pour le style sur le web ?","r":"CSS","opts":["HTML","JavaScript","CSS","PHP"]},{"q":"Que signifie RAM ?","r":"Random Access Memory","opts":["Read Access Memory","Random Access Memory","Real Access Memory","Rapid Access Memory"]}]
const sessions = new Map()

export default async function quiz_tech(sock, sender, args, msg) {
  try {
  const s = sessions.get(sender)
  if (s) {
    const ans = args.join(' ').toLowerCase().trim()
    const correct = s.r.toLowerCase()
    sessions.delete(sender)
    if (ans === correct || s.opts.some(o=>o.toLowerCase()===ans)) {
      return sendMessage(sock, sender, `✅ *CORRECT !*\n\n📖 ${s.q}\n💡 Réponse: *${s.r}*`)
    }
    return sendMessage(sock, sender, `❌ *FAUX !*\n\n📖 ${s.q}\n💡 Réponse: *${s.r}*`)
  }
  const q = QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)]
  sessions.set(sender, q)
  setTimeout(() => { if(sessions.get(sender)===q) sessions.delete(sender) }, 30000)
  const opts = q.opts.map((o,i)=>['🅐','🅑','🅒','🅓'][i]+' '+o).join('\n')
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💻 QUIZ TECHNOLOGIE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${q.q}\n\n${opts}\n\n⏱️ 30 secondes ! Répondez avec le texte.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}