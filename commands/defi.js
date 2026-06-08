// commands/defi.js — SYSTÈME DE DÉFIS ⚔️
// ✅ Défis entre membres (math, culture, vitesse)
// ✅ Timer, scores, classement

import { sendMessage } from '../lib/sendMessage.js'

const DEFIS_MATH = [
    { q: '(15 × 8) + 47 = ?', r: '167' }, { q: '√144 = ?', r: '12' },
    { q: '7³ = ?', r: '343' }, { q: '(100 ÷ 4) × 3 = ?', r: '75' },
    { q: '2^10 = ?', r: '1024' }, { q: '13 × 17 = ?', r: '221' },
    { q: '(250 - 73) × 2 = ?', r: '354' }, { q: '√225 = ?', r: '15' },
    { q: '11² + 11 = ?', r: '132' }, { q: '999 ÷ 27 = ?', r: '37' },
]
const DEFIS_CULTURE = [
    { q: 'En quelle année a-t-on marché sur la Lune ?', r: '1969' },
    { q: 'Combien y a-t-il de dents chez un adulte ?', r: '32' },
    { q: 'Quelle est la capitale du Brésil ?', r: 'brasilia' },
    { q: "Quelle est la planète la plus grande du système solaire ?", r: 'jupiter' },
    { q: 'Qui a fondé Microsoft ?', r: 'bill gates' },
    { q: 'En quelle année a été fondé Facebook ?', r: '2004' },
    { q: 'Quel pays a inventé le football moderne ?', r: 'angleterre' },
    { q: 'Quelle est la langue la plus parlée au monde ?', r: 'mandarin' },
]
const DEFIS_VITESSE = [
    { q: '🔴 rouge en anglais ?', r: 'red' },
    { q: '🌙 nuit en anglais ?', r: 'night' },
    { q: '⚡ éclair en anglais ?', r: 'lightning' },
    { q: '🔥 feu en espagnol ?', r: 'fuego' },
    { q: '🌊 vague en anglais ?', r: 'wave' },
    { q: '❄️ neige en anglais ?', r: 'snow' },
    { q: '🌹 rose en anglais ?', r: 'rose' },
]

const ALL_DEFIS = [...DEFIS_MATH, ...DEFIS_CULTURE, ...DEFIS_VITESSE]
const sessions = new Map()
const scores = new Map()

export default async function defi(sock, sender, args, msg) {
    const sub = args[0]?.toLowerCase()

    if (sub === 'score' || sub === 'scores') {
        const sc = scores.get(sender) || { wins: 0, losses: 0, total: 0 }
        const ratio = sc.total > 0 ? Math.round((sc.wins / sc.total) * 100) : 0
        return sendMessage(sock, sender,
            `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
            `⛧   ⚔️ *TES SCORES DÉFIS*           ☩\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `✅ Victoires: *${sc.wins}*\n` +
            `❌ Défaites: *${sc.losses}*\n` +
            `🎯 Total: *${sc.total}*\n` +
            `📊 Ratio: *${ratio}%*\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    if (sub === 'stop') {
        if (sessions.has(sender)) {
            const s = sessions.get(sender)
            sessions.delete(sender)
            return sendMessage(sock, sender, `🛑 Défi abandonné. La réponse était: *${s.reponse}*`)
        }
        return sendMessage(sock, sender, `☠ Aucun défi en cours.`)
    }

    // Vérifier réponse en cours
    if (sessions.has(sender) && sub) {
        const s = sessions.get(sender)
        const now = Date.now()
        const elapsed = Math.round((now - s.startTime) / 1000)
        const reponse = args.join(' ').toLowerCase().trim()
        const sc = scores.get(sender) || { wins: 0, losses: 0, total: 0 }

        if (reponse === s.reponse.toLowerCase() || reponse === s.reponse) {
            clearTimeout(s.timeout)
            sessions.delete(sender)
            sc.wins++; sc.total++
            scores.set(sender, sc)
            return sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `🎉   ✅ *DÉFI RÉUSSI !*              🏆\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `⚡ Temps: *${elapsed}s*\n` +
                `🏆 Victoires: *${sc.wins}*\n\n` +
                `💡 Prochain défi: \`.defi\``
            )
        } else {
            sc.losses++; sc.total++
            scores.set(sender, sc)
            clearTimeout(s.timeout)
            sessions.delete(sender)
            return sendMessage(sock, sender,
                `☩━━━〔 ❌ *MAUVAISE RÉPONSE* 〕━━━☩\n` +
                `⛧ La bonne réponse était: *${s.reponse}*\n` +
                `❌ Défaites: *${sc.losses}*\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }
    }

    // Nouveau défi
    const defi_item = ALL_DEFIS[Math.floor(Math.random() * ALL_DEFIS.length)]
    const TIMER = 30

    const timeout = setTimeout(async () => {
        if (sessions.has(sender)) {
            const s = sessions.get(sender)
            sessions.delete(sender)
            const sc = scores.get(sender) || { wins: 0, losses: 0, total: 0 }
            sc.losses++; sc.total++
            scores.set(sender, sc)
            await sendMessage(sock, sender,
                `☩━━━〔 ⏰ *TEMPS ÉCOULÉ !* 〕━━━☩\n` +
                `⛧ La réponse était: *${s.reponse}*\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            ).catch(() => {})
        }
    }, TIMER * 1000)

    sessions.set(sender, { reponse: defi_item.r, startTime: Date.now(), timeout })

    await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   ⚔️ *DÉFI LORD DEMON*           ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `❓ *Question:*\n${defi_item.q}\n\n` +
        `⏱️ Tu as *${TIMER} secondes* pour répondre !\n` +
        `💬 Tape ta réponse directement\n` +
        `🛑 \`.defi stop\` pour abandonner\n` +
        `📊 \`.defi score\` pour voir tes scores\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
}
