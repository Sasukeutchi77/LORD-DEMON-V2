// lib/animLoader.js — LORD-DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  ANIMATIONS DE CHARGEMENT PREMIUM     ║
// ║  Loaders cinématiques, spinner, scan, action        ║
// ╚══════════════════════════════════════════════════════╝

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// ═══════════════════════════════════════════════════════
//  LOADER BARRE DE PROGRESSION PREMIUM
// ═══════════════════════════════════════════════════════
export async function showProgressLoader(sock, sender, title = "Chargement") {
    const steps = [
        { bar: "░░░░░░░░░░░░░░░░", pct: " 0%",  status: "🔍 Initialisation..." },
        { bar: "▓▓▓▓░░░░░░░░░░░░", pct: "25%",  status: "📦 Chargement des modules..." },
        { bar: "▓▓▓▓▓▓▓▓░░░░░░░░", pct: "50%",  status: "⚙️  Traitement en cours..." },
        { bar: "▓▓▓▓▓▓▓▓▓▓▓▓░░░░", pct: "75%",  status: "🔗 Connexion aux données..." },
        { bar: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", pct: "100%", status: "✅ Opération terminée !" },
    ]

    const msg = await sock.sendMessage(sender, {
        text:
            `╭━━━〔 ⚡ *${title.toUpperCase()}* 〕━━━╮\n` +
            `┃\n` +
            `┃  ${steps[0].bar}  ${steps[0].pct}\n` +
            `┃  _${steps[0].status}_\n` +
            `┃\n` +
            `╰─────────────────────────────╯`
    })

    for (let i = 1; i < steps.length; i++) {
        await delay(200)
        await sock.sendMessage(sender, {
            text:
                `╭━━━〔 ⚡ *${title.toUpperCase()}* 〕━━━╮\n` +
                `┃\n` +
                `┃  ${steps[i].bar}  ${steps[i].pct}\n` +
                `┃  _${steps[i].status}_\n` +
                `┃\n` +
                `╰─────────────────────────────╯`,
            edit: msg.key
        }).catch(() => {})
    }

    await delay(250)
    return msg.key
}

// ═══════════════════════════════════════════════════════
//  LOADER SPINNER PREMIUM
// ═══════════════════════════════════════════════════════
export async function showSpinnerLoader(sock, sender, title = "Traitement en cours") {
    const frames = [
        "🔵 ○ ○ ○ ○",
        "○ 🟣 ○ ○ ○",
        "○ ○ 🟤 ○ ○",
        "○ ○ ○ 🟠 ○",
        "○ ○ ○ ○ 🟡",
        "○ ○ ○ 🟢 ○",
        "✅ ✅ ✅ ✅ ✅"
    ]

    const msg = await sock.sendMessage(sender, {
        text: `⏳ *${title}*\n\n${frames[0]}`
    })

    for (let i = 1; i < frames.length; i++) {
        await delay(150)
        await sock.sendMessage(sender, {
            text: `⏳ *${title}*\n\n${frames[i]}`,
            edit: msg.key
        }).catch(() => {})
    }

    return msg.key
}

// ═══════════════════════════════════════════════════════
//  LOADER PREMIUM (LUXE — Encadré complet)
// ═══════════════════════════════════════════════════════
export async function showPremiumLoader(sock, sender, action = "CHARGEMENT") {
    const frames = [
        { bar: "░░░░░░░░░░", pct: " 0%",  step: "🔄 Démarrage système...",     dot: "🔴 ● ○ ○ ○" },
        { bar: "▓▓░░░░░░░░", pct: "20%",  step: "📦 Chargement modules...",    dot: "🟠 ● ● ○ ○" },
        { bar: "▓▓▓▓▓░░░░░", pct: "50%",  step: "⚙️  Traitement...",            dot: "🟡 ● ● ● ○" },
        { bar: "▓▓▓▓▓▓▓▓░░", pct: "80%",  step: "✨ Optimisation...",          dot: "🟢 ● ● ● ●" },
        { bar: "▓▓▓▓▓▓▓▓▓▓", pct: "100%", step: "🎯 Accès autorisé !",         dot: "💚 ● ● ● ●" },
    ]

    const buildFrame = (f) =>
        `╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮\n` +
        `┃  ⚡ *${action}* ⚡  \n` +
        `┃\n` +
        `┃  ${f.bar}  ${f.pct}\n` +
        `┃  ${f.dot}\n` +
        `┃  _${f.step}_\n` +
        `┃\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    const msg = await sock.sendMessage(sender, { text: buildFrame(frames[0]) })

    for (let i = 1; i < frames.length; i++) {
        await delay(220)
        await sock.sendMessage(sender, {
            text: buildFrame(frames[i]),
            edit: msg.key
        }).catch(() => {})
    }

    await delay(300)
    return msg.key
}

// ═══════════════════════════════════════════════════════
//  LOADER SCAN / VÉRIFICATION
// ═══════════════════════════════════════════════════════
export async function showScanLoader(sock, sender, target = "utilisateur") {
    const steps = [
        `🔎 *SCAN EN COURS...*\n\n🔲 Recherche: _${target}_\n⏳ Veuillez patienter...`,
        `🔎 *SCAN EN COURS...*\n\n✅ Cible trouvée\n🔲 Identification du rôle...`,
        `🔎 *SCAN EN COURS...*\n\n✅ Cible trouvée\n✅ Rôle identifié\n🔲 Validation finale...`,
        `🔎 *SCAN EN COURS...*\n\n✅ Cible trouvée\n✅ Rôle identifié\n✅ Validation OK\n\n🎯 Résultats en cours...`,
        `✅ *SCAN TERMINÉ*\n\n✅ Cible trouvée\n✅ Rôle identifié\n✅ Validation OK\n\n🎯 *Résultats prêts !*`,
    ]

    const msg = await sock.sendMessage(sender, { text: steps[0] })

    for (let i = 1; i < steps.length; i++) {
        await delay(220)
        await sock.sendMessage(sender, {
            text: steps[i],
            edit: msg.key
        }).catch(() => {})
    }

    await delay(200)
    return msg.key
}

// ═══════════════════════════════════════════════════════
//  LOADER ACTION (KICK / BAN / PROMOTE / ETC.)
// ═══════════════════════════════════════════════════════
export async function showActionLoader(sock, sender, action = "ACTION", emoji = "⚡") {
    const msg = await sock.sendMessage(sender, {
        text:
            `╭━━━〔 ${emoji} *${action}* 〕━━━╮\n` +
            `┃\n` +
            `┃  ⏳ Traitement de la requête...\n` +
            `┃  🔄 Vérification des permissions...\n` +
            `┃\n` +
            `╰─────────────────────────────╯`
    })

    await delay(600)

    await sock.sendMessage(sender, {
        text:
            `╭━━━〔 ${emoji} *${action}* 〕━━━╮\n` +
            `┃\n` +
            `┃  🔄 Exécution en cours...\n` +
            `┃  ✅ Permissions validées\n` +
            `┃\n` +
            `╰─────────────────────────────╯`,
        edit: msg.key
    }).catch(() => {})

    await delay(400)
    return msg.key
}

// ═══════════════════════════════════════════════════════
//  SUPPRIMER UN LOADER
// ═══════════════════════════════════════════════════════
export async function deleteLoader(sock, sender, key) {
    if (!key) return
    await sock.sendMessage(sender, { delete: key }).catch(() => {})
}

// ═══════════════════════════════════════════════════════
//  UTILITAIRES EXPORTÉS
// ═══════════════════════════════════════════════════════
export function getProgressBar(percent, length = 10) {
    const filled = Math.round((percent / 100) * length)
    return "▓".repeat(filled) + "░".repeat(length - filled) + ` ${percent}%`
}

export function formatDate() {
    return new Date().toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'long', year: 'numeric'
    })
}

export function formatTime() {
    return new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
}

export { delay }
