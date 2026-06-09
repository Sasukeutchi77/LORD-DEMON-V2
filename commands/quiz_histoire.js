import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"En quelle année la Révolution française a-t-elle commencé?","a":"1789"},{"q":"Quel pharaon a construit la Grande Pyramide?","a":"Khéops,Chéops"},{"q":"Quelle guerre a duré 100 ans?","a":"guerre de cent ans,guerre"},{"q":"Qui était le premier président des USA?","a":"Washington,George Washington"},{"q":"En quelle année l'Afrique du Sud a aboli l'apartheid?","a":"1994"},{"q":"Quelle est la date de l'indépendance du Sénégal?","a":"1960,4 avril"},{"q":"Qui a fondé l'empire mongol?","a":"Gengis Khan,Genghis Khan"},{"q":"En quelle année a eu lieu la 2e Guerre Mondiale?","a":"1939,1945,1939-1945"}]
const games = new Map()
export default async function quiz_histoire(sock, sender, args, msg, ctx) {
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
}