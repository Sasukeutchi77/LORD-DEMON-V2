//⛧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⛧//
//        ADDSUDO — LORD DEMON            //
//   🔧 FIX : ctx utilisé               //
//   🔧 FIX : addSudo résultat vérifié  //
//   🔧 FIX : isDeployer via ctx        //
//⛧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⛧//

import { sendMessage }    from "../lib/sendMessage.js"
import { resolveTarget }  from "../lib/targetResolver.js"
import { config }         from "../config.js"

import {
  addSudo,
  getSenderJid,
  getSudoList,
  isDeployer,
  isSudo,
  cleanNumber
} from "../lib/ownerSystem.js"


export default async function addsudo(sock, sender, args, msg, ctx = {}) {
  try {

    // ✅ FIX  : utiliser ctx.senderJid (déjà résolu par index.js)
    // Fallback sur getSenderJid si ctx absent
    const senderId = ctx.senderJid || getSenderJid(msg, sock)

    // ── OWNER CHECK ─────────────────────────────────────────
    // ✅ FIX : utiliser ctx.isMainOwner (déjà calculé)
    const senderIsOwner = ctx.isMainOwner || isDeployer(senderId)

    if (!senderIsOwner) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
        `☠ 🔒 sort réservée au *MAÎTRE*\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── TARGET ───────────────────────────────────────────────
    const { targetId, targetNumber } = resolveTarget(msg, args)

    if (!targetId) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *INVOCATION* 〕━━━☩\n\n` +
        `⛧ *.addsudo @user*\n` +
        `⛧ *.addsudo 226XXXXXXXX*\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── SECURITY CHECK ───────────────────────────────────────
    if (isDeployer(targetId)) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚠️ *PARCHEMIN* 〕━━━☩\n\n` +
        `☠ Cet utilisateur est déjà *MAÎTRE*.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    if (isSudo(targetId)) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚠️ *PARCHEMIN* 〕━━━☩\n\n` +
        `☠ Cet utilisateur est déjà *SUDO*.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── ADD SUDO ─────────────────────────────────────────────
    // ✅ FIX v3 : vérifier le résultat de addSudo
    const result = addSudo(targetId)

    if (!result.success) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
        `⛧ ${result.error || "Impossible d'ajouter ce sudo."}\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const sudoList = getSudoList()
    const num      = targetNumber || cleanNumber(targetId)

    // ── CONFIRMATION ─────────────────────────────────────────
    await sock.sendMessage(sender, {
      text:
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `      ⭐ *DISCIPLE LIÉ* ⭐\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
        `☩ 👤 Disciple : @${num}\n` +
        `⛧ 📊 Total SUDO : ${sudoList.count.total}\n` +
        `☠ 🤖 Démon : ${config.botName}\n` +
        `✝ ⏰ ${new Date().toLocaleString("fr-FR")}\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      mentions: [targetId]
    })

    // ── NOTIFIER L'UTILISATEUR ───────────────────────────────
    try {
      await sock.sendMessage(targetId, {
        text:
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
          `   ⭐ *PACTE CONCLU* ⭐\n` +
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
          `☠ Ton âme est liée au *DÉMON*\n\n` +
          `⛧ Maître : *${config.botName}*\n\n` +
          `☩ Pouvoirs accordés :\n` +
          `✝ • sorts gardien\n` +
          `✝ • Modération\n` +
          `✝ • Mode privé\n\n` +
          `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      })
    } catch {}

    console.log(`⭐ addsudo → +${num} | par +${cleanNumber(senderId)}`)

  } catch (err) {
    console.error("❌ addsudo:", err)
    await sendMessage(sock, sender, "☠ rituel échoué addsudo — Le rituel a échoué")
  }
}
