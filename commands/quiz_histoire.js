import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"En quelle année a commencé la Révolution française?","a":"1789"},{"q":"Qui a construit la Grande Pyramide de Gizeh?","a":"Khéops,Chéops,Khufu"},{"q":"En quelle année l'Afrique du Sud a aboli l'apartheid?","a":"1994"},{"q":"Quelle est la date d'indépendance du Sénégal?","a":"1960"},{"q":"Qui a fondé l'empire mongol?","a":"Gengis Khan,Genghis Khan"},{"q":"Quel pays a subi deux bombes atomiques en 1945?","a":"Japon,Japan"},{"q":"En quelle année a eu lieu la chute du Mur de Berlin?","a":"1989"},{"q":"Qui était le premier président des États-Unis?","a":"Washington,George Washington"}]
const games = new Map()
export default async function quiz_histoire(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 📜 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 📜 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 📜 *QUIZ_HISTOIRE* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_histoire <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}