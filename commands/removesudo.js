// commands/removesudo.js — VERSION CORRIGÉE
// ╔══════════════════════════════════════╗
// ║   REMOVESUDO - RETIRER SUDO          ║
// ╚══════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { showActionLoader, deleteLoader, formatTime } from '../lib/animLoader.js'
import { config } from '../config.js'
import { getSenderJid, isDeployer, isSudo, removeSudo } from '../lib/ownerSystem.js'

export default async function removesudo(sock, sender, args, msg) {
    let loaderKey = null

    try {
        // ── Déterminer le vrai sender (owner en DM fromMe) ────────
        const userId = getSenderJid(msg, sock)

        // ── Seul le DEPLOYER peut retirer un sudo ─────────────────
        if (!isDeployer(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Seul le *Seigneur*\n` +
                `☩ peut retirer des SUDO.\n\n` +
                `✝ 👑 Requis: *MAÎTRE*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Récupérer la cible ────────────────────────────────────
        const { targetId, targetNumber } = resolveTarget(msg, args)

        if (!targetId) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                `☠ 📌 Spécifiez un utilisateur:\n\n` +
                `⛧ • *.removesudo @user*\n` +
                `☩ • *.removesudo 22601234567*\n` +
                `✝ • Répondre + *.removesudo*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Impossible de retirer l'Owner ────────────────────────
        if (isDeployer(targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⚠️ *IMPOSSIBLE* 〕━━━☩\n\n` +
                `☠ Vous ne pouvez pas retirer\n` +
                `⛧ le *Seigneur* du Démon.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Vérifier si est sudo ──────────────────────────────────
        if (!isSudo(targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 👁️ *PAS SUDO* 〕━━━☩\n\n` +
                `☩ @${targetNumber} n'est pas\n` +
                `✝ dans la liste *SUDO*.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )
            return
        }

        loaderKey = await showActionLoader(sock, sender, 'SUPPRESSION SUDO', '⭐')

        const result = removeSudo(targetId)

        await deleteLoader(sock, sender, loaderKey)

        if (result.success) {
            await sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `☠  ☠ *SUDO RETIRÉ* ☠  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +

                `☩━━━〔 📋 *CONFIRMATION* 〕━━━☩\n` +
                `☠\n` +
                `⛧ 👤 Utilisateur: @${targetNumber}\n` +
                `☩ ⭐ Statut: *SUDO → ÂME*\n` +
                `✝ 🕐 Heure: ${formatTime()}\n` +
                `☠ 👑 Par: Owner\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )

            try {
                await sock.sendMessage(targetId, {
                    text:
                        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                        `⛧  ⚠️ *NOTICE* ⚠️  \n` +
                        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                        `Votre statut *⭐ SUDO* sur\n` +
                        `*${config.botName}* a été révoqué.\n\n` +
                        `Vos permissions ont été supprimées.\n\n` +
                        `Pour plus d'informations,\n` +
                        `contactez l'Owner.`
                })
            } catch (e) {
                console.log("⚠️ Impossible de notifier l'utilisateur")
            }

            console.log(`❌ removesudo | ${targetNumber} | par: ${userId.split('@')[0]}`)

        } else {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
                `☩ ${result.error || 'Impossible de retirer le SUDO.'}\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }

    } catch (err) {
        if (loaderKey) await deleteLoader(sock, sender, loaderKey).catch(() => {})
        console.error('❌ Erreur removesudo:', err)
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ CRITIQUE* 〕━━━☩\n\n` +
            `✝ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
