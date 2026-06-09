// commands/blason.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const animaux = ["🦁 Lion", "🐺 Loup", "🦅 Aigle", "🐉 Dragon", "🦊 Renard", "🐻 Ours", "🦋 Papillon noir"]
const couleurs = ["Rouge sang", "Noir abyssal", "Or démoniaque", "Argent lunaire", "Violet royal"]
const devises = ["La force avant tout", "Jamais sans honneur", "Feu et sang", "Dans l'ombre je règne", "Persiste et signe", "La mort me suit"]

export default async function blason(sock, sender, args) {
  const nom = args.join(' ') || 'Inconnu'
  const animal = animaux[Math.floor(Math.random() * animaux.length)]
  const couleur = couleurs[Math.floor(Math.random() * couleurs.length)]
  const devise = devises[Math.floor(Math.random() * devises.length)]
  const text =
    `☩━━━〔 🛡️ *BLASON DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  👤 *Maison:* ${nom}\n` +
    `⛧  🐾 *Animal:* ${animal}\n` +
    `✝  🎨 *Couleur:* ${couleur}\n` +
    `☩  ⚔️ *Devise:* _"${devise}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
