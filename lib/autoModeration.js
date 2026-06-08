// lib/autoModeration.js — LORD DEMON V2
// Modération automatique avancée : toxicité, patterns, NLP basique

import { groupSettingsDb } from './database.js'
import { cleanNumber } from './ownerSystem.js'

// ══════════════════════════════════════════════════
// DICTIONNAIRE DE TOXICITÉ (extensible)
// ══════════════════════════════════════════════════

const TOXIC_PATTERNS = [
  // Insultes communes (multilangue)
  /\b(nig+[ae]r|nigga|f+[ua]ck|shit|bitch|whore|salop[e]?|pute|connard|fdp|fils?\s*de\s*p[u]?te|va\s*te\s*faire|enculé|merde\s*à)\b/gi,
  // Menaces
  /\b(je\s*vais\s*te\s*(tuer|buter|dégommer)|t[e']?\s*(kill|dead))\b/gi,
  // Phishing / escroquerie
  /\b(envoy[e]?\s*\d+\s*(fcfa|xof|euros?|dollars?)|gagnez?\s*\d+\s*par\s*jour|investiss|pari[e]?s?\s*sportifs?|mise\s*\d+)\b/gi,
]

const SPAM_PATTERNS = [
  // Messages répétés (même texte >3 fois d'affilée) → géré par spamManager
  // Caps lock excessif
  { test: (t) => t.length > 10 && (t.replace(/[^A-Z]/g, '').length / t.replace(/\s/g, '').length) > 0.7, label: 'CAPS_LOCK' },
  // Trop d'émojis
  { test: (t) => (t.match(/[\u{1F300}-\u{1FAFF}]/gu) || []).length > 15, label: 'EMOJI_SPAM' },
  // Trop de caractères spéciaux
  { test: (t) => (t.match(/[!?]{4,}/g) || []).length > 0, label: 'CHAR_SPAM' },
]

// ══════════════════════════════════════════════════
// ANALYSE DE MESSAGE
// ══════════════════════════════════════════════════

export function analyzeMessage(text, groupId) {
  if (!text || typeof text !== 'string') return { ok: true }

  const settings = groupSettingsDb.get(groupId)
  const automod  = settings.automod || {}

  if (!automod.enabled) return { ok: true }

  const result = { ok: true, flags: [] }

  // 1. Vérification toxicité
  if (automod.antiToxic !== false) {
    for (const pattern of TOXIC_PATTERNS) {
      if (pattern.test(text)) {
        result.ok    = false
        result.flags.push('TOXIC')
        result.action = automod.toxicAction || 'warn'
        result.reason = '🚫 Message toxique détecté'
        break
      }
    }
    // Reset lastIndex des regex globaux
    TOXIC_PATTERNS.forEach(p => p.lastIndex = 0)
  }

  // 2. Vérification spam patterns
  if (automod.antiSpamPatterns !== false && result.ok) {
    for (const p of SPAM_PATTERNS) {
      if (p.test(text)) {
        result.ok    = false
        result.flags.push(p.label)
        result.action = 'delete'
        result.reason = `⚠️ Pattern spam : ${p.label}`
        break
      }
    }
  }

  // 3. Mots personnalisés bannis
  if (automod.bannedWords?.length && result.ok) {
    const lower = text.toLowerCase()
    const found = automod.bannedWords.find(w => lower.includes(w.toLowerCase()))
    if (found) {
      result.ok    = false
      result.flags.push('BANNED_WORD')
      result.action = automod.bannedWordAction || 'warn'
      result.reason = `🔇 Mot interdit : "${found}"`
    }
  }

  return result
}

// ══════════════════════════════════════════════════
// CONFIG AUTOMOD PAR GROUPE
// ══════════════════════════════════════════════════

export function enableAutoMod(groupId, options = {}) {
  const current = groupSettingsDb.get(groupId)
  groupSettingsDb.set(groupId, {
    ...current,
    automod: {
      enabled: true,
      antiToxic: true,
      antiSpamPatterns: true,
      toxicAction: 'warn',
      bannedWords: [],
      bannedWordAction: 'warn',
      ...current.automod,
      ...options
    }
  })
}

export function disableAutoMod(groupId) {
  const current = groupSettingsDb.get(groupId)
  groupSettingsDb.set(groupId, {
    ...current,
    automod: { ...(current.automod || {}), enabled: false }
  })
}

export function getAutoModConfig(groupId) {
  return groupSettingsDb.get(groupId)?.automod || { enabled: false }
}

export function addBannedWord(groupId, word) {
  const current = groupSettingsDb.get(groupId)
  const automod = current.automod || {}
  const words   = automod.bannedWords || []
  if (!words.includes(word.toLowerCase())) words.push(word.toLowerCase())
  groupSettingsDb.set(groupId, { ...current, automod: { ...automod, bannedWords: words } })
}

export function removeBannedWord(groupId, word) {
  const current = groupSettingsDb.get(groupId)
  const automod = current.automod || {}
  const words   = (automod.bannedWords || []).filter(w => w !== word.toLowerCase())
  groupSettingsDb.set(groupId, { ...current, automod: { ...automod, bannedWords: words } })
}

export function formatAutoModStatus(groupId) {
  const cfg = getAutoModConfig(groupId)
  const status = cfg.enabled ? '🟢 Activé' : '🔴 Désactivé'
  return (
    `╭━━━〔 🛡️ *AUTO-MODÉRATION* 〕━━━╮\n\n` +
    `┃ 📊 *Statut :* ${status}\n` +
    `┃ ☠️ *Anti-toxique :* ${cfg.antiToxic !== false ? '✅' : '❌'}\n` +
    `┃ 🔇 *Anti-spam patterns :* ${cfg.antiSpamPatterns !== false ? '✅' : '❌'}\n` +
    `┃ 📝 *Mots interdits :* ${(cfg.bannedWords || []).length}\n` +
    `┃    ${(cfg.bannedWords || []).length ? cfg.bannedWords.join(', ') : '_aucun_'}\n` +
    `┃\n` +
    `┃ ⚡ *Action toxicité :* ${cfg.toxicAction || 'warn'}\n` +
    `┃ ⚡ *Action mot interdit :* ${cfg.bannedWordAction || 'warn'}\n\n` +
    `╰━━━━━━━━━━━━━━━━━━━━━━╯`
  )
}
