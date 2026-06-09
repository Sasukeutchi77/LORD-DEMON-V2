import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const QUESTIONS = [
  "Ton personnage est-il réel ou fictif ?",
  "Est-il connu pour sa force physique ?",
  "Est-il un leader ou un roi ?",
  "Est-il apparu dans un film ou une série ?",
  "Est-il originaire d'Afrique ?",
  "Est-il un super-héros ou un vilain ?",
  "Est-il lié à la magie ou aux pouvoirs surnaturels ?",
  "Est-il encore en vie actuellement ?",
]
const DEVINEUSES = [
  "Je pense que tu penses à *Naruto Uzumaki* 🍜",
  "Ma réponse est *Thanos* le conquérant cosmique 💜",
  "Je devine... *Black Panther*, roi de Wakanda 🐾",
  "Ton personnage est *Luffy D. Monkey* — futur roi des pirates ⚓",
  "Je pense à *Saitama* — punch qui brise les dimensions 👊",
  "Ma vision dit *Meliodas* — le Démon Primordial ⛧",
]
export default async function akinator2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
  const reponse = DEVINEUSES[Math.floor(Math.random() * DEVINEUSES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🧞 *AKINATOR DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🤔 *Question:* ${question}\n\n` +
    `⛧  🔮 *Ma divination:*\n` +
    `✝  ${reponse}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
