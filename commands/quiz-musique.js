// commands/quiz-musique.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Combien de notes existe-t-il dans la gamme musicale ?","r":"7","opts":["5","6","7","8"]},{"q":"Qui est le \"Roi du Pop\" ?","r":"Michael Jackson","opts":["Elvis Presley","Prince","Michael Jackson","David Bowie"]},{"q":"Quel instrument a 88 touches ?","r":"Piano","opts":["Orgue","Piano","Synthétiseur","Guitare"]},{"q":"Quelle est la note la plus aiguë parmi ces 4 ?","r":"Si","opts":["Do","Ré","La","Si"]},{"q":"Le jazz vient de quel pays ?","r":"États-Unis","opts":["France","Cuba","Jamaïque","États-Unis"]}]
const sessions = new Map()

export default async function quiz_musique(sock, sender, args, msg) {
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
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎵 QUIZ MUSIQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${q.q}\n\n${opts}\n\n⏱️ 30 secondes ! Répondez avec le texte.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}