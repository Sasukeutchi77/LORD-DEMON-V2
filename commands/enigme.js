import { sendMessage } from '../lib/sendMessage.js'
const Q = [
  { q: "J'ai des villes, mais pas de maisons. J'ai des montagnes, mais pas d'arbres. J'ai de l'eau, mais pas de poissons. Qu'est-ce que je suis ?", r: "Une carte géographique 🗺️" },
  { q: "Plus je sèche, plus je suis mouillée. Qu'est-ce que je suis ?", r: "Une serviette 🏊" },
  { q: "Je parle sans bouche, j'entends sans oreilles. Je n'ai pas de corps mais je prends vie avec le vent. Qu'est-ce que je suis ?", r: "Un écho 📢" },
  { q: "Je suis toujours devant vous mais ne peut pas être vu. Qu'est-ce que je suis ?", r: "L'avenir 🔮" },
  { q: "Plus vous en prenez, plus vous en laissez. Qu'est-ce que c'est ?", r: "Des pas 👣" },
  { q: "J'ai des dents mais ne mords pas. Qu'est-ce que je suis ?", r: "Un peigne 🪮" },
  { q: "Je peux voler sans ailes, pleurer sans yeux. Qu'est-ce que je suis ?", r: "Un nuage ☁️" },
  { q: "Je commence la nuit, termine le matin, et suis au milieu du lit. Qu'est-ce que je suis ?", r: "La lettre 'i'" },
]
let current = null
export default async function enigme(sock, sender, args, msg, ctx = {}) {
  if (args[0] === 'reponse' || args[0] === 'réponse') {
    if (!current) return sendMessage(sock, sender, `☠ Aucune énigme en cours. Lance .enigme d'abord !`)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   💡 *RÉPONSE DE L'ÉNIGME*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  ✅ *Réponse:* ${current.r}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
  current = Q[Math.floor(Math.random() * Q.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🧩 *ÉNIGME DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🤔 ${current.q}\n\n` +
    `⛧  💡 _.enigme réponse_ pour la solution\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
