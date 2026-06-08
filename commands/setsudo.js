// commands/setsudo.js — VERSION CORRIGÉE
// ╔══════════════════════════════════════╗
// ║   SETSUDO - AJOUTER SUDO             ║
// ╚══════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { resolveTarget } from '../lib/targetResolver.js'
import { config } from '../config.js'
import { addSudo, getSenderJid, isDeployer, isSudo } from '../lib/ownerSystem.js'

export default async function setsudo(sock, sender, args, msg) {
    try {
        // Déterminer le vrai sender (owner en DM fromMe=true)
        const userId = getSenderJid(msg, sock)

        // Seul le déployeur (owner) peut ajouter des sudos
        if (!isDeployer(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Seul le *Seigneur*\n` +
                `☩    peut ajouter des SUDO.\n\n` +
                `✝ 👑 Requis: *MAÎTRE*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // Récupérer la cible via resolveTarget (mention / reply / numéro)
        const { targetId, targetNumber } = resolveTarget(msg, args)

        if (!targetId) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                `☠ 📌 invocation:\n` +
                `⛧ • *.setsudo @user*\n` +
                `☩ • *.setsudo 22601234567*\n` +
                `✝ • Répondre + *.setsudo*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // Vérifier si déjà owner
        if (isDeployer(targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⚠️ *DÉJÀ MAÎTRE* 〕━━━☩\n\n` +
                `☠ Cet utilisateur est déjà\n` +
                `⛧ le *Seigneur* du Démon.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        const result = addSudo(targetId)

        if (result.success) {
            const num = targetNumber || targetId.split('@')[0]
            await sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `☩  ⭐ *SUDO AJOUTÉ*  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `☩━━━〔 🩸 *CONFIRMATION* 〕━━━☩\n` +
                `☠\n` +
                `✝ 👤 Utilisateur: @${num}\n` +
                `☠ 📊 Total SUDO: ${result.total}\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )
            // Notifier l'utilisateur
            try {
                await sock.sendMessage(targetId, {
                    text: `⭐ *FÉLICITATIONS !*\n\nVous êtes maintenant *SUDO* sur le Démon.\n\nVous avez accès aux sorts administrateurs.`
                })
            } catch (e) {}
        } else {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
                `⛧ ${result.error}\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }

    } catch (err) {
        console.error('❌ Erreur setsudo:', err)
        await sendMessage(sock, sender, `☠ rituel échoué: ${err.message}`)
    }
}
