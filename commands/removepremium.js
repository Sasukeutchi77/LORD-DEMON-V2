// commands/removepremium.js — VERSION CORRIGÉE 
// ╔══════════════════════════════════════╗
// ║   REMOVEPREMIUM - RETIRER PREMIUM    ║
// ╚══════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { showActionLoader, deleteLoader, formatTime } from '../lib/animLoader.js'
import { config } from '../config.js'
import { getSenderJid, isDeployer, isPremium, removePremium } from '../lib/ownerSystem.js'

export default async function removepremium(sock, sender, args, msg) {
    let loaderKey = null

    try {
        // ── Déterminer le vrai sender (owner en DM fromMe) ────────
        const userId = getSenderJid(msg, sock)

        if (!isDeployer(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Réservé au *Seigneur*\n` +
                `☩    du Démon uniquement.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Récupérer la cible ────────────────────────────────────
        const { targetId, targetNumber } = resolveTarget(msg, args)

        if (!targetId) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                `✝ 📌 Spécifiez un utilisateur:\n\n` +
                `☠ • *.removepremium @user*\n` +
                `⛧ • *.removepremium 22601234567*\n` +
                `☩ • Répondre + *.removepremium*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Vérifier si est premium ──────────────────────────────
        if (!isPremium(targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 👁️ *PAS PREMIUM* 〕━━━☩\n\n` +
                `✝ @${targetNumber} n'est pas\n` +
                `☠ *premium* actuellement.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )
            return
        }

        loaderKey = await showActionLoader(sock, sender, 'SUPPRESSION PREMIUM', '💎')

        const removeResult = removePremium(targetId)
        // removePremium retourne true/false
        const result = (removeResult === true || removeResult?.success === true)
            ? { success: true }
            : { success: false, error: removeResult?.error || 'Utilisateur non trouvé dans la liste premium' }

        await deleteLoader(sock, sender, loaderKey)

        if (result.success) {
            await sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `⛧  ☠ *PREMIUM RETIRÉ* ☠  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +

                `☩━━━〔 📋 *CONFIRMATION* 〕━━━☩\n` +
                `☠\n` +
                `☩ 👤 Utilisateur: @${targetNumber}\n` +
                `✝ 💎 Statut: *PREMIUM → ÂME*\n` +
                `☠ 🕐 Heure: ${formatTime()}\n` +
                `⛧ 👑 Par: Owner\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )

            try {
                await sock.sendMessage(targetId, {
                    text:
                        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                        `☩  ⚠️ *NOTICE* ⚠️  \n` +
                        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                        `Votre statut *💎 PREMIUM* sur\n` +
                        `*${config.botName}* a été révoqué.\n\n` +
                        `Vous redevenez *ÂME* standard.\n\n` +
                        `Pour plus d'informations,\n` +
                        `contactez l'Owner.`
                })
            } catch (e) {
                console.log("⚠️ Impossible de notifier l'utilisateur")
            }

            console.log(`❌ removepremium | ${targetNumber} | par: ${userId.split('@')[0]}`)

        } else {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
                `✝ ${result.error || 'rituel échoué inconnue'}\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }

    } catch (err) {
        if (loaderKey) await deleteLoader(sock, sender, loaderKey).catch(() => {})
        console.error('❌ Erreur removepremium:', err)
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ CRITIQUE* 〕━━━☩\n\n` +
            `☠ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
