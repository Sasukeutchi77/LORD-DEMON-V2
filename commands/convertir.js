// commands/convertir.js — CONVERTISSEUR UNIVERSEL 🔢
// ✅ Monnaies, poids, longueur, température, vitesse, données

import { sendMessage } from '../lib/sendMessage.js'

const CONVERSIONS = {
    // Longueur
    km: { base: 'metre', factor: 1000 }, m: { base: 'metre', factor: 1 }, cm: { base: 'metre', factor: 0.01 },
    mm: { base: 'metre', factor: 0.001 }, mile: { base: 'metre', factor: 1609.34 }, miles: { base: 'metre', factor: 1609.34 },
    yard: { base: 'metre', factor: 0.9144 }, ft: { base: 'metre', factor: 0.3048 }, pied: { base: 'metre', factor: 0.3048 },
    inch: { base: 'metre', factor: 0.0254 }, pouce: { base: 'metre', factor: 0.0254 },
    // Poids
    kg: { base: 'gram', factor: 1000 }, g: { base: 'gram', factor: 1 }, mg: { base: 'gram', factor: 0.001 },
    tonne: { base: 'gram', factor: 1e6 }, lb: { base: 'gram', factor: 453.592 }, livre: { base: 'gram', factor: 453.592 },
    oz: { base: 'gram', factor: 28.3495 },
    // Vitesse
    'km/h': { base: 'mps', factor: 1/3.6 }, kmh: { base: 'mps', factor: 1/3.6 },
    mph: { base: 'mps', factor: 0.44704 }, 'm/s': { base: 'mps', factor: 1 }, mps: { base: 'mps', factor: 1 },
    noeud: { base: 'mps', factor: 0.514444 }, knot: { base: 'mps', factor: 0.514444 },
    // Données
    b: { base: 'bit', factor: 1 }, kb: { base: 'bit', factor: 1e3 }, mb: { base: 'bit', factor: 1e6 },
    gb: { base: 'bit', factor: 1e9 }, tb: { base: 'bit', factor: 1e12 },
    kib: { base: 'bit', factor: 1024 }, mib: { base: 'bit', factor: 1048576 }, gib: { base: 'bit', factor: 1073741824 },
    // Temps
    seconde: { base: 'sec', factor: 1 }, sec: { base: 'sec', factor: 1 }, s: { base: 'sec', factor: 1 },
    minute: { base: 'sec', factor: 60 }, min: { base: 'sec', factor: 60 },
    heure: { base: 'sec', factor: 3600 }, h: { base: 'sec', factor: 3600 },
    jour: { base: 'sec', factor: 86400 }, semaine: { base: 'sec', factor: 604800 },
    mois: { base: 'sec', factor: 2592000 }, an: { base: 'sec', factor: 31536000 }, année: { base: 'sec', factor: 31536000 },
}

const TEMP_FROM = { c: v => v, f: v => (v - 32) * 5/9, k: v => v - 273.15 }
const TEMP_TO   = { c: v => v, f: v => v * 9/5 + 32, k: v => v + 273.15 }
const TEMP_NAMES = { c: '°C', f: '°F', k: 'K' }

function convert(val, from, to) {
    from = from.toLowerCase(); to = to.toLowerCase()
    // Température
    if (['c','f','k'].includes(from) && ['c','f','k'].includes(to)) {
        if (from === to) return val
        const celsius = TEMP_FROM[from](val)
        return TEMP_TO[to](celsius)
    }
    const fFrom = CONVERSIONS[from], fTo = CONVERSIONS[to]
    if (!fFrom || !fTo) return null
    if (fFrom.base !== fTo.base) return null
    const inBase = val * fFrom.factor
    return inBase / fTo.factor
}

function formatNum(n) {
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(3) + ' milliards'
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(3) + ' millions'
    if (Math.abs(n) < 0.001) return n.toExponential(4)
    return parseFloat(n.toFixed(6)).toString()
}

export default async function convertir(sock, sender, args, msg) {
    // Usage: .convertir 10 km en miles
    //        .convertir 100 c en f
    if (args.length < 3) {
        return sendMessage(sock, sender,
            `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
            `⛧   🔢 *CONVERTISSEUR UNIVERSEL*    ☩\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `📖 *Usage:* \`.convertir <valeur> <unité> en <unité>\`\n\n` +
            `☩━━━〔 📏 *EXEMPLES* 〕━━━☩\n` +
            `⛧ \`.convertir 10 km en miles\`\n` +
            `☩ \`.convertir 100 kg en lb\`\n` +
            `✝ \`.convertir 37 c en f\`\n` +
            `☠ \`.convertir 1 gb en mb\`\n` +
            `⛧ \`.convertir 2 heures en min\`\n\n` +
            `☩━━━〔 📦 *CATÉGORIES* 〕━━━☩\n` +
            `📏 Longueur: km m cm mm mile ft inch\n` +
            `⚖️ Poids: kg g mg tonne lb oz\n` +
            `🌡️ Température: c f k\n` +
            `⚡ Vitesse: km/h mph m/s noeud\n` +
            `💾 Données: b kb mb gb tb\n` +
            `⏱️ Temps: sec min heure jour semaine mois an\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    const val = parseFloat(args[0])
    if (isNaN(val)) return sendMessage(sock, sender, `☠ Valeur invalide: *${args[0]}*`)

    // Flexible: "10 km en miles" ou "10 km miles"
    const from = args[1]
    const to = args[args.length - 1]

    const result = convert(val, from, to)
    if (result === null) {
        return sendMessage(sock, sender,
            `☩━━━〔 ❌ *CONVERSION IMPOSSIBLE* 〕━━━☩\n` +
            `⛧ Impossible de convertir *${from}* → *${to}*\n` +
            `☠ Unités inconnues ou incompatibles.\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🔢 *CONVERSION*                 ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `📥 *Entrée :* ${val} ${from.toUpperCase()}\n` +
        `📤 *Résultat :* *${formatNum(result)} ${to.toUpperCase()}*\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
}
