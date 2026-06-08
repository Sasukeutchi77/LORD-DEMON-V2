import { sendMessage } from "../lib/sendMessage.js"
import {
  purgeTracker,
  PURGE_THRESHOLD,
  PURGE_WINDOW_MS,
  isAntipurgeActive,
} from "../lib/antipurgeTracker.js"

export default async function antipurge(sock, sender, args, msg) {
  try {
    if (!sender.endsWith('@g.us')) {
      await sendMessage(sock, sender,
        `☩━━━〔 ☠ *RITUEL IMPOSSIBLE* 〕━━━☩\n\n` +
        `⛧ Ce sort ne fonctionne que dans les *cercles* (cercles).\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
      return
    }

    const action = args[0]?.toLowerCase() || 'status'
    const seuilTxt = `plus de ${PURGE_THRESHOLD - 1} purifications en moins de ${PURGE_WINDOW_MS / 1000} secondes`

    if (action === 'on') {
      purgeTracker.set(`config:${sender}`, { active: true })
      await sendMessage(
        sock,
        sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `    🛡️ *PACTE ANTI-PURGE* 🛡️\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
        `☩━━━〔 🩸 *RITUEL ÉVEILLÉ* 〕━━━☩\n` +
        `☠\n` +
        `⛧ 🛡️ Protection : *ACTIVE*\n` +
        `☠\n` +
        `✝ Si le Démon détecte ${seuilTxt},\n` +
        `☩ il *révoque tous les gardiens* et\n` +
        `⛧ *scelle le cercle* (mode annonce).\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )

    } else if (action === 'off') {
      purgeTracker.set(`config:${sender}`, { active: false })
      await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `    🛡️ *PACTE ANTI-PURGE* 🛡️\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
        `☩━━━〔 💀 *RITUEL BRISÉ* 〕━━━☩\n` +
        `☠\n` +
        `✝ 🔓 Le pacte anti-purge est dissous.\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )

    } else {
      const status = isAntipurgeActive(sender) ? "🩸 *ÉVEILLÉ*" : "💀 *ENDORMI*"
      await sendMessage(
        sock,
        sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `    🛡️ *PACTE ANTI-PURGE* 🛡️\n` +
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
        `☩━━━〔 👁️ *ÉTAT DU RITUEL* 〕━━━☩\n` +
        `☠\n` +
        `⛧ 📊 Statut : ${status}\n` +
        `☩ ⚙️ Seuil : ${seuilTxt}\n` +
        `✝ ⚡ Châtiment : révocation de tous les gardiens + scellement du cercle.\n` +
        `☠\n` +
        `⛧ *Invocations :*\n` +
        `☩ • *.antipurge on*   — Éveiller\n` +
        `✝ • *.antipurge off*  — Briser\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

  } catch (e) {
    console.error("☠ Erreur antipurge:", e)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ ${e.message || 'rituel échoué inconnue'}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
