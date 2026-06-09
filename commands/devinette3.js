import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Qu'est-ce qui est blanc, léger et peut faire peur?","a":"fantôme"},{"q":"J'ai des branches mais pas de feuilles. Je n'ai pas de racines. Qui suis-je?","a":"banque"},{"q":"Qu'est-ce qui est transparent et pourtant on ne peut pas le voir?","a":"air,verre"},{"q":"Je vole sans ailes. Qui suis-je?","a":"temps,heure"},{"q":"Plus tu en prends, plus tu en laisses derrière toi. Qui suis-je?","a":"pas,traces"},{"q":"J'ai un cou mais pas de tête. Qui suis-je?","a":"bouteille"},{"q":"Je suis toujours devant toi mais ne peut jamais être vu. Qui suis-je?","a":"futur,avenir"},{"q":"Qu'est-ce qui a des dents mais ne peut pas manger?","a":"peigne,scie"}]
const games = new Map()
export default async function devinette3(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  if (games.has(sender)) {
    const g = games.get(sender)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(sender)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 ❓ ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 Bonne réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 ❓ ❌ *FAUX!* 〕━━━☩\n☠\n⛧  La réponse était: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(sender, { q })
  setTimeout(() => games.delete(sender), 60000)
  await sendMessage(sock, sender, `☩━━━〔 ❓ *DEVINETTE3* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}devinette3 <réponse> (60s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}