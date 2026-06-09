import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"Quel est le plus grand mammifère terrestre?","a":"éléphant"},{"q":"Quel oiseau ne peut pas voler?","a":"autruche,manchot,pingouin"},{"q":"Combien de pattes a une araignée?","a":"8,huit"},{"q":"Quel animal a la gestation la plus longue?","a":"éléphant"},{"q":"Quel est le seul mammifère capable de voler?","a":"chauve-souris"},{"q":"Quel insecte produit le miel?","a":"abeille"},{"q":"Quel animal est le plus rapide du monde?","a":"guépard,cheetah"},{"q":"Quel animal a 3 coeurs et 9 cerveaux?","a":"pieuvre,poulpe"}]
const games = new Map()
export default async function quiz_animaux(sock, sender, args, msg, ctx) {
  try {
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

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}