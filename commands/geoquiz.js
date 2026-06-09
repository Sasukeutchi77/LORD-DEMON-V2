import { sendMessage } from '../lib/sendMessage.js'
const QS = [{q:'Quelle est la capitale de la France?',a:'Paris',hint:'Ville Lumière'},{q:'Quel est le plus grand océan?',a:'Pacifique',hint:'Entre Asie et Amérique'},{q:'Quelle est la plus haute montagne du monde?',a:'Everest',hint:'Himalaya, 8848m'},{q:'Quelle est la capitale du Maroc?',a:'Rabat',hint:'Pas Casablanca!'},{q:'Quel est le plus long fleuve d\'Afrique?',a:'Nil',hint:'Coule vers la Méditerranée'},{q:'Quelle est la capitale du Japon?',a:'Tokyo',hint:'Mégapole asiatique'},{q:'Quel pays possède le plus grand territoire?',a:'Russie',hint:'17 millions km²'},{q:'Quelle est la capitale du Brésil?',a:'Brasilia',hint:'Pas Rio!'},{q:'Quel est le plus petit pays du monde?',a:'Vatican',hint:'0.44 km² à Rome'},{q:'Quelle est la capitale du Sénégal?',a:'Dakar',hint:'Pointe de l\'Afrique'}]
const games = new Map()
export default async function geoquiz(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    if (answer === g.q.a.toLowerCase() || g.q.a.toLowerCase().includes(answer)) {
      games.delete(key)
      return await sendMessage(sock, sender, `☩━━━〔 🌍 *GÉOQUIZ — CORRECT !* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}* — Bonne réponse!\n☠\n✝  ${prefix}geoquiz pour continuer\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
    if (answer === 'hint' || answer === 'indice') return await sendMessage(sock, sender, `💡 Indice: *${g.q.hint}*`)
    games.delete(key)
    return await sendMessage(sock, sender, `☩━━━〔 ❌ *GÉOQUIZ — FAUX* 〕━━━☩\n☠\n⛧  La réponse était: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QS[Math.floor(Math.random()*QS.length)]
  games.set(key, { q, time: Date.now() })
  setTimeout(()=>games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🌍 *GÉOQUIZ* 〕━━━☩\n☠\n⛧  ❓ *${q.q}*\n☠\n✝  ${prefix}geoquiz <réponse>\n☠  ${prefix}geoquiz indice (pour un indice)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
