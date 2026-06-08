// commands/work.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
import { cleanNumber } from '../lib/ownerSystem.js'

const JOBS = [
  { name: 'Hacker', emoji: '💻', desc: 'tu as piraté un serveur', min: 150, max: 300 },
  { name: 'Dealer', emoji: '💊', desc: 'tu as vendu de la marchandise', min: 100, max: 250 },
  { name: 'Mercenaire', emoji: '⚔️', desc: 'tu as accompli une mission', min: 120, max: 280 },
  { name: 'Braqueur', emoji: '🔫', desc: 'tu as braqué une banque', min: 80, max: 350 },
  { name: 'Trader', emoji: '📈', desc: 'tu as fait une bonne trade', min: 50, max: 400 },
  { name: 'Développeur', emoji: '🧑‍💻', desc: 'tu as livré un projet', min: 100, max: 300 },
  { name: 'Streameur', emoji: '🎮', desc: 'tu as streamé toute la nuit', min: 60, max: 200 },
  { name: 'Artiste', emoji: '🎨', desc: 'tu as vendu une œuvre', min: 50, max: 350 },
  { name: 'Livreur', emoji: '🛵', desc: 'tu as fait des livraisons', min: 50, max: 150 },
  { name: 'Influenceur', emoji: '📱', desc: 'un post a explosé', min: 80, max: 250 },
  { name: 'Espion', emoji: '🕵️', desc: 'tu as vendu des infos classifiées', min: 120, max: 320 },
  { name: 'Mineur crypto', emoji: '⛏️', desc: 'tu as miné des coins', min: 70, max: 280 },
]

export default async function work(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const user      = ecoDb.ensure(senderJid)
  const now       = Date.now()
  const cooldown  = ECONOMY.WORK_COOLDOWN
  const elapsed   = now - (user.last_work || 0)

  if (elapsed < cooldown) {
    const remaining = cooldown - elapsed
    const m = Math.floor(remaining / 60000)
    const s = Math.floor((remaining % 60000) / 1000)
    return await sendMessage(sock, sender,
      `☩━━━〔 💼 *TRAVAIL* 〕━━━☩\n` +
      `☠\n` +
      `⛧  😴 Tu es fatigué ! Repose-toi.\n` +
      `☠  ⏳ Disponible dans: *${m}m ${s}s*\n` +
      `☠\n` +
      `⛧  💰 Poche: *${user.coins} ${ECONOMY.SYMBOL}*\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '💼 AU TRAVAIL...')
    const job    = JOBS[Math.floor(Math.random() * JOBS.length)]
    const earned = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min
    const streak = (user.work_streak || 0) + 1
    const bonus  = streak >= 7 ? Math.floor(earned * 0.3) : streak >= 3 ? Math.floor(earned * 0.1) : 0
    const total  = earned + bonus

    ecoDb.setWork(senderJid, streak)
    ecoDb.addCoins(senderJid, total, `work: ${job.name}`)
    const updated = ecoDb.get(senderJid)

    await deleteLoader(sock, sender, loadKey); loadKey = null
    await sendMessage(sock, sender,
      `☩━━━〔 💼 *TRAVAIL ACCOMPLI* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ${job.emoji} *${job.name}*\n` +
      `☩  _"${job.desc}"_\n` +
      `☠\n` +
      `✝  💵 *Gagné:* +${earned} ${ECONOMY.SYMBOL}\n` +
      (bonus > 0 ? `☠  🔥 *Bonus streak:* +${bonus} ${ECONOMY.SYMBOL}\n⛧  *Total:* +${total} ${ECONOMY.SYMBOL}\n` : '') +
      `☠\n` +
      `☩  🔥 *Streak:* ${streak} jour(s)\n` +
      `✝  💰 *Poche:* ${updated.coins} ${ECONOMY.SYMBOL}\n` +
      `☠  🏦 *Banque:* ${updated.bank} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `⛧  ⏰ Retravaile dans 30 min\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  } catch(e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender, `☩━━━〔 ☠ *ERREUR TRAVAIL* 〕━━━☩\n☠\n⛧  ${e.message.slice(0,100)}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
