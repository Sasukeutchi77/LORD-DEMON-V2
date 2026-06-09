import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ANIMAUX = ["🦁 Lion", "🐺 Loup", "🦅 Aigle", "🐉 Dragon", "🦊 Renard", "🐻 Ours", "🦋 Papillon noir", "🐍 Serpent"]
const COULEURS = ["Rouge sang", "Noir abyssal", "Or démoniaque", "Argent lunaire", "Violet royal", "Vert venin", "Bleu glacial"]
const DEVISES = [
  "La force avant tout",
  "Jamais sans honneur",
  "Feu et sang",
  "Dans l'ombre je règne",
  "Persiste et signe",
  "La mort me suit",
  "L'éternité ou rien",
  "Seul l'élite subsiste",
]
export default async function blason(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const nom = args.join(' ') || `Maison ${jid.split('@')[0].slice(-4)}`
  const animal = ANIMAUX[Math.floor(Math.random() * ANIMAUX.length)]
  const couleur = COULEURS[Math.floor(Math.random() * COULEURS.length)]
  const devise = DEVISES[Math.floor(Math.random() * DEVISES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🛡️ *BLASON DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Maison:* ${nom}\n` +
    `⛧  🐾 *Animal:* ${animal}\n` +
    `✝  🎨 *Couleurs:* ${couleur}\n` +
    `☩  ⚔️ *Devise:* _"${devise}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
