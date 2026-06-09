// commands/planaction.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
export default async function planaction(sock, sender, args) {
  try {
  if (!args.length) return await sendMessage(sock, sender, `☩━━━〔 📋 *PLAN D'ACTION* 〕━━━☩\n\n✝  Usage: *.planaction <ton objectif>*\n⛧  Exemple: *.planaction Apprendre le code*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const objectif = args.join(' ')
  const text =
    `☩━━━〔 📋 *PLAN D'ACTION DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  🎯 *Objectif:* ${objectif}\n\n` +
    `⛧  📋 *Plan en 5 étapes:*\n` +
    `✝  1️⃣ Définir clairement l'objectif final\n` +
    `☩  2️⃣ Identifier les ressources nécessaires\n` +
    `☠  3️⃣ Découper en petites tâches quotidiennes\n` +
    `⛧  4️⃣ Fixer des délais précis pour chaque étape\n` +
    `✝  5️⃣ Mesurer tes progrès chaque semaine\n\n` +
    `☩  💡 *Conseil démoniaque:*\n` +
    `☠  _La discipline bat la motivation. Agis même sans envie._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}