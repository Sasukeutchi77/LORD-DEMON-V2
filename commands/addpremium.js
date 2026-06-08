// commands/addpremium.js — VERSION CORRIGÉE
// ╔══════════════════════════════════════╗
// ║   ADDPREMIUM - GESTION PREMIUM        ║
// ╚══════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { showPremiumLoader, deleteLoader, formatTime } from '../lib/animLoader.js'
import { config } from '../config.js'
import { addPremium, getSenderJid, isDeployer, isPremium } from '../lib/ownerSystem.js'

export default async function addpremium(sock, sender, args, msg) {
    let loaderKey = null

    try {
        // ── Déterminer le vrai sender (owner en DM fromMe) ────────
        const userId = getSenderJid(msg, sock)

        // ── Seul le DEPLOYER (Owner) peut gérer le premium ───────
        if (!isDeployer(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Réservé au *Seigneur*\n` +
                `☩    du Démon uniquement.\n\n` +
                `✝ 👑 Requis: *MAÎTRE*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Récupérer la cible (mention / reply / numéro) ────────
        // args[0] peut être un nombre de jours si c'est après le numéro
        const { targetId, targetNumber } = resolveTarget(msg, args)

        if (!targetId) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                `☠ 📌 Spécifiez un utilisateur:\n\n` +
                `⛧ • *.addpremium @user*\n` +
                `☩ • *.addpremium 22601234567*\n` +
                `✝ • Répondre + *.addpremium*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── Vérifier si déjà premium ─────────────────────────────
        if (isPremium(targetId) && !isDeployer(targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 👁️ *DÉJÀ PREMIUM* 〕━━━☩\n\n` +
                `☠ @${targetNumber} possède déjà\n` +
                `⛧ le statut *💎 PREMIUM*.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )
            return
        }

        loaderKey = await showPremiumLoader(sock, sender, 'AJOUT PREMIUM')

        const addResult = addPremium(targetId)
        // addPremium retourne true/false
        const result = (addResult === true || addResult?.success === true)
            ? { success: true }
            : { success: false, error: addResult?.error || 'Erreur lors de l\'ajout' }

        await deleteLoader(sock, sender, loaderKey)

        if (result.success) {
            await sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `☩  💎 *NOUVEAU PREMIUM* 💎  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +

                `☩━━━〔 🩸 *CONFIRMATION* 〕━━━☩\n` +
                `☠\n` +
                `✝ 👤 Utilisateur: @${targetNumber}\n` +
                `☠ 🆔 ID: ${targetId}\n` +
                `⛧ 🕐 Ajouté le: ${formatTime()}\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +

                `☩━━━〔 💎 *AVANTAGES PREMIUM* 〕━━━☩\n` +
                `☠\n` +
                `☩ 🩸 sorts cercle avancées\n` +
                `✝ 🩸 Gestion de cercles\n` +
                `☠ 🩸 Accès mode privé\n` +
                `⛧ 🩸 Priorité de traitement\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +

                `👑 *Ajouté par:* Owner`,
                { mentions: [targetId] }
            )

            try {
                await sock.sendMessage(targetId, {
                    text:
                        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                        `☩  💎 *FÉLICITATIONS !* 💎  \n` +
                        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                        `Vous venez d'obtenir le statut\n` +
                        `*💎 PREMIUM* sur *${config.botName}* !\n\n` +

                        `☩━━━〔 🎁 *VOS AVANTAGES* 〕━━━☩\n` +
                        `☠\n` +
                        `✝ 🩸 sorts avancées\n` +
                        `☠ 🩸 Support prioritaire\n` +
                        `☠\n` +
                        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                        `👑 Accordé par l'Owner`
                })
            } catch (e) {
                console.log("⚠️ Impossible de notifier l'utilisateur")
            }

            console.log(`💎 addpremium | ${targetNumber} | par: ${userId.split('@')[0]}`)

        } else {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
                `⛧ ${result.error || 'rituel échoué inconnue'}\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }

    } catch (err) {
        if (loaderKey) await deleteLoader(sock, sender, loaderKey).catch(() => {})
        console.error('❌ Erreur addpremium:', err)
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ CRITIQUE* 〕━━━☩\n\n` +
            `☩ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
