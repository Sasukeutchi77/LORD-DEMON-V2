// commands/jackpot2.js — MACHINE À SOUS AVEC ÉCONOMIE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const SYMBOLES = [
  { nom: '⛧ Démon',   val: 6, rare: 3  },
  { nom: '☠ Crâne',   val: 5, rare: 6  },
  { nom: '💀 Mort',   val: 4, rare: 10 },
  { nom: '🔮 Orbe',   val: 3, rare: 15 },
  { nom: '🩸 Sang',   val: 2, rare: 20 },
  { nom: '🌑 Lune',   val: 2, rare: 20 },
  { nom: '⚔️ Épée',   val: 1, rare: 26 },
]
const cooldowns = new Map()

function tirerSymbole() {
  const total = SYMBOLES.reduce((s, x) => s + x.rare, 0)
  let r = Math.random() * total, acc = 0
  for (const s of SYMBOLES) { acc += s.rare; if (r < acc) return s }
  return SYMBOLES[SYMBOLES.length - 1]
}

export default async function cmd_jackpot2(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if (now - (cooldowns.get(jid) || 0) < 10000)
      return sendMessage(sock, sender, `⏳ Cooldown: ${Math.ceil((10000-(now-(cooldowns.get(jid)||0)))/1000)}s avant de rejouer`)
    cooldowns.set(jid, now)

    const mise = Math.max(10, Math.min(500, parseInt(args[0]) || 50))

    // Vérifier fonds
    let userCoins = 9999
    try { if (economyDb) { const u = economyDb.ensure ? economyDb.ensure(jid) : economyDb.get(jid); if (u) userCoins = u.coins } } catch {}
    if (userCoins < mise) return sendMessage(sock, sender, `☠ Fonds insuffisants ! Vous avez *${userCoins}* 🪙 mais misez *${mise}* 🪙`)

    const rouleaux = [tirerSymbole(), tirerSymbole(), tirerSymbole()]
    const ligne = rouleaux.map(s => s.nom).join('  |  ')

    let gain = 0, resultatTxt = ''
    if (rouleaux[0].nom === rouleaux[1].nom && rouleaux[1].nom === rouleaux[2].nom) {
      // Jackpot total
      const mult = rouleaux[0].val * 10
      gain = mise * mult
      resultatTxt = `🎰 *JACKPOT DÉMONIAQUE !* ×${mult}\n✅ Gain : *+${gain}* 🪙`
    } else if (rouleaux[0].nom === rouleaux[1].nom || rouleaux[1].nom === rouleaux[2].nom || rouleaux[0].nom === rouleaux[2].nom) {
      // Paire
      const sym = rouleaux[0].nom === rouleaux[1].nom ? rouleaux[0] : rouleaux[2].nom === rouleaux[1].nom ? rouleaux[1] : rouleaux[0]
      gain = Math.floor(mise * sym.val * 0.8)
      resultatTxt = `✨ *PAIRE !* ×${sym.val * 0.8}\n✅ Gain : *+${gain}* 🪙`
    } else {
      gain = -mise
      resultatTxt = `❌ *PERDU !* -${mise} 🪙`
    }

    try {
      if (economyDb) {
        if (gain > 0) economyDb.addCoins ? economyDb.addCoins(jid, gain) : null
        else if (gain < 0) economyDb.removeCoins ? economyDb.removeCoins(jid, mise) : null
      }
    } catch {}

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎰 *MACHINE INFERNALE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `💰 Mise : *${mise}* 🪙\n\n` +
      `┌──────────────────────────┐\n` +
      `│  ${ligne}  │\n` +
      `└──────────────────────────┘\n\n` +
      `${resultatTxt}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Usage: \`.jackpot2 <mise>\` (10-500 🪙) ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
