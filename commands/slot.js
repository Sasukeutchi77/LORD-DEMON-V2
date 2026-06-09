// commands/slot.js — MACHINE À SOUS 🎰
// ✅ Symboles pondérés, jackpot rare
// ✅ Cooldown anti-spam
// ✅ Streaks et combos

import { sendMessage } from '../lib/sendMessage.js'

const SYMBOLES = [
    { s: '💀', nom: 'Crâne',    poids: 2,  mult: 50  },
    { s: '⛧',  nom: 'Démon',   poids: 3,  mult: 20  },
    { s: '🩸',  nom: 'Sang',    poids: 5,  mult: 10  },
    { s: '☠️',  nom: 'Tête',    poids: 8,  mult: 5   },
    { s: '🔥',  nom: 'Feu',     poids: 12, mult: 3   },
    { s: '⚡',  nom: 'Éclair',  poids: 15, mult: 2   },
    { s: '🌑',  nom: 'Lune',    poids: 20, mult: 1.5 },
    { s: '✝️',  nom: 'Croix',   poids: 25, mult: 1.2 },
    { s: '🖤',  nom: 'Cœur',    poids: 30, mult: 1   },
]

const cooldowns = new Map()
const streaks = new Map()
const COOLDOWN = 15000 // 15 secondes

function tirerSymbole() {
    const total = SYMBOLES.reduce((s, x) => s + x.poids, 0)
    let r = Math.random() * total
    for (const sym of SYMBOLES) { r -= sym.poids; if (r <= 0) return sym }
    return SYMBOLES[SYMBOLES.length - 1]
}

function analyserResultat(rouleaux) {
    const [a, b, c] = rouleaux
    // Jackpot: 3 crânes
    if (a.s === '💀' && b.s === '💀' && c.s === '💀') return { type: 'JACKPOT', mult: 100, msg: '💀 JACKPOT DÉMONIAQUE ! 💀' }
    // 3 identiques
    if (a.s === b.s && b.s === c.s) return { type: 'TRIO', mult: a.mult * 3, msg: `🎉 TRIO ${a.nom.toUpperCase()} !` }
    // 2 identiques
    if (a.s === b.s || b.s === c.s || a.s === c.s) {
        const sym = a.s === b.s ? a : (b.s === c.s ? b : a)
        return { type: 'PAIRE', mult: sym.mult, msg: `✨ Paire de ${sym.nom}` }
    }
    return { type: 'RIEN', mult: 0, msg: '💸 Rien cette fois...' }
}

function barreProgres(mult) {
    const max = 10
    const filled = Math.min(max, Math.round(mult / 10 * max))
    return '▓'.repeat(filled) + '░'.repeat(max - filled)
}

export default async function slot(sock, sender, args, msg) {
  try {
    const now = Date.now()
    if (cooldowns.has(sender) && now - cooldowns.get(sender) < COOLDOWN) {
        const reste = Math.ceil((COOLDOWN - (now - cooldowns.get(sender))) / 1000)
        return sendMessage(sock, sender,
            `☩━━━〔 ⏳ *COOLDOWN* 〕━━━☩\n` +
            `⛧ Attends encore *${reste}s* avant de rejouer !\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
    cooldowns.set(sender, now)

    // Animation
    const loadMsg = await sock.sendMessage(sender, { text: `🎰 *MACHINE À SOUS — LORD DEMON*\n\n⛧ Tirage en cours...\n\n🎰  ❓ | ❓ | ❓  🎰` })

    await new Promise(r => setTimeout(r, 800))

    const rouleaux = [tirerSymbole(), tirerSymbole(), tirerSymbole()]
    const res = analyserResultat(rouleaux)
    const streak = (streaks.get(sender) || 0)
    if (res.type === 'RIEN') streaks.set(sender, 0)
    else streaks.set(sender, streak + 1)

    const newStreak = streaks.get(sender)
    let streakBonus = ''
    if (newStreak >= 3) streakBonus = `\n🔥 *STREAK x${newStreak}* ! Tu es en feu !`

    const text =
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🎰 *MACHINE À SOUS DÉMONIAQUE*  ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `🎰  ${rouleaux[0].s} | ${rouleaux[1].s} | ${rouleaux[2].s}  🎰\n\n` +
        `  ${res.msg}\n` +
        (res.mult > 0 ? `  📊 Multiplicateur: x${res.mult}\n  ${barreProgres(res.mult)}\n` : '') +
        streakBonus + `\n\n` +
        `💡 Rejoue dans 15s: \`.slot\``

    await sock.sendMessage(sender, { text, edit: loadMsg.key }).catch(() => sendMessage(sock, sender, text))

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}