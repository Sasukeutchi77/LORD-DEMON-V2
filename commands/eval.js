// commands/eval.js — VERSION CORRIGÉE — BRANCHÉ SUR ownerHelper.js
// ✅ FIX: isOwner() lit DIRECTEMENT .env via ownerHelper
// ✅ FIX: getSenderJid() résolution robuste

import { sendMessage } from "../lib/sendMessage.js"
import { getSenderJid, isOwner, isSudo } from '../lib/ownerSystem.js'

export default async function evalCmd(sock, sender, args, msg) {
    try {
        const userId = getSenderJid(msg, sock)

        if (process.env.ENABLE_EVAL !== "true") {
            await sendMessage(sock, sender, "Eval est désactivé par défaut dans LORD DEMON V2. Active ENABLE_EVAL=true uniquement si nécessaire.")
            return
        }

        if (!isOwner(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Seul le *MAÎTRE* peut exécuter\n` +
                `☩    du code.\n\n` +
                `✝ 📱 Votre numéro: \`${userId.split('@')[0]}\`\n\n` +
                `☠ 💡 Vérifiez OWNER_NUMBER dans .env\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        const code = args.join(" ")
        if (!code) {
            await sendMessage(sock, sender, "☠ invocation: `.eval <code JavaScript>`\n\nExemple: `.eval return 1+1`")
            return
        }

        await sendMessage(sock, sender, "⏳ *Exécution en cours...*")

        let result
        const start = Date.now()
        try {
            result = await eval(`(async () => { ${code} })()`)
        } catch (err) {
            result = `☠ rituel échoué d'exécution: ${err.message}\n${err.stack || ''}`
        }

        const time = Date.now() - start

        let output
        if (result === undefined)      output = "undefined"
        else if (result === null)      output = "null"
        else if (typeof result === 'object') {
            try { output = JSON.stringify(result, null, 2) } catch { output = String(result) }
        } else {
            output = String(result)
        }

        if (output.length > 4000) output = output.substring(0, 4000) + "\n\n... (tronqué)"

        const roleTag = '👑 OWNER'

        await sendMessage(sock, sender,
            `☩━━━〔 📊 *RÉSULTAT EVAL* 〕━━━☩\n` +
            `⛧ ⏱️ Temps: ${time}ms | ${roleTag}\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            "```javascript\n" + output + "\n```"
        )

    } catch (e) {
        await sendMessage(sock, sender,
            `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
            `☩ ${e.message}\n\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
    }
}
