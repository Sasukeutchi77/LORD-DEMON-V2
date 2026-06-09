import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CONSEILS = [
  "Ne compare pas ton chapitre 1 au chapitre 20 des autres.",
  "Prends soin de toi avant de prendre soin des autres.",
  "Chaque non est un pas vers le bon oui.",
  "Apprends de tes erreurs mais ne te bats pas pour elles.",
  "La patience est la clé de toutes les portes.",
  "Dis ce que tu penses et pense à ce que tu dis.",
  "Sois la personne que tu voulais rencontrer.",
  "L'effort d'aujourd'hui est la récompense de demain.",
  "Le silence est parfois la réponse la plus puissante.",
  "Ta valeur ne diminue pas parce que quelqu'un ne te voit pas.",
]
export default async function conseil(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = CONSEILS[Math.floor(Math.random() * CONSEILS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📿 *CONSEIL DU SAGE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💬 _"${item}"_\n\n` +
    `⛧  _— Sagesse des ancêtres démoniaques_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
