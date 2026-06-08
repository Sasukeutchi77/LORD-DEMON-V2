// commands/ai.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  INTELLIGENCE ARTIFICIELLE — GROQ API               ║
// ║  Modèle : llama-3.3-70b-versatile                   ║
// ║  Historique par utilisateur, loader animé           ║
// ║  Accès : Owner/Sudo illimité | Autres : 10 uses     ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { isOwner, isSudo } from '../lib/ownerSystem.js'
import { checkUsage, consumeUsage } from '../lib/usageSystem.js'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL        = 'llama-3.3-70b-versatile'
const MAX_TOKENS   = 1024
const HISTORY_MAX  = 10

const conversationHistory = new Map()

function getHistory(userId) {
    if (!conversationHistory.has(userId)) {
        conversationHistory.set(userId, [])
    }
    return conversationHistory.get(userId)
}

function addToHistory(userId, role, content) {
    const history = getHistory(userId)
    history.push({ role, content })
    if (history.length > HISTORY_MAX) {
        history.splice(0, history.length - HISTORY_MAX)
    }
}

function clearHistory(userId) {
    conversationHistory.delete(userId)
}

function truncate(text, max = 3000) {
    if (text.length <= max) return text
    return text.slice(0, max) + '\n\n_[Réponse tronquée — trop longue]_'
}

function formatResponse(text, question, userId) {
    const shortId = userId.replace('@s.whatsapp.net', '').slice(-4)
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    const histCount = getHistory(userId).length / 2

    return (
        `☩━━━〔 🤖 *LORD DEMON A.I* 〕━━━☩\n` +
        `☠\n` +
        `⛧  ❓ *Question:*\n` +
        `☩  _${question.slice(0, 80)}${question.length > 80 ? '...' : ''}_\n` +
        `☠\n` +
        `✝  💬 *Réponse:*\n` +
        `☠\n` +
        `${text}\n` +
        `☠\n` +
        `☠  🕐 ${time}  •  🔁 Tour ${histCount}\n` +
        `⛧  _💡 .ai reset — effacer l'historique_\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
}

async function callGroq(messages) {
    const apiKey = process.env.CLE_GROQ
    if (!apiKey) throw new Error('CLE_GROQ non configurée dans les variables d\'environnement.')

    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: MODEL,
            messages,
            max_tokens: MAX_TOKENS,
            temperature: 0.7,
            stream: false
        })
    })

    if (!response.ok) {
        const err = await response.text().catch(() => response.statusText)
        throw new Error(`Groq API [${response.status}]: ${err.slice(0, 150)}`)
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content
    if (!content) throw new Error('Réponse vide reçue de l\'IA.')
    return content.trim()
}

export default async function ai(sock, sender, args, msg, ctx) {
    const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
    const prefix    = process.env.PREFIX || '.'

    if (!args.length) {
        return await sendMessage(sock, sender,
            `☩━━━〔 🤖 *LORD DEMON A.I* 〕━━━☩\n` +
            `☠\n` +
            `☩  💡 *invocation:*\n` +
            `✝  .ai <ta question>\n` +
            `☠\n` +
            `☠  📋 *Exemples:*\n` +
            `⛧  .ai C'est quoi l'IA ?\n` +
            `☩  .ai Traduis "bonjour" en anglais\n` +
            `✝  .ai Écris un poème sur la nuit\n` +
            `☠  .ai Donne-moi une recette de pizza\n` +
            `☠\n` +
            `⛧  🔁 *sorts spéciales:*\n` +
            `☩  .ai reset — effacer l'historique\n` +
            `☠\n` +
            `✝  🧠 Modèle: llama-3.3-70b\n` +
            `☠  ⚡ Propulsé par Groq\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    if (args[0].toLowerCase() === 'reset') {
        clearHistory(senderJid)
        return await sendMessage(sock, sender,
            `☩━━━〔 🤖 *LORD DEMON A.I* 〕━━━☩\n` +
            `☠\n` +
            `⛧  🩸 *Historique effacé !*\n` +
            `☩  Tu pars d'une page blanche.\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }

    // ─── Vérification accès ──────────────────────────────
    const privileged = isOwner(senderJid) || isSudo(senderJid)

    if (!privileged) {
        const { allowed } = checkUsage(senderJid)
        if (!allowed) {
            return await sendMessage(sock, sender,
                `☩━━━〔 🤖 *LORD DEMON A.I* 〕━━━☩\n` +
                `☠\n` +
                `✝  🔒 *Accès restreint*\n` +
                `☠\n` +
                `☠  Pour avoir accès aux sorts\n` +
                `⛧  *ai*, tu dois utiliser la sort\n` +
                `☩  *${prefix}partager*.\n` +
                `☠\n` +
                `✝  Une fois le partage effectué, tu\n` +
                `☠  obtiendras *10 utilisations* des\n` +
                `⛧  sorts demon / ai / pairing.\n` +
                `☠\n` +
                `☩  💡 Tape *${prefix}partager* pour commencer.\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }
    }

    const question = args.join(' ').trim()
    let loadKey = null

    try {
        loadKey = await showProgressLoader(sock, sender, '🤖 IA EN RÉFLEXION')

        const systemPrompt = {
            role: 'system',
            content:
                'Tu es LORD DEMON A.I, un assistant intelligent intégré dans un Démon WhatsApp appelé LORD DEMON V3. ' +
                'Tu es utile, précis, et tu réponds toujours en français sauf si l\'utilisateur écrit dans une autre langue. ' +
                'Tes réponses sont concises et claires. Tu n\'utilises pas de formatage Markdown complexe. ' +
                'Tu peux aider avec: traductions, calculs, explications, rédaction, conseils, blagues, et bien plus.'
        }

        const history = getHistory(senderJid)
        const messages = [systemPrompt, ...history, { role: 'user', content: question }]

        const aiResponse = await callGroq(messages)

        // ─── Consommer 1 utilisation si pas privilégié ───
        let usageNotice = ''
        if (!privileged) {
            const { remaining } = consumeUsage(senderJid)
            if (remaining <= 3) {
                usageNotice = `\n✝  ⚠️ Il te reste *${remaining}* invocation(s).\n☠  Tape ${prefix}partager pour recharger.`
            }
        }

        addToHistory(senderJid, 'user', question)
        addToHistory(senderJid, 'assistant', aiResponse)

        await deleteLoader(sock, sender, loadKey)
        loadKey = null

        const formattedLines = aiResponse.split('\n').map(line => `⛧  ${line}`).join('\n')
        const finalText = formatResponse(formattedLines, question, senderJid)

        const withUsage = usageNotice
            ? finalText.replace('⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸', usageNotice + '\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸')
            : finalText

        await sendMessage(sock, sender, truncate(withUsage))

    } catch (e) {
        console.error('❌ ai.js erreur:', e.message)
        if (loadKey) await deleteLoader(sock, sender, loadKey)

        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ A.I* 〕━━━☩\n` +
            `☠\n` +
            `☩  ⚠️ ${e.message.slice(0, 120)}\n` +
            `☠\n` +
            `✝  💡 Solutions:\n` +
            `☠  → Réessaie dans quelques secondes\n` +
            `⛧  → Essaie .ai reset si bloqué\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
