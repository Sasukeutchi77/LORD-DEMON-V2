import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Quel est le plus grand mammifère terrestre?","a":"éléphant"},{"q":"Quel animal dort debout?","a":"cheval,girafe"},{"q":"Combien de pattes a une araignée?","a":"8,huit"},{"q":"Quel oiseau ne peut pas voler?","a":"autruche,manchot,pingouin"},{"q":"Quel est le seul mammifère capable de voler?","a":"chauve-souris"},{"q":"Combien de ventricules a le coeur humain?","a":"4,quatre"},{"q":"Quel animal a le plus grand cerveau?","a":"baleine bleue,cachalot"},{"q":"Quel insecte produit le miel?","a":"abeille"}]
const games = new Map()
export default async function quiz_animaux(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  const key = sender
  if (games.has(key)) {
    const g = games.get(key)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(key)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🦁 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🦁 ❌ *FAUX* 〕━━━☩\n☠\n⛧  Réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(key, { q })
  setTimeout(() => games.delete(key), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🦁 *QUIZ_ANIMAUX* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}quiz_animaux <réponse>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}