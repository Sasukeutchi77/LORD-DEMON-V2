import { sendMessage } from '../lib/sendMessage.js'
const DEVS = [
  {q:"Je parle sans bouche et entend sans oreilles. Qui suis-je?", a:"Un écho"},
  {q:"Plus je sèche, plus je suis mouillée. Qui suis-je?", a:"Une serviette"},
  {q:"J'ai des villes, mais pas de maisons. J'ai de l'eau, mais pas de poisson. Qui suis-je?", a:"Une carte"},
  {q:"Je commence l'éternité, je finis le temps. Qui suis-je?", a:"La lettre E"},
  {q:"Plus il y en a, moins on voit. Qui suis-je?", a:"L'obscurité"},
  {q:"Je n'ai pas de pieds mais je cours. Qui suis-je?", a:"L'eau"},
  {q:"J'ai des feuilles mais pas de racines. Qui suis-je?", a:"Un livre"},
  {q:"On me jette quand on a besoin de moi et on me reprend quand on n'a plus besoin. Qui suis-je?", a:"Une ancre"}
]
export default async function devinette(sock, sender, args, msg, ctx = {}) {
  try {
    const d = DEVS[Math.floor(Math.random() * DEVS.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🤔 *DEVINETTE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${d.q}\n\n_Répondez avant que je révèle la réponse!_\n⏳ Réponse dans 30 secondes...\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    setTimeout(async () => {
      await sendMessage(sock, sender, `✅ *RÉPONSE :* ${d.a}`)
    }, 30000)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
