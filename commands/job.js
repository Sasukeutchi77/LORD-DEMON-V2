// commands/job.js — MÉTIERS 💼
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb, JOBS } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.join(__dirname, '..', 'data', 'demon.db'))

export default async function job(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()
  const now = Date.now()

  if (!sub || sub === 'liste' || sub === 'list') {
    const lines = Object.entries(JOBS).map(([id, j]) =>
      `${j.emoji} \`${id}\` — *${j.name}*\n   └ 💰 ${j.base}🪙 | ⏱️ ${j.cooldown/3600}h | ${j.desc}`
    ).join('\n\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   💼 *MÉTIERS DISPONIBLES*       ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines}\n\n` +
      `💡 \`.job choisir <métier>\` pour choisir\n` +
      `⚡ \`.job travailler\` pour gagner des 🪙\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }

  if (sub === 'choisir' || sub === 'choose') {
    const jobId = args[1]?.toLowerCase()
    if (!JOBS[jobId]) return sendMessage(sock, sender, `☠ Métier *${jobId}* inconnu. Voir \`.job liste\``)
    economyDb.setJob(jid, jobId)
    const j = JOBS[jobId]
    return sendMessage(sock, sender,
      `✅ *Nouveau métier !*\n${j.emoji} Vous êtes maintenant *${j.name}* !\n💡 Tapez \`.job travailler\` pour gagner des 🪙`
    )
  }

  if (sub === 'travailler' || sub === 'work' || sub === 'boulot') {
    const e = economyDb.ensure(jid)
    if (!e.job) return sendMessage(sock, sender, `☠ Choisissez d'abord un métier avec \`.job choisir <métier>\``)
    const j = JOBS[e.job]
    if (!j) return sendMessage(sock, sender, `☠ Métier invalide.`)
    const lastWork = e.last_work || 0
    const cooldownMs = j.cooldown * 1000
    if (now - lastWork < cooldownMs) {
      const reste = Math.ceil((cooldownMs - (now - lastWork)) / 60000)
      return sendMessage(sock, sender,
        `⏳ *Déjà travaillé !*\n⏱️ Prochaine session dans *${reste} minutes*`
      )
    }
    const bonus = 1 + Math.min((e.job_xp || 0) / 1000, 1)
    const earned = Math.floor((j.base + Math.random() * j.base * 0.5) * bonus)
    economyDb.addCoins(jid, earned)
    db.prepare(`UPDATE economy SET last_work = ?, job_xp = job_xp + 10 WHERE jid = ?`).run(now, jid)
    const events = [
      `Vous avez miné des cristaux précieux !`,
      `Une mission risquée, mais lucrative !`,
      `Une journée de travail intense mais payante !`,
      `Votre expertise vous a valu un bonus !`,
      `Le client était satisfait — il a payé double !`,
    ]
    const event = events[Math.floor(Math.random() * events.length)]
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ${j.emoji} *TRAVAIL TERMINÉ !*          ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `📖 ${event}\n\n` +
      `💰 Salaire: *+${earned} 🪙*\n` +
      `🎓 Métier XP: +10 (${e.job_xp + 10})\n` +
      `⏱️ Prochain travail dans *${j.cooldown/3600}h*\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }

  await sendMessage(sock, sender, `☠ Sous-commande inconnue. Tapez \`.job\` pour l'aide.`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}