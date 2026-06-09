import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CLAUSES = [
  "Tu céderas 1 an de ta vie en échange du pouvoir absolu",
  "Tes ennemis disparaissent — mais tu perds ta voix pour toujours",
  "Tu deviens invincible — mais seul pour l'éternité",
  "Richesse infinie — au prix de ta mémoire des proches",
  "Connaissance totale de l'univers — mais tu ne peux rien faire",
  "Le don de guérison — mais tu absorbes toutes les douleurs",
  "Immortalité — mais tu regardes tous mourir autour de toi",
  "Succès garanti — mais quelqu'un que tu aimes souffre",
]
const TEMOINS = ["⛧ Le Démon Primordial","☩ L'Oracle Éternel","☠ La Faucheuse","✝ L'Ange Déchu","🔮 Le Cristal des Âmes"]
export default async function contrat(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const clause = CLAUSES[Math.floor(Math.random() * CLAUSES.length)]
  const temoin = TEMOINS[Math.floor(Math.random() * TEMOINS.length)]
  const id = Date.now().toString(36).toUpperCase()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📜 *CONTRAT DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🖊️ *Signataire:* @${jid.split('@')[0]}\n` +
    `⛧  📋 *Clause:* _${clause}_\n` +
    `✝  👁️ *Témoin:* ${temoin}\n` +
    `☩  🔢 *Réf:* #${id}\n\n` +
    `☠  ⚠️ _Ce contrat lie l'âme pour l'éternité._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
