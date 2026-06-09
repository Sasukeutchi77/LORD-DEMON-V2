// commands/quiz-histoire.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"En quelle année a eu lieu la Révolution française ?","r":"1789","opts":["1776","1789","1804","1815"]},{"q":"Qui a construit les pyramides de Gizeh ?","r":"Les Égyptiens anciens","opts":["Les Romains","Les Grecs","Les Égyptiens anciens","Les Phéniciens"]},{"q":"Quelle est la capitale de l'Empire romain ?","r":"Rome","opts":["Athènes","Constantinople","Rome","Carthage"]},{"q":"En quelle année Napoléon a-t-il été exilé à Sainte-Hélène ?","r":"1815","opts":["1812","1813","1814","1815"]},{"q":"Qui était le premier président des États-Unis ?","r":"George Washington","opts":["Abraham Lincoln","Thomas Jefferson","George Washington","John Adams"]}]
const sessions = new Map()

export default async function quiz_histoire(sock, sender, args, msg) {
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
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   📜 QUIZ HISTOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${q.q}\n\n${opts}\n\n⏱️ 30 secondes ! Répondez avec le texte.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
