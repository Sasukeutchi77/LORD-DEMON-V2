// commands/private.js — LORD-DEMON
// 🔧 FIX: cleanNumber pour affichage propre (évite LID brut)

import { sendMessage }                                from '../lib/sendMessage.js'
import { showActionLoader, deleteLoader, formatTime } from '../lib/animLoader.js'
import {
  getMode,
  getSenderJid,
  isDeployer,
  isSudo,
  setMode,
  cleanNumber
} from '../lib/ownerSystem.js'

export default async function privateCmd(sock, sender, args, msg, ctx = {}) {
  let loaderKey = null

  try {

    // ── CTX ──────────────────────────────────────────────────
    const userId = ctx.senderJid || getSenderJid(msg, sock)

    // ── PERMISSION : Owner ou SUDO ───────────────────────────
    const isAllowed = ctx.isOwner || ctx.isSudo ||
                      isDeployer(userId) || isSudo(userId)

    if (!isAllowed) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `⛧ 🔒 Seuls le *Seigneur*\n` +
        `☩    et les *SUDO* peuvent\n` +
        `✝    changer le mode du Démon.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── MODE DÉJÀ ACTIF ──────────────────────────────────────
    if (getMode() === 'private') {
      return await sendMessage(sock, sender,
        `☩━━━〔 👁️ *MODE ACTUEL* 〕━━━☩\n\n` +
        `☠ Le Démon est déjà en\n` +
        `⛧ mode *🔒 PRIVÉ*.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── ACTIVATION ───────────────────────────────────────────
    loaderKey = await showActionLoader(sock, sender, 'CHANGEMENT DE MODE', '🔒')

    setMode('private')

    await deleteLoader(sock, sender, loaderKey)
    loaderKey = null

    // ✅ FIX v3 : cleanNumber au lieu de split('@')[0]
    const userNum = cleanNumber(userId)

    console.log(`🔒 Mode PRIVÉ | par: +${userNum}`)

    return await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `     ⛧ 🔒 *MODE PRIVÉ* 🔒 ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🩸 *MODE ACTIVÉ* 〕━━━☩\n` +
      `☠\n` +
      `☩ 📊 Mode: *PRIVÉ*\n` +
      `✝ 👻 Accès: *Owner + SUDO*\n` +
      `☠ 🕐 Heure: ${formatTime()}\n` +
      `⛧ 👮 Par: @${userNum}\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🔒 _Seuls le Seigneur et\nles SUDO peuvent interagir._`,
      { mentions: [userId] }
    )

  } catch (err) {
    if (loaderKey) await deleteLoader(sock, sender, loaderKey)
    console.error('❌ Erreur private:', err)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `☩ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}