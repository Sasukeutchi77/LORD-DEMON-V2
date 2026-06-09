// commands/quiz-science.js
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [{"q":"Quelle est la formule chimique de l'eau ?","r":"H2O","opts":["H2O","CO2","NaCl","O2"]},{"q":"Combien d'os a le corps humain adulte ?","r":"206","opts":["185","206","215","248"]},{"q":"Quelle planète est la plus grande du système solaire ?","r":"Jupiter","opts":["Saturne","Jupiter","Uranus","Neptune"]},{"q":"Quel élément chimique a le symbole Au ?","r":"Or","opts":["Argent","Aluminium","Or","Arsenic"]},{"q":"Quelle est la vitesse de la lumière ?","r":"299 792 km/s","opts":["150 000 km/s","299 792 km/s","400 000 km/s","1 000 000 km/s"]}]
const sessions = new Map()

export default async function quiz_science(sock, sender, args, msg) {
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
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔬 QUIZ SCIENCE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${q.q}\n\n${opts}\n\n⏱️ 30 secondes ! Répondez avec le texte.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}