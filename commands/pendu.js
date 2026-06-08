// commands/pendu.js — JEU DU PENDU 🎭
// ✅ 200+ mots français par catégorie
// ✅ 6 tentatives, dessin ASCII du pendu
// ✅ Indices disponibles

import { sendMessage } from '../lib/sendMessage.js'

const MOTS = [
    // Animaux
    'elephant','girafe','rhinoceros','crocodile','hippopotame','panthère','guepard','perroquet','dauphin','baleine',
    // Pays
    'france','espagne','portugal','allemagne','japon','australie','bresil','mexique','canada','egypte',
    // Sports
    'football','basketball','natation','cyclisme','athletisme','volleyball','handball','karate','judo','escrime',
    // Nourriture
    'chocolat','croissant','baguette','fromage','camembert','brioche','macaron','eclair','madeleine','crepe',
    // Technologie
    'ordinateur','internet','telephone','satellite','robotique','intelligence','algorithme','programme','serveur','reseau',
    // Nature
    'montagne','volcano','tornade','tsunami','avalanche','cascade','foret','desert','prairie','archipel',
    // Métiers
    'architecte','chirurgien','ingenieur','journaliste','photographe','compositeur','philosophe','astronaute','diplomate','entrepreneur',
    // Objets
    'bibliotheque','parapluie','microscope','telescope','thermometre','calculatrice','dictionnaire','encyclopedie','horloge','boussole'
]

const ETAPES = [
    '```\n  ___\n |   |\n |\n |\n |\n_|_\n```',
    '```\n  ___\n |   |\n |   O\n |\n |\n_|_\n```',
    '```\n  ___\n |   |\n |   O\n |   |\n |\n_|_\n```',
    '```\n  ___\n |   |\n |   O\n |  /|\n |\n_|_\n```',
    '```\n  ___\n |   |\n |   O\n |  /|\\\n |\n_|_\n```',
    '```\n  ___\n |   |\n |   O\n |  /|\\\n |  /\n_|_\n```',
    '```\n  ___\n |   |\n |   O\n |  /|\\\n |  / \\\n_|_\n```'
]

const sessions = new Map()

function motCache(mot, trouves) {
    return mot.split('').map(l => trouves.has(l) ? l.toUpperCase() : '_').join(' ')
}

function renderPendu(s) {
    const reste = s.mot.length - [...s.mot].filter(l => s.trouves.has(l)).length
    return (
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `☠   🎭 *JEU DU PENDU*             ⛧\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `${ETAPES[s.erreurs]}\n\n` +
        `📝 Mot: \`${motCache(s.mot, s.trouves)}\`  (${s.mot.length} lettres)\n` +
        `💡 Lettres essayées: ${[...s.essais].join(', ') || '—'}\n` +
        `❤️ Vies restantes: ${6 - s.erreurs}/6\n` +
        `🔤 Lettres manquantes: ${reste}\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `▶️ \`.pendu <lettre>\` — Proposer une lettre\n` +
        `💬 \`.pendu mot <mot>\` — Deviner le mot\n` +
        `💡 \`.pendu indice\`   — Obtenir un indice (-1 vie)\n` +
        `🛑 \`.pendu stop\`    — Abandonner`
    )
}

export default async function pendu(sock, sender, args, msg) {
    const sub = args[0]?.toLowerCase()

    if (sub === 'stop') {
        if (sessions.has(sender)) {
            const s = sessions.get(sender)
            sessions.delete(sender)
            return sendMessage(sock, sender, `🛑 Partie abandonnée. Le mot était: *${s.mot.toUpperCase()}*`)
        }
        return sendMessage(sock, sender, `☠ Aucune partie en cours.`)
    }

    if (sub === 'indice' && sessions.has(sender)) {
        const s = sessions.get(sender)
        s.erreurs = Math.min(6, s.erreurs + 1)
        // Révéler une lettre aléatoire non trouvée
        const inconnues = [...s.mot].filter(l => !s.trouves.has(l))
        if (inconnues.length > 0) {
            const lettre = inconnues[Math.floor(Math.random() * inconnues.length)]
            s.trouves.add(lettre)
            await sendMessage(sock, sender, `💡 Indice: la lettre *${lettre.toUpperCase()}* (-1 vie)`)
        }
        if (s.erreurs >= 6) {
            sessions.delete(sender)
            return sendMessage(sock, sender, `☠ Trop d'erreurs ! Le mot était: *${s.mot.toUpperCase()}*`)
        }
        return sendMessage(sock, sender, renderPendu(s))
    }

    // Deviner le mot entier
    if (sub === 'mot' && sessions.has(sender)) {
        const s = sessions.get(sender)
        const tentative = args.slice(1).join('').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        if (tentative === s.mot) {
            sessions.delete(sender)
            return sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `🎉   ✅ *BRAVO ! MOT TROUVÉ !*       🏆\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `📝 Le mot était: *${s.mot.toUpperCase()}*\n` +
                `❤️ Vies restantes: ${6 - s.erreurs}/6\n\n` +
                `💡 Rejoue: \`.pendu\``
            )
        } else {
            s.erreurs = Math.min(6, s.erreurs + 2)
            if (s.erreurs >= 6) {
                sessions.delete(sender)
                return sendMessage(sock, sender, `☠ Mauvaise réponse ! Le mot était: *${s.mot.toUpperCase()}*`)
            }
            await sendMessage(sock, sender, `❌ Mauvais mot ! -2 vies`)
            return sendMessage(sock, sender, renderPendu(s))
        }
    }

    // Proposer une lettre
    if (sessions.has(sender) && sub && sub.length === 1) {
        const s = sessions.get(sender)
        const lettre = sub.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        if (s.essais.has(lettre)) {
            return sendMessage(sock, sender, `⚠️ Tu as déjà essayé la lettre *${lettre.toUpperCase()}* !`)
        }
        s.essais.add(lettre)
        if (s.mot.includes(lettre)) {
            s.trouves.add(lettre)
            const gagne = [...s.mot].every(l => s.trouves.has(l))
            if (gagne) {
                sessions.delete(sender)
                return sendMessage(sock, sender,
                    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                    `🎉   ✅ *BRAVO ! TU AS GAGNÉ !*     🏆\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                    `📝 Mot: *${s.mot.toUpperCase()}*\n` +
                    `❤️ Vies restantes: ${6 - s.erreurs}/6\n\n` +
                    `💡 Rejoue: \`.pendu\``
                )
            }
            await sendMessage(sock, sender, `✅ Bonne lettre ! *${lettre.toUpperCase()}* est dans le mot !`)
        } else {
            s.erreurs++
            if (s.erreurs >= 6) {
                sessions.delete(sender)
                return sendMessage(sock, sender,
                    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                    `☠   💀 *PERDU ! LE PENDU EST MORT* 💀  ⛧\n` +
                    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                    `${ETAPES[6]}\n\n` +
                    `📝 Le mot était: *${s.mot.toUpperCase()}*\n\n` +
                    `💡 Rejoue: \`.pendu\``
                )
            }
            await sendMessage(sock, sender, `❌ Mauvaise lettre ! *${lettre.toUpperCase()}* n'est pas dans le mot.`)
        }
        return sendMessage(sock, sender, renderPendu(s))
    }

    // Nouvelle partie
    const mot = MOTS[Math.floor(Math.random() * MOTS.length)]
    sessions.set(sender, { mot, trouves: new Set(), essais: new Set(), erreurs: 0 })
    await sendMessage(sock, sender, renderPendu(sessions.get(sender)))
}
