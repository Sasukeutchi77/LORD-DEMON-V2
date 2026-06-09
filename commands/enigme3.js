import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const QAS = [
  {q:"Je parle sans bouche, j'entends sans oreilles. Qui suis-je?",a:["écho","echo"]},
  {q:"Plus je sèche, plus je suis mouillée. Qui suis-je?",a:["serviette"]},
  {q:"Deux mères et deux filles sont dans une voiture. Combien de personnes?",a:["3","trois"]},
  {q:"Je n'ai pas de vie mais je peux mourir. Qui suis-je?",a:["batterie","pile"]},
  {q:"Je cours mais je n'ai pas de jambes. Qui suis-je?",a:["rivière","fleuve","eau"]},
  {q:"Plus je vieillis, plus je grandis. Qui suis-je?",a:["arbre"]},
  {q:"Je suis plein de trous mais retiens l'eau. Qui suis-je?",a:["éponge","eponge"]},
  {q:"Qu'est-ce qu'on jette quand on en a besoin et reprend quand on n'en a plus besoin?",a:["ancre"]},
]
const games = new Map()
export default async function enigme3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (games.has(sender)) {
    const g = games.get(sender)
    const rep = args.join(' ').toLowerCase().trim()
    const ok = g.a.some(a => rep.includes(a))
    games.delete(sender)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🧩 *RÉSULTAT*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  ${ok ? '✅ *BONNE RÉPONSE !*' : '❌ *MAUVAISE RÉPONSE !*'}\n` +
      `⛧  💡 *Réponse:* ${g.a[0]}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const qa = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(sender, qa)
  setTimeout(()=>games.delete(sender), 60000)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🧩 *ÉNIGME #3*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ❓ _${qa.q}_\n\n` +
    `⛧  _Réponds directement (60 sec)_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
