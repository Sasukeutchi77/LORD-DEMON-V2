// commands/delsudo.js — VERSION CORRIGÉE
// ╔══════════════════════════════════════╗
// ║   DELSUDO - RETIRER SUDO             ║
// ╚══════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { config } from '../config.js'
import { getSenderJid, isDeployer, isSudo, removeSudo } from '../lib/ownerSystem.js'

export default async function delsudo(sock, sender, args, msg) {
    try {
        // Déterminer le vrai sender (owner en DM fromMe=true)
        const userId = getSenderJid(msg, sock)

        // Seul le déployeur (owner) peut retirer des sudos
        if (!isDeployer(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Seul le *Seigneur*\n` +
                `☩    peut retirer des SUDO.\n\n` +
                `✝ 👑 Requis: *MAÎTRE*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // Récupérer la cible via resolveTarget
        const { targetId, targetNumber } = resolveTarget(msg, args)

        if (!targetId) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                `☠ 📌 invocation:\n` +
                `⛧ • *.delsudo @user*\n` +
                `☩ • *.delsudo 22601234567*\n` +
                `✝ • Répondre + *.delsudo*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // Protéger le déployeur
        if (isDeployer(targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *IMPOSSIBLE* 〕━━━☩\n\n` +
                `☠ Le *Seigneur* ne peut\n` +
                `⛧ pas être retiré.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        const result = removeSudo(targetId)

        if (result.success) {
            const num = targetNumber || targetId.split('@')[0]
            await sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `☩  ☠ *SUDO RETIRÉ*  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `☩━━━〔 🩸 *CONFIRMATION* 〕━━━☩\n` +
                `☠\n` +
                `✝ 👤 Utilisateur: @${num}\n` +
                `☠ 📊 SUDO restants: ${result.total - 1}\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )
        } else {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
                `⛧ ${result.error}\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }

    } catch (err) {
        console.error('❌ Erreur delsudo:', err)
        await sendMessage(sock, sender, `☠ rituel échoué: ${err.message}`)
    }
}
