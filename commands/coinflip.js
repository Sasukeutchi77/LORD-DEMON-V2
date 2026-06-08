// commands/coinflip.js — PILE OU FACE 🪙
// commands/rps.js — PIERRE FEUILLE CISEAUX ✊
// ✅ Jeux fun rapides

import { sendMessage } from '../lib/sendMessage.js'

// ─── PILE OU FACE ─────────────────────────────────────────────────────────────
export async function coinflip(sock, sender, args, msg) {
    try {
        const sides = ['🪙 *PILE !*', '🔰 *FACE !*']
        const result = sides[Math.floor(Math.random() * 2)]

        const frames = ['🌀 Lancer...', '🌀🌀 En l\'air...', '💫 Retombe...', result]

        let msgKey = null
        for (let i = 0; i < frames.length; i++) {
            const text =
                `☩━━━〔 🪙 *COIN FLIP* 〕━━━☩\n` +
                `☠\n` +
                `⛧  ${frames[i]}\n` +
                `☠\n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

            if (i === 0) {
                const sent = await sock.sendMessage(sender, { text })
                msgKey = sent.key
            } else {
                await new Promise(r => setTimeout(r, 500))
                await sock.sendMessage(sender, { text, edit: msgKey }).catch(() => {})
            }
        }
    } catch (error) {
        await sendMessage(sock, sender, `☠ rituel échoué coinflip: ${error.message}`)
    }
}

export default coinflip
