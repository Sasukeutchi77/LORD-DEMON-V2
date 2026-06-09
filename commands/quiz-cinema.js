// commands/quiz-cinema.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Quel film a remporté le premier Oscar en 1928 ?","r":"Wings","opts":["Metropolis","Wings","Sunrise","Ben-Hur"]},{"q":"Qui a réalisé Jurassic Park ?","r":"Steven Spielberg","opts":["James Cameron","George Lucas","Steven Spielberg","Ridley Scott"]},{"q":"Dans quel film voit-on la fameuse scène de la douche ?","r":"Psycho","opts":["Halloween","Psycho","The Shining","Scream"]},{"q":"Qui joue Jack dans Titanic ?","r":"Leonardo DiCaprio","opts":["Brad Pitt","Johnny Depp","Leonardo DiCaprio","Matt Damon"]},{"q":"Quelle est la durée du film Avatar (2009) ?","r":"2h42","opts":["2h15","2h30","2h42","3h05"]}]
const sessions = new Map()

export default async function quiz_cinema(sock, sender, args, msg) {
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
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎬 QUIZ CINÉMA   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${q.q}\n\n${opts}\n\n⏱️ 30 secondes ! Répondez avec le texte.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
