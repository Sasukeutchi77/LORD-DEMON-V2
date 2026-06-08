// commands/exec.js — VERSION CORRIGÉE — BRANCHÉ SUR ownerHelper.js
// ✅ FIX: isOwner() lit DIRECTEMENT .env via ownerHelper
// ✅ FIX: getSenderJid() résolution robuste

import { sendMessage } from "../lib/sendMessage.js"
import { exec } from "child_process"
import { promisify } from "util"
import { getSenderJid, isOwner, isSudo } from '../lib/ownerSystem.js'

const execAsync = promisify(exec)

export default async function execCmd(sock, sender, args, msg) {
    try {
        const userId = getSenderJid(msg, sock)

        if (process.env.ENABLE_EXEC !== "true") {
            await sendMessage(sock, sender, "Exec est désactivé par défaut dans LORD DEMON V2. Active ENABLE_EXEC=true uniquement si nécessaire.")
            return
        }

        if (!isOwner(userId)) {
            await sendMessage(sock, sender,
                `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n` +
                `⛧ 🔒 Seul le *MAÎTRE* peut exécuter\n` +
                `☩    des sorts système.\n\n` +
                `✝ 📱 Votre numéro: \`${userId.split('@')[0]}\`\n\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
            return
        }

        const command = args.join(" ")
        if (!command) {
            await sendMessage(sock, sender, "☠ invocation: `.exec <sort shell>`\n\nExemple: `.exec ls -la`")
            return
        }

        await sendMessage(sock, sender, "⏳ *Exécution...*")

        const start = Date.now()
        try {
            const { stdout, stderr } = await execAsync(command, { timeout: 30000 })
            const time = Date.now() - start
            let output = stdout || stderr || "🩸 Pas de sortie (succès)"
            if (output.length > 4000) output = output.substring(0, 4000) + "\n\n... (tronqué)"

            const roleTag = '👑 OWNER'

            await sendMessage(sock, sender,
                `☩━━━〔 💻 *EXEC* 〕━━━☩\n` +
                `☠ ⏱️ Temps: ${time}ms | ${roleTag}\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                "```bash\n$ " + command + "\n\n" + output + "\n```"
            )
        } catch (err) {
            await sendMessage(sock, sender,
                `☩━━━〔 ☠ *RITUEL ÉCHOUÉ EXEC* 〕━━━☩\n\n` +
                `⛧ sort: \`${command}\`\n\n` +
                "```\n" + err.message + "\n```\n\n" +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
            )
        }

    } catch (e) {
        await sendMessage(sock, sender, "☠ rituel échoué: " + e.message)
    }
}
