// commands/sudo.js — VERSION CORRIGÉE
// ╔══════════════════════════════════════╗
// ║   SUDO - Gestion des droits SUDO     ║
// ║   ✅ FIX: getSudoList() retourne     ║
// ║      maintenant un objet complet     ║
// ╚══════════════════════════════════════╝

import { sendMessage } from "../lib/sendMessage.js"
import { resolveTarget } from "../lib/targetResolver.js"
import { config } from "../config.js"
import { addSudo, checkUserAccess, cleanNumber, getSenderJid, getSudoList, getUserStatus, isDeployer, isSudo, removeSudo } from '../lib/ownerSystem.js'

// ── Formatter un numéro pour affichage ──────────────────────────
function formatNumber(jid) {
    if (!jid) return 'N/A'
    const num = String(jid).split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    return num ? '+' + num : jid
}

// ── Animation de chargement ──────────────────────────────────────
async function showLoading(sock, sender, text = "Chargement...") {
    try {
        const msg = await sock.sendMessage(sender, { text: `⏳ ${text}` })
        return msg?.key || null
    } catch {
        return null
    }
}

export default async function sudo(sock, sender, args, msg) {
    let loadingKey = null

    try {
        // ── Résolution robuste du sender ─────────────────────────────────────
        const userId = getSenderJid(msg, sock)

        // ── Vérification d'accès ─────────────────────────────────────────────
        const access = checkUserAccess(userId)

        if (!access.authorized) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ Cette sort est réservée\n` +
                `☩ aux administrateurs du Démon.\n\n` +
                `✝ 👤 Votre statut: *${getUserStatus(userId)}*\n` +
                `☠ 🔐 Requis: *SUDO* ou *MAÎTRE*\n\n` +
                `⛧ 📌 Votre numéro: ${access.cleanNumber}\n` +
                `☠\n` +
                `☩ 💡 Vérifiez OWNER_NUMBER dans .env\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        const isOwner = access.isDeployer
        const action  = args[0]?.toLowerCase()

        // ── MENU PRINCIPAL ────────────────────────────────────────────────────
        if (!action) {
            // ✅ FIX: getSudoList() retourne maintenant un objet {deployer, direct, file, count}
            const sudoData  = getSudoList()
            const totalSudo = sudoData.count.total
            const roleEmoji = isOwner ? '👑' : '⭐'
            const roleText  = isOwner ? 'PROPRIÉTAIRE' : 'SUDO'

            let menuText =
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `✝  ${roleEmoji} *PANEL SUDO*  \n` +
                `☠  🔐 ${roleText}\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +

                `☩━━━〔 📊 *STATISTIQUES* 〕━━━☩\n` +
                `☠\n` +
                `⛧ 👤 Votre rôle: *${roleText}*\n` +
                `☩ 👻 Total SUDO: *${totalSudo}*\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`

            if (isOwner) {
                menuText +=
                    `☩━━━〔 🎮 *CONTRÔLES MAÎTRE* 〕━━━☩\n` +
                    `☠\n` +
                    `✝ • *.sudo add @user*\n` +
                    `☠   ➜ Ajouter un SUDO\n` +
                    `☠\n` +
                    `⛧ • *.sudo del @user*\n` +
                    `☩   ➜ Retirer un SUDO\n` +
                    `☠\n` +
                    `✝ • *.sudo list*\n` +
                    `☠   ➜ Voir tous les SUDO\n` +
                    `☠\n` +
                    `⛧ • *.sudo info*\n` +
                    `☩   ➜ Voir votre statut\n` +
                    `☠\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            } else {
                menuText +=
                    `☩━━━〔 🎮 *CONTRÔLES SUDO* 〕━━━☩\n` +
                    `☠\n` +
                    `✝ • *.sudo list* → Liste SUDO\n` +
                    `☠ • *.sudo info* → Votre statut\n` +
                    `☠\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            }

            await sendMessage(sock, sender, menuText)
            return
        }

        // ── LISTE DES SUDO ────────────────────────────────────────────────────
        if (['list', 'voir', 'ls', 'liste'].includes(action)) {
            loadingKey = await showLoading(sock, sender, "Chargement liste...")
            // ✅ FIX: getSudoList() retourne l'objet attendu
            const sudoData = getSudoList()
            if (loadingKey) await sock.sendMessage(sender, { delete: loadingKey }).catch(() => {})

            let listText =
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `⛧  📋 *LISTE DES SUDO*  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `☩━━━〔 👑 *Seigneur* 〕━━━☩\n` +
                `☠\n` +
                `☩ • ${sudoData.deployer ? formatNumber(sudoData.deployer) : 'N/A'}\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`

            if (sudoData.file.length > 0) {
                listText += `☩━━━〔 📁 *SUDO LISTE (${sudoData.file.length})* 〕━━━☩\n☠\n`
                sudoData.file.forEach((jid, i) => {
                    listText += `✝ ${i + 1}. ${formatNumber(jid)}\n`
                })
                listText += `☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`
            } else {
                listText += `☩━━━〔 📁 *SUDO LISTE* 〕━━━☩\n☠\n☠ Aucun sudo ajouté\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`
            }

            listText += `📊 *Total:* ${sudoData.count.total} SUDO`
            await sendMessage(sock, sender, listText)
            return
        }

        // ── INFO UTILISATEUR ──────────────────────────────────────────────────
        if (['info', 'statut', 'status', 'me'].includes(action)) {
            let targetId = userId

            if (args[1] && isOwner) {
                const raw = args[1].replace(/[^0-9]/g, '')
                if (raw.length >= 7) targetId = raw + '@s.whatsapp.net'
            }

            const targetAccess = checkUserAccess(targetId)

            const infoText =
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `⛧  👁️ *STATUT UTILISATEUR*  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `☩━━━〔 👤 *INFOS* 〕━━━☩\n` +
                `☠\n` +
                `☩ 📱 Numéro: ${formatNumber(targetId)}\n` +
                `✝ Rôle: *${getUserStatus(targetId)}*\n` +
                `☠\n` +
                `☠ ${targetAccess.isDeployer ? '🩸' : '☠'} Owner\n` +
                `⛧ ${targetAccess.isSudo     ? '🩸' : '☠'} Sudo\n` +
                `☩ ${targetAccess.isPremium  ? '🩸' : '☠'} Premium\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

            await sendMessage(sock, sender, infoText)
            return
        }

        // ── MODIFICATIONS (OWNER UNIQUEMENT) ──────────────────────────────────
        if (!isOwner) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `✝ Seul le *Seigneur* peut\n` +
                `☠ effectuer cette action.\n\n` +
                `⛧ Vous êtes: *SUDO* ⭐\n` +
                `☩ Requis: *MAÎTRE* 👑\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        // ── AJOUTER SUDO ──────────────────────────────────────────────────────
        if (['add', 'ajouter', '+', 'ajout'].includes(action)) {
            const { targetId, targetNumber: tNum } = resolveTarget(msg, args.slice(1))

            if (!targetId) {
                await sendMessage(sock, sender,
                    `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                    `✝ *.sudo add @user*\n` +
                    `☠ *.sudo add 22501...*\n` +
                    `⛧ Répondre + *.sudo add*\n\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
                )
                return
            }

            if (isDeployer(targetId)) {
                await sendMessage(sock, sender,
                    `☩━━━〔 ⚠️ *DÉJÀ MAÎTRE* 〕━━━☩\n\n` +
                    `☩ Cet utilisateur est déjà\n` +
                    `✝ le *Seigneur* du Démon.\n\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
                )
                return
            }

            loadingKey = await showLoading(sock, sender, "Ajout en cours...")
            const result = addSudo(targetId)
            if (loadingKey) await sock.sendMessage(sender, { delete: loadingKey }).catch(() => {})

            if (result.success) {
                await sock.sendMessage(sender, {
                    text:
                        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                        `☠  ⭐ *SUDO AJOUTÉ*  \n` +
                        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                        `☩━━━〔 🩸 *CONFIRMATION* 〕━━━☩\n` +
                        `☠\n` +
                        `⛧ 👤 @${tNum || targetId.split('@')[0]}\n` +
                        `☩ 📊 Total SUDO: ${result.total}\n` +
                        `☠\n` +
                        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                    mentions: [targetId]
                })
                try {
                    await sock.sendMessage(targetId, {
                        text: `⭐ *FÉLICITATIONS !*\n\nVous êtes maintenant *SUDO* sur *${config.botName || 'Démon'}*.\nVous avez accès aux sorts administrateurs.`
                    })
                } catch {}
            } else {
                await sendMessage(sock, sender,
                    `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n✝ ${result.error}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
                )
            }
            return
        }

        // ── RETIRER SUDO ──────────────────────────────────────────────────────
        if (['del', 'delete', 'remove', '-', 'supprimer'].includes(action)) {
            const { targetId } = resolveTarget(msg, args.slice(1))

            if (!targetId) {
                await sendMessage(sock, sender,
                    `☩━━━〔 ☠ *INVOCATION INCORRECT* 〕━━━☩\n\n` +
                    `☠ *.sudo del @user*\n` +
                    `⛧ *.sudo del 22501...*\n\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
                )
                return
            }

            if (isDeployer(targetId)) {
                await sendMessage(sock, sender,
                    `☩━━━〔 ⛔ *ACTION INTERDITE* 〕━━━☩\n\n` +
                    `☩ Vous ne pouvez pas retirer\n` +
                    `✝ le *Seigneur* du Démon.\n\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
                )
                return
            }

            loadingKey = await showLoading(sock, sender, "Suppression...")
            const result = removeSudo(targetId)
            if (loadingKey) await sock.sendMessage(sender, { delete: loadingKey }).catch(() => {})

            if (result.success) {
                await sendMessage(sock, sender,
                    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                    `☠  ☠ *SUDO RETIRÉ*  \n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                    `🩸 SUDO retiré avec succès.\n` +
                    `📊 Restants: ${result.total} SUDO`
                )
            } else {
                await sendMessage(sock, sender,
                    `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n⛧ ${result.error}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
                )
            }
            return
        }

        // ── COMMANDE INCONNUE ─────────────────────────────────────────────────
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *SORT INCONNUE* 〕━━━☩\n\n` +
            `☩ Actions: list | info | add | del\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )

    } catch (error) {
        console.error("❌ Erreur sudo.js:", error)
        if (loadingKey) await sock.sendMessage(sender, { delete: loadingKey }).catch(() => {})
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ CRITIQUE* 〕━━━☩\n\n` +
            `✝ ${error.message}\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
