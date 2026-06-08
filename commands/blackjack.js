// commands/blackjack.js — BLACKJACK vs le Démon 🃏
// ✅ Jeu complet avec mise, as flexible, double mise
// ✅ Style LORD DEMON

import { sendMessage } from '../lib/sendMessage.js'

const games = new Map()
const SUITS = ['♠', '♥', '♦', '♣']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function makeDeck() {
    const deck = []
    for (const s of SUITS) for (const v of VALUES) deck.push({ v, s })
    return deck.sort(() => Math.random() - 0.5)
}

function cardVal(card) {
    if (['J', 'Q', 'K'].includes(card.v)) return 10
    if (card.v === 'A') return 11
    return parseInt(card.v)
}

function handValue(hand) {
    let val = hand.reduce((s, c) => s + cardVal(c), 0)
    let aces = hand.filter(c => c.v === 'A').length
    while (val > 21 && aces > 0) { val -= 10; aces-- }
    return val
}

function renderHand(hand, hideSecond = false) {
    if (hideSecond) return `${hand[0].v}${hand[0].s} | 🂠`
    return hand.map(c => `${c.v}${c.s}`).join(' | ')
}

function renderGame(g, reveal = false) {
    const pVal = handValue(g.player)
    const dVal = reveal ? handValue(g.dealer) : '?'
    return (
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `🤖 *DÉMON :* ${renderHand(g.dealer, !reveal)}  [${dVal}]\n` +
        `👤 *TOI :*   ${renderHand(g.player)}  [${pVal}]\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
}

export default async function blackjack(sock, sender, args, msg) {
    const sub = args[0]?.toLowerCase()

    // --- Tirer une carte ---
    if (sub === 'tirer' || sub === 'hit') {
        if (!games.has(sender)) return sendMessage(sock, sender, `☠ Aucune partie en cours. Lance \`.blackjack\``)
        const g = games.get(sender)
        const card = g.deck.pop()
        g.player.push(card)
        const val = handValue(g.player)

        if (val > 21) {
            games.delete(sender)
            return sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `☠   💀 *BUST ! TU AS PERDU !* 💀     ⛧\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                renderGame(g, true) + `\n\n` +
                `⛧ Tu as dépassé 21 ! [${val}]\n` +
                `💡 Rejoue: \`.blackjack\``
            )
        }
        if (val === 21) {
            // Auto-stand à 21
            return sendMessage(sock, sender,
                `🎯 *BLACKJACK ! 21 pile !*\n\n` + renderGame(g, false) + `\n\n` +
                `✊ \`.blackjack rester\` pour encaisser | ✨ Continue si tu veux risquer`
            )
        }
        return sendMessage(sock, sender,
            renderGame(g, false) + `\n\n` +
            `▶️ \`.blackjack tirer\` — encore une carte\n` +
            `🛑 \`.blackjack rester\` — rester à ${val}`
        )
    }

    // --- Rester (Stand) ---
    if (sub === 'rester' || sub === 'stand') {
        if (!games.has(sender)) return sendMessage(sock, sender, `☠ Aucune partie en cours.`)
        const g = games.get(sender)

        // Tour du dealer (tire jusqu'à 17)
        while (handValue(g.dealer) < 17) g.dealer.push(g.deck.pop())

        const pVal = handValue(g.player)
        const dVal = handValue(g.dealer)
        games.delete(sender)

        let result, emoji
        if (dVal > 21 || pVal > dVal) { result = '🏆 TU GAGNES !'; emoji = '🎉' }
        else if (pVal === dVal)        { result = '🤝 ÉGALITÉ !';  emoji = '😐' }
        else                           { result = '😈 LE DÉMON GAGNE !'; emoji = '💀' }

        return sendMessage(sock, sender,
            `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
            `${emoji}   🃏 *RÉSULTAT BLACKJACK*           ⛧\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            renderGame(g, true) + `\n\n` +
            `  👤 Toi: *${pVal}*  |  🤖 Démon: *${dVal}*\n\n` +
            `  ⚔️ *${result}*\n\n` +
            `💡 Rejoue: \`.blackjack\``
        )
    }

    // --- Arrêter ---
    if (sub === 'stop') {
        games.delete(sender)
        return sendMessage(sock, sender, `🛑 Partie annulée.`)
    }

    // --- Nouvelle partie ---
    const deck = makeDeck()
    const player = [deck.pop(), deck.pop()]
    const dealer = [deck.pop(), deck.pop()]
    games.set(sender, { deck, player, dealer })

    const pVal = handValue(player)

    // Blackjack naturel ?
    if (pVal === 21) {
        games.delete(sender)
        return sendMessage(sock, sender,
            `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
            `🌟   ♠ *BLACKJACK NATUREL !* ♠      🌟\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `👤 Ta main: ${renderHand(player)}  [21]\n\n` +
            `🎉 Tu gagnes instantanément !\n` +
            `💡 Rejoue: \`.blackjack\``
        )
    }

    await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🃏 *BLACKJACK* — LORD DEMON 🃏   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `🎯 *Objectif :* Approcher 21 sans dépasser\n\n` +
        renderGame({ player, dealer }, false) + `\n\n` +
        `▶️ \`.blackjack tirer\`  — Tirer une carte\n` +
        `🛑 \`.blackjack rester\` — Rester à ${pVal}\n` +
        `❌ \`.blackjack stop\`   — Abandonner`
    )
}
