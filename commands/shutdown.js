// commands/shutdown.js — LORD DEMON
// ✅ Arrêt définitif avec design amélioré + confirmation

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isOwner } from '../lib/ownerSystem.js'
import fs   from 'fs'
import path from 'path'

export default async function shutdown(sock, sender, args, msg) {
  try {
    const user = getSenderJid(msg, sock)
    if (!isOwner(user)) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🚫 *ACCÈS REFUSÉ* — Owner uniquement.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const confirmed = (args[0] || '').toLowerCase() === 'confirm'

    if (!confirmed) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☩   ⛔  ARRÊT DÉFINITIF          ✝\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `☩━━━〔 ⚠️ *ATTENTION* 〕━━━☩\n☠\n` +
        `⛧  Cette sort arrête le Démon\n` +
        `☩  *définitivement*.\n✝\n` +
        `☠  Le lanceur *ne relancera pas*\n` +
        `⛧  le Démon automatiquement.\n☩\n` +
        `✝  Pour un simple redémarrage,\n` +
        `☠  utilisez plutôt \`.restart\`\n⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☩  💀 *Confirmez avec :*\n✝  \`.shutdown confirm\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const flagDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(flagDir)) fs.mkdirSync(flagDir, { recursive: true })
    fs.writeFileSync(path.join(flagDir, 'shutdown.flag'), String(Date.now()))

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☠   ⛔  ARRÊT EN COURS...        ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n☩\n` +
      `✝  ⛔ *Arrêt définitif demandé.*\n☠\n` +
      `⛧  💀 LORD DEMON s'éteint...\n` +
      `☩  Le Démon ne redémarrera pas\n` +
      `✝  automatiquement.\n☠\n` +
      `⛧  🔄 Pour relancer : démarrez\n` +
      `☩  manuellement le serveur.\n✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

    setTimeout(() => process.exit(0), 1500)

  } catch (e) {
    console.error('❌ shutdown.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué shutdown: ${e.message}`)
  }
}
