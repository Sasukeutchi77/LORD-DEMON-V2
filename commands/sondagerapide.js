// commands/sondagerapide.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function sondagerapide(sock, sender, args) {
  if (!args.length) return await sendMessage(sock, sender,
    `☩━━━〔 📊 *SONDAGE RAPIDE* 〕━━━☩\n\n✝  Usage: *.sondagerapide <question>*\n⛧  Exemple: *.sondagerapide Pizza ou Burger ?*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const question = args.join(' ')
  const text =
    `☩━━━〔 📊 *SONDAGE RAPIDE* 〕━━━☩\n\n` +
    `☠  ❓ *Question:*\n` +
    `⛧  _${question}_\n\n` +
    `✝  Réagissez avec:\n` +
    `☩  👍 *OUI / D'accord*\n` +
    `☠  👎 *NON / Pas d'accord*\n` +
    `⛧  🤷 *Neutre / Sans avis*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
