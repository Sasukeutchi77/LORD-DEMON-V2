// lib/xpSystem.js — LORD DEMON V2
// Système XP enrichi : badges, récompenses niveau, classement hebdo

import { userDb } from './database.js'
import { cleanNumber } from './ownerSystem.js'

// ══════════════════════════════════════════════════
// CONFIGURATION XP
// ══════════════════════════════════════════════════

export const XP_CONFIG = {
  message:  2,      // XP par message normal
  command:  1,      // XP par commande utilisée
  daily:    50,     // XP bonus daily
  sticker:  1,
  media:    3,
  cooldown: 10000   // 10s entre gains XP (anti-spam)
}

const xpCooldowns = new Map()

// ══════════════════════════════════════════════════
// BADGES DISPONIBLES
// ══════════════════════════════════════════════════

export const BADGES = {
  // Niveaux
  '🌱 Nouveau':      { trigger: 'level', value: 1,   desc: 'Premier pas dans le cercle' },
  '⚡ Actif':        { trigger: 'level', value: 5,   desc: 'Niveau 5 atteint' },
  '🔥 Enflammé':     { trigger: 'level', value: 10,  desc: 'Niveau 10 atteint' },
  '💎 Diamant':      { trigger: 'level', value: 20,  desc: 'Niveau 20 atteint' },
  '👑 Légende':      { trigger: 'level', value: 50,  desc: 'Niveau 50 atteint' },
  '⛧ Démon':        { trigger: 'level', value: 100, desc: 'Niveau 100 — Rang Démon' },

  // Messages
  '💬 Bavard':       { trigger: 'messages', value: 100,  desc: '100 messages envoyés' },
  '🗣️ Orateur':     { trigger: 'messages', value: 500,  desc: '500 messages envoyés' },
  '📢 Vocal':       { trigger: 'messages', value: 1000, desc: '1000 messages envoyés' },

  // Spéciaux
  '🌙 Noctambule':   { trigger: 'special', desc: 'Actif après minuit' },
  '⚔️ Guerrier':    { trigger: 'special', desc: 'Survécu à un anti-raid' },
  '🏆 Champion':     { trigger: 'tournament', desc: 'Vainqueur de tournoi' },
  '🎯 Précis':       { trigger: 'special', desc: '10 quiz réussis' },
}

// ══════════════════════════════════════════════════
// NIVEAU & CALCUL XP
// ══════════════════════════════════════════════════

export function getLevel(xp) {
  return Math.floor(Math.sqrt((xp || 0) / 10)) + 1
}

export function getXpForLevel(level) {
  return ((level - 1) ** 2) * 10
}

export function getXpBar(xp, length = 12) {
  const level    = getLevel(xp)
  const xpStart  = getXpForLevel(level)
  const xpEnd    = getXpForLevel(level + 1)
  const progress = xpEnd === xpStart ? length : Math.min(
    Math.round(((xp - xpStart) / (xpEnd - xpStart)) * length), length
  )
  return '█'.repeat(progress) + '░'.repeat(length - progress)
}

export function getLevelEmoji(level) {
  if (level >= 100) return '⛧'
  if (level >= 50)  return '👑'
  if (level >= 20)  return '💎'
  if (level >= 10)  return '🔥'
  if (level >= 5)   return '⚡'
  return '🌱'
}

// ══════════════════════════════════════════════════
// GAIN XP
// ══════════════════════════════════════════════════

export function giveXp(jid, type = 'message') {
  const now   = Date.now()
  const last  = xpCooldowns.get(jid) || 0
  if (now - last < XP_CONFIG.cooldown) return null

  xpCooldowns.set(jid, now)

  const amount  = XP_CONFIG[type] || XP_CONFIG.message
  const before  = userDb.get(jid)
  const lvlBefore = getLevel(before?.xp || 0)

  const after   = userDb.addXp(jid, amount)
  const lvlAfter = getLevel(after?.xp || 0)

  // Vérifier level-up
  const levelUp = lvlAfter > lvlBefore ? lvlAfter : null

  // Attribuer badges si niveau atteint
  if (levelUp) {
    checkAndAwardBadges(jid, after)
  }

  return { xp: after?.xp || 0, level: lvlAfter, levelUp, xpGained: amount }
}

// ══════════════════════════════════════════════════
// BADGES
// ══════════════════════════════════════════════════

export function checkAndAwardBadges(jid, user) {
  if (!user) return []
  const newBadges = []
  const level     = getLevel(user.xp || 0)
  const msgs      = user.msg_count || 0

  for (const [badge, config] of Object.entries(BADGES)) {
    if (config.trigger === 'level' && level >= config.value) {
      const current = userDb.getBadges(jid)
      if (!current.includes(badge)) {
        userDb.addBadge(jid, badge)
        newBadges.push(badge)
      }
    }
    if (config.trigger === 'messages' && msgs >= config.value) {
      const current = userDb.getBadges(jid)
      if (!current.includes(badge)) {
        userDb.addBadge(jid, badge)
        newBadges.push(badge)
      }
    }
  }

  return newBadges
}

export function awardSpecialBadge(jid, badgeName) {
  if (!BADGES[badgeName]) return false
  userDb.addBadge(jid, badgeName)
  return true
}

// ══════════════════════════════════════════════════
// CLASSEMENT
// ══════════════════════════════════════════════════

export function formatLeaderboard(users, title = '🏆 TOP 10') {
  const medals = ['🥇', '🥈', '🥉']
  let text = `╭━━━〔 ${title} 〕━━━╮\n\n`

  users.forEach((u, i) => {
    const lvl    = getLevel(u.xp || 0)
    const emoji  = medals[i] || `${i + 1}.`
    const num    = cleanNumber(u.jid)
    text += `┃ ${emoji} @${num}\n`
    text += `┃    ⭐ Niv.${lvl} • ${u.xp || 0} XP\n`
    if (i < users.length - 1) text += `┃\n`
  })

  text += `\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
  return text
}

export function formatProfile(jid, user) {
  if (!user) {
    return `☠ Profil introuvable pour @${cleanNumber(jid)}`
  }

  const xp      = user.xp || 0
  const level   = getLevel(xp)
  const xpNext  = getXpForLevel(level + 1)
  const badges  = JSON.parse(user.badges || '[]')
  const lvlEmoji = getLevelEmoji(level)

  return (
    `╭━━━〔 👤 *PROFIL* 〕━━━╮\n\n` +
    `┃ 📱 @${cleanNumber(jid)}\n` +
    `┃\n` +
    `┃ ${lvlEmoji} *Niveau :* ${level}\n` +
    `┃ ✨ *XP :* ${xp} / ${xpNext}\n` +
    `┃ ${getXpBar(xp)}\n` +
    `┃\n` +
    `┃ 💬 *Messages :* ${user.msg_count || 0}\n` +
    `┃ 📅 *Inscription :* ${new Date(user.registered || Date.now()).toLocaleDateString('fr-FR')}\n` +
    `┃\n` +
    `┃ 🏅 *Badges (${badges.length}) :*\n` +
    (badges.length
      ? badges.map(b => `┃  ${b}`).join('\n')
      : `┃  _Aucun badge pour l'instant_`
    ) +
    `\n\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
  )
}
