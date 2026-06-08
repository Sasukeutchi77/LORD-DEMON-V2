// commands/mathrapide.js — MATHÉMATIQUES RAPIDES ⚡
import { sendMessage } from '../lib/sendMessage.js'

const sessions = new Map()
const scores = new Map()

function genQuestion(niveau) {
    const ops = ['+', '-', '×', '÷']
    let a, b, op, r
    switch (niveau) {
        case 'facile':
            a = Math.floor(Math.random() * 20) + 1
            b = Math.floor(Math.random() * 20) + 1
            op = ops[Math.floor(Math.random() * 2)]
            r = op === '+' ? a + b : a - b
            break
        case 'moyen':
            a = Math.floor(Math.random() * 50) + 10
            b = Math.floor(Math.random() * 20) + 2
            op = ops[Math.floor(Math.random() * 3)]
            r = op === '+' ? a + b : op === '-' ? a - b : a * b
            if (op === '×') { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; r = a * b }
            break
        case 'difficile':
        default:
            a = Math.floor(Math.random() * 100) + 20
            b = Math.floor(Math.random() * 30) + 5
            op = ops[Math.floor(Math.random() * 4)]
            if (op === '÷') { b = [2,3,4,5,6,7,8,9,10][Math.floor(Math.random()*9)]; a = b * (Math.floor(Math.random()*20)+1); r = a / b }
            else r = op === '+' ? a+b : op === '-' ? a-b : a*b
            if (op === '×') { a = Math.floor(Math.random()*25)+5; b = Math.floor(Math.random()*15)+3; r = a*b }
    }
    return { q: `${a} ${op} ${b} = ?`, r: r.toString(), a, b, op }
}

export default async function mathrapide(sock, sender, args, msg) {
    const sub = args[0]?.toLowerCase()
    const TIMER = 20

    if (sub === 'score') {
        const sc = scores.get(sender) || { wins: 0, total: 0, bestStreak: 0 }
        return sendMessage(sock, sender,
            `⛧━━━〔 📊 *TES SCORES MATHS* 〕━━━⛧\n` +
            `✅ Réussies: *${sc.wins}/${sc.total}*\n` +
            `🏆 Meilleur streak: *${sc.bestStreak}*\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    if (sub === 'stop') { sessions.delete(sender); return sendMessage(sock, sender, '🛑 Arrêté.') }

    // Vérifier réponse
    if (sessions.has(sender) && sub && !isNaN(sub)) {
        const s = sessions.get(sender)
        clearTimeout(s.timeout)
        sessions.delete(sender)
        const elapsed = Math.round((Date.now() - s.startTime) / 1000)
        const sc = scores.get(sender) || { wins: 0, total: 0, streak: 0, bestStreak: 0 }
        sc.total++
        if (sub === s.r) {
            sc.wins++; sc.streak = (sc.streak||0) + 1
            sc.bestStreak = Math.max(sc.bestStreak, sc.streak)
            scores.set(sender, sc)
            return sendMessage(sock, sender,
                `✅ *CORRECT !* En ${elapsed}s\n⚡ Streak: ${sc.streak}\n💡 Rejoue: \`.mathrapide\``)
        } else {
            sc.streak = 0; scores.set(sender, sc)
            return sendMessage(sock, sender,
                `❌ *FAUX !* La réponse était *${s.r}*\n💡 Rejoue: \`.mathrapide\``)
        }
    }

    // Niveau
    const niveau = ['facile','moyen','difficile'].includes(sub) ? sub : 'moyen'
    const q = genQuestion(niveau)
    const niveauEmoji = { facile: '🟢', moyen: '🟡', difficile: '🔴' }

    const timeout = setTimeout(async () => {
        if (sessions.has(sender)) {
            sessions.delete(sender)
            const sc = scores.get(sender) || { wins: 0, total: 0, streak: 0, bestStreak: 0 }
            sc.total++; sc.streak = 0; scores.set(sender, sc)
            await sendMessage(sock, sender, `⏰ *TEMPS ÉCOULÉ !* La réponse était: *${q.r}*`).catch(()=>{})
        }
    }, TIMER * 1000)

    sessions.set(sender, { r: q.r, startTime: Date.now(), timeout })

    await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   ⚡ *MATHS RAPIDES* ${niveauEmoji[niveau]}            ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `🧮 *Calcule:*\n\`${q.q}\`\n\n` +
        `⏱️ Tu as *${TIMER} secondes* !\n` +
        `💬 Tape juste le nombre\n` +
        `💡 Niveaux: \`.mathrapide facile/moyen/difficile\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
}
