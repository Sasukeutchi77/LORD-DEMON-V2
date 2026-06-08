// commands/unmute.js — VERSION AMÉLIORÉE
import { sendMessage } from '../lib/sendMessage.js'
import { isMuted, unmuteUser } from './mute.js'
import { formatTime } from '../lib/animLoader.js'
import { getSenderJid, isSuperAdmin } from '../lib/ownerSystem.js'

export default async function unmute(sock, sender, args, msg) {
    try {
        const userId = getSenderJid(msg, sock)
        const isGroup = sender.endsWith('@g.us')

        if (!isGroup) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
                `⛧ sort *cercle* uniquement.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        if (!isSuperAdmin(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `☩ 🔒 Requis: *SuperAdmin* du Démon\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        let targetId = null
        const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
        if (mentions?.length > 0) {
            targetId = mentions[0]
        } else if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            targetId = msg.message.extendedTextMessage.contextInfo.participant
        } else if (args[0]) {
            const num = args[0].replace(/[^0-9]/g, '')
            if (num.length >= 8) targetId = num + '@s.whatsapp.net'
        }

        if (!targetId) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *INVOCATION* 〕━━━☩\n\n` +
                `✝ • *.unmute @âme*\n` +
                `☠ • Répondre + *.unmute*\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        if (!isMuted(sender, targetId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 👁️ *PAS MUTÉ* 〕━━━☩\n\n` +
                `⛧ @${targetId.split('@')[0]} n'est pas\n` +
                `☩ muté actuellement.\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
                { mentions: [targetId] }
            )
            return
        }

        unmuteUser(sender, targetId)

        await sendMessage(sock, sender,
            `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
            `✝  🔊 *UNMUTE* 🔊  \n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `☩━━━〔 🩸 *RÉACTIVÉ* 〕━━━☩\n` +
            `☠\n` +
            `☠ 👤 âme: @${targetId.split('@')[0]}\n` +
            `⛧ 🔊 Statut: *Peut parler*\n` +
            `☩ 🕐 Heure: ${formatTime()}\n` +
            `✝ 👮 Par: @${userId.split('@')[0]}\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
            { mentions: [targetId, userId] }
        )

    } catch (err) {
        console.error('❌ Erreur unmute:', err)
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
            `☠ 📝 _${err.message || 'rituel échoué inconnue'}_\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
