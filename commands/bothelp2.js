import { sendMessage } from '../lib/sendMessage.js'
export default async function bothelp2(sock, sender, args, msg, ctx = {}) {
  const prefix = process.env.PREFIX || '.'
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤖 *AIDE BOT — LORD DEMON V2*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📋 *Commandes principales:*\n` +
    `⛧  ${prefix}help — Liste de toutes les commandes\n` +
    `✝  ${prefix}ping — Test connexion bot\n` +
    `☩  ${prefix}info — Infos du groupe\n\n` +
    `☠  📋 *Économie:*\n` +
    `⛧  ${prefix}solde — Voir ta fortune\n` +
    `✝  ${prefix}bank — Gérer ta banque\n\n` +
    `☠  📋 *RPG:*\n` +
    `⛧  ${prefix}rpg — Système de jeu de rôle\n` +
    `✝  ${prefix}niveau — Voir ton niveau\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
