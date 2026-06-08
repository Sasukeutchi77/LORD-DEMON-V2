// lib/antiRaid.js — LORD DEMON V2 (VERSION AMÉLIORÉE)
// Anti-raid intelligent : détection par pattern, blacklist globale, rapport enrichi

import { config } from '../config.js'
import { cleanNumber, isSuperAdmin, matchJid } from './ownerSystem.js'
import { getGroupConfig, updateGroupConfig } from './groupConfig.js'
import { globalBlacklist } from './database.js'
import { dispatchWebhook } from './webhookManager.js'
import { awardSpecialBadge } from './xpSystem.js'

const raidWindows  = new Map()
const reopenTimers = new Map()
const raidHistory  = new Map() // groupId → array of raid events

function getOwnerJid() {
  const num = String(config.ownerNumber || process.env.OWNER_NUMBER || '').replace(/[^0-9]/g, '')
  return num.length >= 7 ? `${num}@s.whatsapp.net` : null
}

function isBotAdmin(meta, botId) {
  return Boolean(meta?.participants?.some(p => matchJid(p.id, botId || '') && p.admin))
}

function rememberJoins(groupId, participants, windowMs) {
  const now     = Date.now()
  const current = raidWindows.get(groupId) || []
  const fresh   = current.filter(entry => now - entry.ts <= windowMs)
  for (const jid of participants) fresh.push({ jid, ts: now })
  raidWindows.set(groupId, fresh)
  return fresh
}

// ── Analyse de pattern (comptes récents = chiffres longs sans nom) ──
function isSuspiciousAccount(jid) {
  const num = jid.replace('@s.whatsapp.net', '').replace('@lid', '')
  // Comptes avec numéros >14 chiffres = souvent des bots
  return num.length > 14
}

function classifyRaidSeverity(count, threshold) {
  if (count >= threshold * 3) return { level: '🔴 CRITIQUE', score: 3 }
  if (count >= threshold * 2) return { level: '🟠 ÉLEVÉ',   score: 2 }
  return                             { level: '🟡 MOYEN',    score: 1 }
}

