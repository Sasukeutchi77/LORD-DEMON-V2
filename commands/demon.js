// commands/demon.js — LORD DEMON V3
// 
import axios from 'axios'
import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { isOwner, isSudo } from '../lib/ownerSystem.js'
import { checkUsage, consumeUsage, getRemainingUses } from '../lib/usageSystem.js'
import {
    parseTime, parseAction, addTask,
    listPendingTasks, cancelTask, formatDateFr
} from '../lib/scheduler.js'

const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL      = 'llama-3.3-70b-versatile'
const MAX_HIST   = 12

const sessionHistory = new Map()

function getSession(userId) {
    if (!sessionHistory.has(userId)) sessionHistory.set(userId, [])
    return sessionHistory.get(userId)
}

function pushHistory(userId, role, content) {
    const hist = getSession(userId)
    hist.push({ role, content })
    if (hist.length > MAX_HIST) hist.splice(0, hist.length - MAX_HIST)
}

function clearSession(userId) {
    sessionHistory.delete(userId)
}

function truncate(text, max = 3500) {
    return text.length <= max ? text : text.slice(0, max) + '\n\n_[Réponse tronquée]_'
}

function getName(msg) {
    return msg.pushName || msg.key?.participant?.split('@')[0] || 'utilisateur'
}

