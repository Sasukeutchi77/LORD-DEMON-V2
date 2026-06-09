// commands/citation4.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
const citations = [
  { texte: "La force ne vient pas de la victoire. Tes luttes développent ta force.", auteur: "Arnold Schwarzenegger" },
  { texte: "Le succès c'est tomber sept fois et se relever huit.", auteur: "Proverbe japonais" },
  { texte: "Il n'y a pas de vent favorable pour celui qui ne sait pas où il va.", auteur: "Sénèque" },
  { texte: "La vie c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", auteur: "Albert Einstein" },
  { texte: "Ce n'est pas parce que les choses sont difficiles qu'on n'ose pas. C'est parce qu'on n'ose pas qu'elles sont difficiles.", auteur: "Sénèque" },
  { texte: "Le seul moyen de faire du bon travail est d'aimer ce que vous faites.", auteur: "Steve Jobs" },
  { texte: "Sois le changement que tu veux voir dans le monde.", auteur: "Mahatma Gandhi" },
  { texte: "Je peux accepter l'échec, tout le monde échoue à quelque chose. Mais je ne peux pas accepter de ne pas essayer.", auteur: "Michael Jordan" },
]
export default async function citation4(sock, sender, args) {
  const c = citations[Math.floor(Math.random() * citations.length)]
  const text = `☩━━━〔 💬 *CITATION PREMIUM* 〕━━━☩\n\n☠  💬 _"${c.texte}"_\n\n⛧  — *${c.auteur}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
