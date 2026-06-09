// commands/enigme2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
const enigmes = [
  { q: "Je n'ai pas de corps, mais je mange tout : les arbres, les maisons, les animaux. Qui suis-je ?", r: "Le feu 🔥" },
  { q: "Je cours mais n'ai pas de pattes. J'ai une bouche mais ne peux pas parler. Qui suis-je ?", r: "Une rivière 🌊" },
  { q: "Plus je grandis, moins on me voit. Qui suis-je ?", r: "L'obscurité 🌑" },
  { q: "Je nais de la nuit, disparais au matin, et ma naissance annonce la pluie. Qui suis-je ?", r: "La rosée 💧" },
  { q: "Je suis partout autour de toi, mais tu ne peux pas me voir ni me toucher. Qui suis-je ?", r: "L'air 💨" },
  { q: "Je suis le début de tout, la fin de tout le monde. Sans moi, rien ne commence. Qui suis-je ?", r: "La lettre E 🔤" },
]
export default async function enigme2(sock, sender, args) {
  const e = enigmes[Math.floor(Math.random() * enigmes.length)]
  const voir = args[0]?.toLowerCase() === 'rep'
  const text = `☩━━━〔 🧠 *ÉNIGME DÉMONIAQUE II* 〕━━━☩\n\n☠  🤔 *L'Énigme:*\n⛧  _${e.q}_\n\n${voir ? `✝  💡 *Réponse:* ${e.r}\n\n` : `✝  💡 Tape *.enigme2 rep* pour la réponse\n\n`}⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