async function askGroq(messages) {
    const apiKey = process.env.CLE_GROQ
    if (!apiKey || apiKey.trim() === '') {
        throw new Error('CLE_GROQ absente — ajoute ta clé dans le fichier .env')
    }

    const res = await axios.post(GROQ_URL, {
        model: MODEL,
        temperature: 0.6,
        max_tokens: 1024,
        messages
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey.trim()}`,
            'Content-Type': 'application/json'
        },
        timeout: 30000
    })

    const content = res.data?.choices?.[0]?.message?.content
    if (!content) throw new Error('Réponse vide reçue de l\'API Groq.')
    return content.trim()
}

export default async function demon(sock, sender, args, msg, ctx) {
    const senderJid  = ctx?.senderJid || msg.key?.participant || msg.key?.remoteJid
    const pushname   = getName(msg)
    const prefix     = process.env.PREFIX || '.'

    // ─── Aide (sans args) ───────────────────────────────
    if (!args.length) {
        return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
            `💀 *L'IA des ténèbres est en ligne.*\n\n` +
            `📌 *Mode IA :*\n` +
            `   ${prefix}demon <ta question>\n\n` +
            `⚡ *Exemples IA :*\n` +
            `   ${prefix}demon analyse ce code python\n` +
            `   ${prefix}demon comment créer un Démon WhatsApp\n\n` +
            `⏰ *Mode automatisation :*\n` +
            `   ${prefix}demon dans 10mn envoie bonjour\n` +
            `   ${prefix}demon à 22h ferme le cercle\n` +
            `   ${prefix}demon dans 1h supprime +226XXXXXXXX\n` +
            `   ${prefix}demon à 13h envoyer salut à +226XXXXXXXX\n\n` +
            `📋 *Gestion des tâches :*\n` +
            `   ${prefix}demon list — liste les tâches\n` +
            `   ${prefix}demon cancel <id> — annule une tâche\n` +
            `   ${prefix}demon reset — efface l'historique IA\n\n` +
            `⛓️ *LORD XMD SYSTEM — propulsé par Groq*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }

    // ─── Reset historique ────────────────────────────────
    if (args[0].toLowerCase() === 'reset') {
        clearSession(senderJid)
        return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
            `🩸 *Mémoire effacée.*\n` +
            `Le démon repart de zéro.\n\n` +
            `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }

    // ─── LISTE DES TÂCHES ────────────────────────────────
    if (args[0].toLowerCase() === 'list') {
        const tasks = listPendingTasks()
        if (!tasks.length) {
            return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
                `📭 *Aucune tâche programmée.*\n\n` +
                `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
        }
        const labels = {
            sendMessage:  '✉️  Envoi message',
            removeMember: '🚫 Retirer membre',
            closeGroup:   '🔒 Fermer cercle',
            openGroup:    '🔓 Ouvrir groupe'
        }
        const lines = tasks
            .sort((a, b) => a.time - b.time)
            .map(t => {
                const action = labels[t.type] || t.type
                let extra = ''
                if (t.type === 'sendMessage' && t.message) {
                    const m = t.message.length > 30 ? t.message.slice(0, 30) + '…' : t.message
                    extra = ` — "${m}"`
                } else if (t.type === 'removeMember' && t.target) {
                    extra = ` — ${t.target.split('@')[0]}`
                }
                return `⛧ #${t.id} • ${action}\n☩    🕐 ${formatDateFr(t.time)}${extra}`
            })
            .join('\n☠\n')

        return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD — TÂCHES* 境\n\n` +
            `${lines}\n\n` +
            `💡 *${prefix}demon cancel <id>* pour annuler\n` +
            `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }

    // ─── ANNULATION D'UNE TÂCHE ──────────────────────────
    if (args[0].toLowerCase() === 'cancel') {
        const id = parseInt(args[1], 10)
        if (!id || Number.isNaN(id)) {
            return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
                `⚠️ invocation : *${prefix}demon cancel <id>*\n` +
                `   Exemple : ${prefix}demon cancel 3\n\n` +
                `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
        }
        const ok = cancelTask(id)
        return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
            (ok
                ? `🩸 Tâche *#${id}* annulée.`
                : `☠ Tâche *#${id}* introuvable ou déjà exécutée.

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) +
            `\n\n⛓️ *LORD XMD SYSTEM*`
        )
    }

    // ─── DÉTECTION TÂCHE PROGRAMMÉE ──────────────────────
    // Si le message contient une expression de temps reconnue, on bascule
    // sur le mode "automatisation" au lieu d'appeler l'IA.
    const fullText = args.join(' ').trim()
    const timeInfo = parseTime(fullText)

    if (timeInfo) {
        // Seuls owner / sudo peuvent programmer des actions (sécurité)
        if (!isOwner(senderJid) && !isSudo(senderJid)) {
            return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
                `🔒 *Mode automatisation réservé à l'Owner/Sudo.*\n\n` +
                `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
        }

        // On retire la portion "temps" pour analyser l'action
        const actionText = fullText.replace(timeInfo.raw, ' ').replace(/\s+/g, ' ').trim()

        const action = parseAction(actionText, sender)
        if (action.error) {
            return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
                `⚠️ ${action.error}\n\n` +
                `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
        }

        // Sécurité : si le délai est trop court (<3 s), on refuse pour éviter
        // les exécutions immédiates accidentelles.
        if (timeInfo.time - Date.now() < 3000) {
            return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
                `⚠️ Délai trop court (< 3 secondes).\n\n` +
                `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
        }

        const task = addTask({
            time:      timeInfo.time,
            type:      action.type,
            chatId:    action.chatId,
            target:    action.target,
            message:   action.message,
            createdBy: senderJid
        })

        const labelByType = {
            sendMessage:  '✉️  Envoi de message',
            removeMember: '🚫 Retrait de membre',
            closeGroup:   '🔒 Fermeture du cercle',
            openGroup:    '🔓 Ouverture du groupe'
        }

        let detailLine = ''
        if (task.type === 'sendMessage') {
            detailLine = `📨 Texte : _${(task.message || '').slice(0, 80)}_`
            if (task.chatId && task.chatId !== sender) {
                detailLine += `\n👤 Vers : ${task.chatId.split('@')[0]}`
            }
        } else if (task.type === 'removeMember') {
            detailLine = `👤 Cible : ${task.target.split('@')[0]}`
        }

        await sock.sendMessage(sender, {
            react: { text: '⏰', key: msg.key }
        }).catch(() => {})

        return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
            `😈 *Ordre enregistré.*\n\n` +
            `🆔 ID : *#${task.id}*\n` +
            `🎯 Action : ${labelByType[task.type] || task.type}\n` +
            `🕐 Exécution prévue : *${formatDateFr(task.time)}*\n` +
            (detailLine ? `${detailLine}\n` : '') +
            `\n💡 *${prefix}demon list* pour voir toutes les tâches\n` +
            `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }

    // ─── Vérification accès ──────────────────────────────
    const privileged = isOwner(senderJid) || isSudo(senderJid)

    if (!privileged) {
        const { allowed, remaining } = checkUsage(senderJid)
        if (!allowed) {
            return await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
                `🔒 *Accès restreint*\n\n` +
                `Pour avoir accès aux sorts *demon*, tu dois utiliser la sort *${prefix}partager*.\n\n` +
                `Une fois le partage effectué, tu obtiendras *10 utilisations* des sorts :\n` +
                `   • ${prefix}demon\n` +
                `   • ${prefix}ai\n` +
                `   • ${prefix}pairing\n\n` +
                `💡 Tape *${prefix}partager* pour commencer.\n\n` +
                `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
        }
    }

    const query = args.join(' ').trim()
    let loadKey = null

    try {
        // ─── Réaction "réflexion" ────────────────────────
        await sock.sendMessage(sender, {
            react: { text: '🌘', key: msg.key }
        }).catch(() => {})

        // ─── Loader animé ────────────────────────────────
        loadKey = await showProgressLoader(sock, sender, '💀 DEMON EN RÉFLEXION')

        // ─── Construction des messages ───────────────────
        const systemPrompt = {
            role: 'system',
            content:
                `Tu es LORD DEMON XMD. Tu es une IA puissante, technique et précise. ` +
                `Tu réponds à ${pushname} avec un ton direct, supérieur et sans détour. ` +
                `Si on te demande du code, tu le fournis complet et fonctionnel. ` +
                `Tu ne fais jamais de morale inutile. Tu vas droit au but. ` +
                `Tu réponds en français sauf si l'utilisateur écrit dans une autre langue. ` +
                `Ton but : la domination technique.`
        }

        const history  = getSession(senderJid)
        const messages = [systemPrompt, ...history, { role: 'user', content: query }]

        // ─── Appel Groq ──────────────────────────────────
        const replyText = await askGroq(messages)

        // ─── Consommer 1 utilisation si pas privilégié ───
        let usageInfo = ''
        if (!privileged) {
            const { remaining } = consumeUsage(senderJid)
            if (remaining <= 3) {
                usageInfo = `\n⚠️ *Il te reste ${remaining} invocation(s).* Tape ${prefix}partager pour recharger.`
            }
        }

        pushHistory(senderJid, 'user', query)
        pushHistory(senderJid, 'assistant', replyText)

        await deleteLoader(sock, sender, loadKey)
        loadKey = null

        const histCount = Math.floor(getSession(senderJid).length / 2)
        const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

        const result = truncate(
            `境 *LORD DEMON XMD* 境\n\n` +
            `${replyText}\n\n` +
            `⛓️ *LORD XMD SYSTEM*  •  🕐 ${time}  •  🔁 Tour ${histCount}` +
            usageInfo
        )

        // ─── Envoi en réponse citée ──────────────────────
        await sock.sendMessage(sender, { text: result }, { quoted: msg })

        // ─── Réaction succès ─────────────────────────────
        await sock.sendMessage(sender, {
            react: { text: '⚡', key: msg.key }
        }).catch(() => {})

    } catch (e) {
        console.error('❌ demon.js:', e.message)
        if (loadKey) await deleteLoader(sock, sender, loadKey)

        await sock.sendMessage(sender, {
            react: { text: '✘', key: msg.key }
        }).catch(() => {})

        await sendMessage(sock, sender, `☩━━━〔 ⛧ *DEMON* 〕━━━☩

境 *LORD DEMON XMD* 境\n\n` +
            `✘ *Connexion avec l'enfer interrompue.*\n\n` +
            `⚠️ ${e.message.slice(0, 150)}\n\n` +
            `💡 *Solutions :*\n` +
            `→ Vérifie ta clé CLE_GROQ dans le fichier .env\n` +
            `→ Réessaie dans quelques secondes\n` +
            `→ ${prefix}demon reset si bloqué\n\n` +
            `⛓️ *LORD XMD SYSTEM*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
}