async function scheduleUnlock(sock, groupId, raid) {
  if (!raid.lockDurationMs || raid.lockDurationMs < 30000) return
  if (reopenTimers.has(groupId)) clearTimeout(reopenTimers.get(groupId))
  const timer = setTimeout(async () => {
    try {
      const cfg = getGroupConfig(groupId)
      if (cfg.raid?.enabled) return
      await sock.groupSettingUpdate(groupId, 'not_announcement').catch(() => {})
      await sock.sendMessage(groupId, {
        text:
          `╭━━━〔 🛡️ *ANTI-RAID* 〕━━━╮\n\n` +
          `┃ ✅ Raid terminé : le groupe est rouvert.\n` +
          `┃ 🔓 Membres legítimes peuvent rejoindre.\n` +
          `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      }).catch(() => {})
    } finally {
      reopenTimers.delete(groupId)
    }
  }, raid.lockDurationMs)
  reopenTimers.set(groupId, timer)
}

async function sendOwnerReport(sock, groupId, groupName, report) {
  const ownerJid = getOwnerJid()
  if (!ownerJid) return
  const severity = classifyRaidSeverity(report.recentCount, report.threshold)
  await sock.sendMessage(ownerJid, {
    text:
      `╭━━━〔 🚨 *RAPPORT ANTI-RAID* 〕━━━╮\n\n` +
      `┃ 🏠 Groupe : *${groupName || groupId}*\n` +
      `┃ ⚠️ Sévérité : *${severity.level}*\n` +
      `┃ 👥 Entrées : *${report.recentCount}/${report.threshold}*\n` +
      `┃ 🔒 Verrouillé : ${report.locked ? '✅' : '❌'}\n` +
      `┃ 🚫 Expulsés : *${report.kicked.length}*\n` +
      `┃ 🕵️ Comptes suspects : *${report.suspiciousCount}*\n` +
      `┃ 🌐 Blacklistés (global) : *${report.blacklisted}*\n` +
      `┃ 🕐 Heure : ${new Date().toLocaleString('fr-FR')}\n\n` +
      `┃ 📋 Suspects :\n` +
      report.kicked.slice(0, 10).map(j => `┃ • +${cleanNumber(j)}`).join('\n') +
      `\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
  }).catch(() => {})
}

export async function handleAntiRaidParticipantUpdate(sock, event, meta = null, conf = null) {
  const { id: groupId, participants = [], action } = event || {}
  if (!groupId || action !== 'add' || !participants.length) return { triggered: false, kicked: [] }

  const cfg       = conf || getGroupConfig(groupId)
  const raid      = cfg.raid || {}
  const windowMs  = Math.max(5000, Number(raid.windowMs || 30000))
  const threshold = Math.max(2, Number(raid.joinThreshold || 5))
  const recent    = rememberJoins(groupId, participants, windowMs)

  // Vérifier blacklist globale sur les nouveaux arrivants
  const blacklistedJoins = participants.filter(j => globalBlacklist.isBlacklisted(j))

  const triggered = Boolean(raid.enabled || recent.length >= threshold || blacklistedJoins.length > 0)
  if (!triggered) return { triggered: false, kicked: [] }

  const now = Date.now()
  updateGroupConfig(groupId, current => {
    current.raid.lastTriggeredAt = now
    return current
  })

  const botAdmin   = isBotAdmin(meta, sock.user?.id)
  const groupName  = meta?.subject || 'Groupe'
  const kicked     = []
  let   locked     = false
  let   blacklisted = 0

  // ── Verrouillage automatique ──
  if (botAdmin && (raid.autoLock || raid.autoMute)) {
    await sock.groupSettingUpdate(groupId, 'announcement')
      .then(() => { locked = true }).catch(() => {})
    if (!raid.enabled) await scheduleUnlock(sock, groupId, raid)
  }

  // ── Expulsion des suspects ──
  if (botAdmin && raid.suspectKick) {
    const suspects = participants.filter(jid => !isSuperAdmin(jid))

    for (const jid of suspects) {
      try {
        await sock.groupParticipantsUpdate(groupId, [jid], 'remove')
        kicked.push(jid)

        // Ajouter à la blacklist globale si compte suspect
        if (isSuspiciousAccount(jid)) {
          globalBlacklist.add(jid, `Auto-blacklist: raid détecté dans ${groupName}`, 'BOT')
          blacklisted++
        }
      } catch {}
    }
  } else if (blacklistedJoins.length > 0 && botAdmin) {
    // Même sans suspectKick, expulser les blacklistés globaux
    for (const jid of blacklistedJoins) {
      try {
        await sock.groupParticipantsUpdate(groupId, [jid], 'remove')
        kicked.push(jid)
      } catch {}
    }
  }

  // ── Enregistrer dans l'historique ──
  const history = raidHistory.get(groupId) || []
  history.push({ ts: now, count: recent.length, kicked: kicked.length })
  if (history.length > 20) history.shift()
  raidHistory.set(groupId, history)

  // ── Récompenser les survivants légitimes ──
  const legitimateMembers = (meta?.participants || [])
    .filter(p => p.admin && !participants.includes(p.id))
    .map(p => p.id)
  for (const jid of legitimateMembers) {
    awardSpecialBadge(jid, '⚔️ Guerrier').catch?.(() => {})
  }

  const severity      = classifyRaidSeverity(recent.length, threshold)
  const suspiciousCount = participants.filter(isSuspiciousAccount).length

  const lastAlert = Number(raid.lastAlertAt || 0)
  if (now - lastAlert > 15000) {
    updateGroupConfig(groupId, current => {
      current.raid.lastAlertAt = now
      return current
    })

    await sock.sendMessage(groupId, {
      text:
        `╭━━━〔 🚨 *ANTI-RAID ACTIVÉ* 〕━━━╮\n\n` +
        `┃ ⚠️ Sévérité : *${severity.level}*\n` +
        `┃ 👥 Entrées : *${recent.length}/${threshold}*\n` +
        `┃ ⏱️ Fenêtre : *${Math.round(windowMs / 1000)}s*\n` +
        `┃ 🔒 Verrouillage : ${locked ? '✅ Appliqué' : botAdmin ? '❌ Échec' : '❌ Bot non admin'}\n` +
        `┃ 🚫 Expulsés : *${kicked.length}*\n` +
        `┃ 🕵️ Comptes suspects : *${suspiciousCount}*\n` +
        `┃ 🌐 Blacklistés : *${blacklisted}*\n\n` +
        `┃ 📋 Nouveaux arrivants :\n` +
        participants.slice(0, 10).map(jid => `┃ • @${cleanNumber(jid)}`).join('\n') +
        (participants.length > 10 ? `\n┃ ... et ${participants.length - 10} autres` : '') +
        `\n\n╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      mentions: participants.slice(0, 20)
    }).catch(() => {})

    await sendOwnerReport(sock, groupId, groupName, {
      recentCount: recent.length, threshold, locked, kicked,
      suspiciousCount, blacklisted
    })

    // Notifier via webhook
    dispatchWebhook(groupId, 'raid', {
      count: recent.length, threshold, kicked: kicked.length, severity: severity.level
    }).catch(() => {})
  }

  return { triggered: true, kicked, locked, severity }
}

export function getRaidHistory(groupId) {
  return raidHistory.get(groupId) || []
}
