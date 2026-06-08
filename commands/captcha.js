// commands/captcha.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  VÉRIFICATION ANTI-BOT À L'ENTRÉE DU GROUPE         ║
// ║  Calcul mathématique ou question aléatoire          ║
// ║  Nouveau membre doit répondre en 60s sinon kick     ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { isOwner, isSudo, cleanNumber } from '../lib/ownerSystem.js'
import { groupSettingsDb } from '../lib/database.js'

// ── Store en mémoire des vérifications en cours ─────────
// { [groupId_jid]: { answer, timer, joinTime } }
const pending = new Map()

// ── Questions mathématiques aléatoires ──────────────────
function makeChallenge() {
  const ops = [
    () => { const a = Math.floor(Math.random()*20)+1; const b = Math.floor(Math.random()*20)+1; return { q: `${a} + ${b}`, a: a+b } },
    () => { const a = Math.floor(Math.random()*20)+10; const b = Math.floor(Math.random()*10)+1; return { q: `${a} - ${b}`, a: a-b } },
    () => { const a = Math.floor(Math.random()*10)+2; const b = Math.floor(Math.random()*10)+2; return { q: `${a} × ${b}`, a: a*b } },
    () => { const b = [2,3,4,5,6,7,8,9,10][Math.floor(Math.random()*9)]; const a = b*(Math.floor(Math.random()*9)+2); return { q: `${a} ÷ ${b}`, a: a/b } },
  ]
  return ops[Math.floor(Math.random()*ops.length)]()
}

// ── Appelé par index.js lors d'un join de groupe ────────
export async function handleCaptchaJoin(sock, groupId, participantJid) {
  const settings = groupSettingsDb.get(groupId)
  if (!settings.captcha?.enabled) return false

  const key      = `${groupId}_${participantJid}`
  const { q, a } = makeChallenge()
  const timeout  = 60 // secondes

  // Kick si pas de réponse dans les temps
  const timer = setTimeout(async () => {
    if (pending.has(key)) {
      pending.delete(key)
      try {
        await sock.groupParticipantsUpdate(groupId, [participantJid], 'remove')
        await sock.sendMessage(groupId, {
          text:
            `☩━━━〔 🛡️ *CAPTCHA ÉCHOUÉ* 〕━━━☩\n` +
            `☠\n` +
            `⛧  @${cleanNumber(participantJid)} a été expulsé automatiquement.\n` +
            `☩  Raison: temps de vérification dépassé (${timeout}s).\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
          mentions: [participantJid]
        }).catch(() => {})
      } catch { /* bot pas admin */ }
    }
  }, timeout * 1000)

  pending.set(key, { answer: a, timer, groupId, participantJid })

  await sock.sendMessage(groupId, {
    text:
      `☩━━━〔 🛡️ *VÉRIFICATION ANTI-BOT* 〕━━━☩\n` +
      `☠\n` +
      `⛧  Salut @${cleanNumber(participantJid)} ! 👋\n` +
      `☠\n` +
      `☩  Réponds à cette question en ${timeout}s\n` +
      `✝  ou tu seras automatiquement expulsé.\n` +
      `☠\n` +
      `⛧  🧮 *Calcule:*\n` +
      `☩  ┌─────────────────┐\n` +
      `✝  │   *${q} = ?*   │\n` +
      `☠  └─────────────────┘\n` +
      `☠\n` +
      `⛧  Tape juste le résultat (ex: 42)\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions: [participantJid]
  }).catch(() => {})

  return true
}

// ── Vérifie réponse d'un message entrant ────────────────
export async function checkCaptchaAnswer(sock, groupId, senderJid, text) {
  const key = `${groupId}_${senderJid}`
  if (!pending.has(key)) return false

  const { answer, timer } = pending.get(key)
  const cleaned = text.trim().replace(/[^0-9\-]/g, '')
  const num     = parseInt(cleaned)

  if (isNaN(num)) return true // mauvais format → ignore mais reste en attente

  clearTimeout(timer)
  pending.delete(key)

  if (num === answer) {
    await sock.sendMessage(groupId, {
      text:
        `☩━━━〔 ✅ *VÉRIFICATION RÉUSSIE* 〕━━━☩\n` +
        `☠\n` +
        `⛧  ✅ @${cleanNumber(senderJid)} est *vérifié* !\n` +
        `☩  Bienvenue dans le groupe 🎉\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      mentions: [senderJid]
    }).catch(() => {})
  } else {
    try {
      await sock.groupParticipantsUpdate(groupId, [senderJid], 'remove')
      await sock.sendMessage(groupId, {
        text:
          `☩━━━〔 ❌ *CAPTCHA RATÉ* 〕━━━☩\n` +
          `☠\n` +
          `⛧  @${cleanNumber(senderJid)} a donné une mauvaise réponse.\n` +
          `☩  Expulsé automatiquement. 🚪\n` +
          `☠\n` +
          `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        mentions: [senderJid]
      }).catch(() => {})
    } catch { /* bot pas admin */ }
  }
  return true
}

// ── Commande principale ──────────────────────────────────
export default async function captcha(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'

  if (!sender.endsWith('@g.us')) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  Commande groupe uniquement.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const canUse = isOwner(senderJid) || isSudo(senderJid) || ctx?.isAdmin
  if (!canUse) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ACCÈS REFUSÉ* 〕━━━☩\n☠\n⛧  🔒 Réservé aux admins, Owner et Sudos.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const sub      = args[0]?.toLowerCase()
  const settings = groupSettingsDb.get(sender)
  const cfg      = settings.captcha || {}

  if (sub === 'on') {
    groupSettingsDb.update(sender, { captcha: { ...cfg, enabled: true } })
    return await sendMessage(sock, sender,
      `☩━━━〔 🛡️ *CAPTCHA ACTIVÉ* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ✅ Vérification anti-bot *activée* !\n` +
      `☠\n` +
      `☩  Chaque nouveau membre devra résoudre\n` +
      `✝  un calcul mathématique en 60 secondes.\n` +
      `☠  En cas d'échec → expulsion automatique.\n` +
      `☠\n` +
      `⛧  ⚠️ Le bot doit être *admin* du groupe.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'off') {
    groupSettingsDb.update(sender, { captcha: { ...cfg, enabled: false } })
    return await sendMessage(sock, sender,
      `☩━━━〔 🛡️ *CAPTCHA DÉSACTIVÉ* 〕━━━☩\n☠\n⛧  ❌ Vérification anti-bot désactivée.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // Statut
  const status = cfg.enabled ? '🟢 *ACTIVÉ*' : '🔴 *DÉSACTIVÉ*'
  const pendingCount = [...pending.keys()].filter(k => k.startsWith(sender + '_')).length

  await sendMessage(sock, sender,
    `☩━━━〔 🛡️ *CAPTCHA ANTI-BOT* 〕━━━☩\n` +
    `☠\n` +
    `⛧  📊 *Statut:* ${status}\n` +
    `☩  ⏳ *En attente:* ${pendingCount} membre(s)\n` +
    `☠\n` +
    `✝  *Commandes:*\n` +
    `☠  ${prefix}captcha on  → Activer\n` +
    `⛧  ${prefix}captcha off → Désactiver\n` +
    `☠\n` +
    `☩  ℹ️ *Fonctionnement:*\n` +
    `✝  Chaque nouveau membre reçoit un calcul\n` +
    `☠  mathématique. 60s pour répondre, sinon\n` +
    `⛧  il est automatiquement expulsé.\n` +
    `☠\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
