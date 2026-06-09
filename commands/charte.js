import { sendMessage } from '../lib/sendMessage.js'
export default async function charte(sock, sender, args, msg, ctx = {}) {
  const prefix = process.env.PREFIX || '.'
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📜 *CHARTE DU CERCLE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *Article I — Respect*\n` +
    `⛧  Tout membre se traite avec respect\n` +
    `✝  Aucune insulte personnelle tolérée\n\n` +
    `☠  *Article II — Discipline*\n` +
    `⛧  Obéir aux administrateurs du cercle\n` +
    `✝  3 avertissements = exclusion\n\n` +
    `☠  *Article III — Contenu*\n` +
    `⛧  Contenu adulte interdit sans permission\n` +
    `✝  Spam = banissement immédiat\n\n` +
    `☩  _Toute violation est punissable._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
