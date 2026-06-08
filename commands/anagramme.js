// commands/anagramme.js — ANAGRAMME 🔤
import { sendMessage } from '../lib/sendMessage.js'

const MOTS_JEUX = [
    { mot: 'DRAGON', indice: '🐉 Créature mythique crachant du feu' },
    { mot: 'VAMPIRE', indice: '🧛 Boit du sang la nuit' },
    { mot: 'ZOMBIE', indice: '🧟 Mort-vivant qui revient à la vie' },
    { mot: 'SORCIER', indice: '🧙 Pratique la magie noire' },
    { mot: 'DEMON', indice: '😈 Être maléfique et puissant' },
    { mot: 'FANTOME', indice: '👻 Esprit d\'un mort qui hante' },
    { mot: 'MONSTRE', indice: '👹 Créature effrayante et terrible' },
    { mot: 'CHATEAU', indice: '🏰 Grande demeure fortifiée médiévale' },
    { mot: 'EPEE', indice: '⚔️ Arme blanche longue et tranchante' },
    { mot: 'BOUCLIER', indice: '🛡️ Protège des attaques ennemies' },
    { mot: 'TRESOR', indice: '💎 Grande richesse cachée secrètement' },
    { mot: 'ENIGME', indice: '❓ Mystère difficile à résoudre' },
    { mot: 'LABYRINTHE', indice: '🌀 Dédale de couloirs sans sortie' },
    { mot: 'POTION', indice: '🧪 Liquide magique aux pouvoirs spéciaux' },
    { mot: 'MALEFICE', indice: '🖤 Sort maléfique jeté sur quelqu\'un' },
    { mot: 'TENEBRES', indice: '🌚 Obscurité profonde et terrifiante' },
    { mot: 'SCEPTRE', indice: '👑 Bâton symbole du pouvoir royal' },
    { mot: 'PORTAIL', indice: '🌀 Passage vers un autre monde' },
    { mot: 'RITUEL', indice: '🕯️ Cérémonie magique répétée' },
    { mot: 'INVOCATION', indice: '☠️ Appel de forces surnaturelles' },
]

function melanger(mot) {
    const arr = mot.split('')
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    const res = arr.join('')
    return res === mot ? melanger(mot) : res
}

const sessions = new Map()

export default async function anagramme(sock, sender, args, msg) {
    const sub = args[0]?.toLowerCase()

    if (sub === 'stop') {
        if (sessions.has(sender)) {
            const s = sessions.get(sender)
            sessions.delete(sender)
            return sendMessage(sock, sender, `🛑 Partie arrêtée.\n📝 Le mot était: *${s.mot}*`)
        }
        return sendMessage(sock, sender, `☠ Aucune partie en cours.`)
    }

    if (sub === 'indice' && sessions.has(sender)) {
        const s = sessions.get(sender)
        return sendMessage(sock, sender,
            `☩━━━〔 💡 *INDICE* 〕━━━☩\n` +
            `⛧ ${s.indice}\n` +
            `📏 ${s.mot.length} lettres\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    // Vérifier réponse si session active
    if (sessions.has(sender) && sub) {
        const s = sessions.get(sender)
        const rep = args.join('').toUpperCase().replace(/\s+/g, '')
        if (rep === s.mot) {
            sessions.delete(sender)
            return sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `🎉   ✅ *BRAVO ! ANAGRAMME TROUVÉ !*  🏆\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `📝 Le mot était: *${s.mot}*\n` +
                `💡 ${s.indice}\n\n` +
                `💡 Rejoue: \`.anagramme\``
            )
        } else {
            return sendMessage(sock, sender, `❌ *${rep}* n'est pas la bonne réponse. Réessaie !\n💡 \`.anagramme indice\` pour un indice`)
        }
    }

    // Nouvelle partie
    const item = MOTS_JEUX[Math.floor(Math.random() * MOTS_JEUX.length)]
    const melange = melanger(item.mot)
    sessions.set(sender, { mot: item.mot, indice: item.indice })

    await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🔤 *ANAGRAMME DÉMONIAQUE*       ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `🔀 *Lettres mélangées:*\n\`\`\`${melange}\`\`\`\n\n` +
        `📏 *Longueur:* ${item.mot.length} lettres\n\n` +
        `💬 Tape le mot reconstitué\n` +
        `💡 \`.anagramme indice\` — Obtenir un indice\n` +
        `🛑 \`.anagramme stop\`   — Abandonner\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
}
