// commands/lancement.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function lancement(sock, sender, args) {
  try {
  if (args.length < 2) return await sendMessage(sock, sender, `☩━━━〔 🚀 *LANCEMENT* 〕━━━☩\n\n✝  Usage: *.lancement <option1> | <option2> | ...*\n⛧  Exemple: *.lancement Pizza | Burger | Sushi*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const options = args.join(' ').split('|').map(o => o.trim()).filter(Boolean)
  if (options.length < 2) return await sendMessage(sock, sender, `⛧ Il faut au moins 2 options séparées par |`)
  const choix = options[Math.floor(Math.random() * options.length)]
  const text =
    `☩━━━〔 🚀 *LANCEMENT DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📋 *Options:*\n` +
    options.map((o, i) => `⛧  ${i+1}. ${o}`).join('\n') +
    `\n\n✝  🎯 *Le Démon choisit:*\n` +
    `☩  *➜ ${choix}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}