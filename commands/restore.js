// commands/restore.js — LORD DEMON
// ✅ Restauration sécurisée avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isOwner } from '../lib/ownerSystem.js'

export default async function restore(sock, sender, args, msg) {
  try {
    const user = getSenderJid(msg, sock)
    if (!isOwner(user)) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🚫 *ACCÈS REFUSÉ* — Owner uniquement.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☩   ♻️  RESTAURATION DONNÉES     ✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🔐 *PROCÉDURE SÉCURISÉE* 〕━━━☩\n☠\n` +
      `⛧  ⚠️ *Restauration manuelle requise*\n☩\n` +
      `✝  Pour des raisons de sécurité,\n` +
      `☠  la restauration via WhatsApp\n` +
      `⛧  est endormie afin d'éviter\n` +
      `☩  l'écrasement accidentel\n` +
      `✝  des données du Démon.\n☠\n` +
      `⛧  📋 *Procédure correcte :*\n☩\n` +
      `✝  1️⃣ Récupérez le fichier backup\n` +
      `☠  2️⃣ Copiez-le dans \`/backups/\`\n` +
      `⛧  3️⃣ Renommez-le \`restore.json\`\n` +
      `☩  4️⃣ Redémarrez le Démon\n✝\n` +
      `☠  💡 Le Démon charge automatiquement\n` +
      `⛧  le fichier \`restore.json\`\n` +
      `☩  au démarrage si présent.\n✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `_🔒 Sécurité maximale — Aucune donnée_\n_n'est modifiée sans intervention manuelle._`
    )

  } catch (e) {
    console.error('❌ restore.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué restore: ${e.message}`)
  }
}
