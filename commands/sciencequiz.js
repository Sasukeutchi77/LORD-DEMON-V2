import { sendMessage } from '../lib/sendMessage.js'
const QS = [{q:'Combien de planètes dans le système solaire?',a:'8',hint:'Pluton n\'en est plus une'},{q:'Quelle est la formule chimique de l\'eau?',a:'H2O',hint:'Hydrogène et Oxygène'},{q:'Quelle est la vitesse de la lumière (km/s)?',a:'300000',hint:'299 792 km/s'},{q:'Qui a découvert la gravité?',a:'Newton',hint:'Pomme qui tombe'},{q:'Quelle est la température d\'ébullition de l\'eau?',a:'100',hint:'En degrés Celsius, à pression normale'},{q:'Quel gaz respirons-nous principalement?',a:'azote',hint:'78% de l\'atmosphère, N2'},{q:'Combien de chromosomes a l\'homme?',a:'46',hint:'23 paires'},{q:'Quel est l\'élément le plus abondant sur Terre?',a:'oxygène',hint:'Dans la croûte terrestre'},{q:'Que mesure le sismographe?',a:'tremblements de terre',hint:'Séismes'},{q:'Quelle est la particule négative de l\'atome?',a:'electron',hint:'Éléctron — charge -'}]
const games = new Map()
export default async function sciencequiz(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(' ').some(w=>answer.includes(w)) || answer.includes(g.q.a.toLowerCase())
    games.delete(key)
    if (correct) return await sendMessage(sock, sender, `☩━━━〔 🔬 *SCIENCE — CORRECT !* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}* — Bravo!\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    return await sendMessage(sock, sender, `☩━━━〔 ❌ *SCIENCE — FAUX* 〕━━━☩\n☠\n⛧  La réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QS[Math.floor(Math.random()*QS.length)]
  games.set(key, { q })
  setTimeout(()=>games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🔬 *QUIZ SCIENCE* 〕━━━☩\n☠\n⛧  ❓ *${q.q}*\n☠\n✝  ${prefix}sciencequiz <réponse>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}