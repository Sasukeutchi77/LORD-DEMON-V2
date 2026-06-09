import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Je parle sans bouche, j'entends sans oreilles. Qui suis-je?","a":"écho,echo"},{"q":"Plus je sèche, plus je suis mouillée. Qui suis-je?","a":"serviette"},{"q":"Deux mères et deux filles sont dans une voiture. Combien de personnes?","a":"3,trois"},{"q":"Je n'ai pas de vie mais je peux mourir. Qui suis-je?","a":"batterie,pile"},{"q":"Je cours mais je n'ai pas de jambes. Qui suis-je?","a":"rivière,fleuve,eau"},{"q":"Plus je vieilis, plus je grandis. Qui suis-je?","a":"arbre"},{"q":"Je suis plein de trous mais retiens l'eau. Qui suis-je?","a":"éponge"},{"q":"Qu'est-ce qu'on jette quand on en a besoin et reprend quand on n'en a plus besoin?","a":"ancre"}]
const games = new Map()
export default async function enigme3(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  if (games.has(sender)) {
    const g = games.get(sender)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(sender)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🧩 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 Bonne réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🧩 ❌ *FAUX!* 〕━━━☩\n☠\n⛧  La réponse était: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(sender, { q })
  setTimeout(() => games.delete(sender), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🧩 *ENIGME3* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}enigme3 <réponse> (60s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}