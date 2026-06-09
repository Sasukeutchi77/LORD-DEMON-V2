// commands/enigme.js — ÉNIGMES 🧩
import { sendMessage } from '../lib/sendMessage.js'

const Q = [{"q":"J'ai des villes, mais pas de maisons. J'ai des montagnes, mais pas d'arbres. J'ai de l'eau, mais pas de poissons. Qu'est-ce que je suis ?","r":"Une carte géographique 🗺️"},{"q":"Plus je sèche, plus je suis mouillée. Qu'est-ce que je suis ?","r":"Une serviette 🏊"},{"q":"Je parle sans bouche, j'entends sans oreilles. Je n'ai pas de corps mais je prends vie avec le vent. Qu'est-ce que je suis ?","r":"Un écho 📢"},{"q":"Je suis toujours devant vous mais ne peut pas être vu. Qu'est-ce que je suis ?","r":"L'avenir 🔮"},{"q":"Plus vous en prenez, plus vous en laissez. Qu'est-ce que c'est ?","r":"Des pas 👣"},{"q":"J'ai des dents mais ne mords pas. Qu'est-ce que je suis ?","r":"Un peigne 🪮"}]

export default async function enigme(sock, sender, args, msg) {
  const q = Q[Math.floor(Math.random()*Q.length)]
  if (args[0] === 'reponse' || args[0] === 'réponse') {
    return sendMessage(sock, sender, `💡 *Réponse:*\n${q.r}`)
  }
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🧩 ÉNIGME   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🤔 ${q.q}\n\n💡 `.enigme réponse` pour la réponse\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
