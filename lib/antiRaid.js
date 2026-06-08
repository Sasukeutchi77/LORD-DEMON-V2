import { config } from '../config.js'
import { cleanNumber, isSuperAdmin, matchJid } from './ownerSystem.js'
import { getGroupConfig, updateGroupConfig } from './groupConfig.js'

const raidWindows = new Map()
const reopenTimers = new Map()

function getOwnerJid() {
  const num = String(config.ownerNumber || process.env.OWNER_NUMBER || '').replace(/[^0-9]/g, '')
  return num.length >= 7 ? `${num}@s.whatsapp.net` : null
}

function isBotAdmin(meta, botId) {
  return Boolean(meta?.participants?.some(p => matchJid(p.id, botId || '') && p.admin))
}

function rememberJoins(groupId, participants, windowMs) {
  const now = Date.now()
  const current = raidWindows.get(groupId) || []
  const fresh = current.filter(entry => now - entry.ts <= windowMs)
  for (const jid of participants) fresh.push({ jid, ts: now })
  raidWindows.set(groupId, fresh)
  return fresh
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
        text: `╭━━━〔 🛡️ *ANTI-RAID* 〕━━━╮\n\n┃ Raid terminé : le groupe est rouvert.\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
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
  await sock.sendMessage(ownerJid, {
    text:
      `🚨 *RAPPORT ANTI-RAID*\n\n` +
      `Groupe : *${groupName || groupId}*\n` +
      `Entrées récentes : *${report.recentCount}*\n` +
      `Seuil : *${report.threshold}*\n` +
      `Groupe verrouillé : ${report.locked ? 'oui' : 'non'}\n` +
      `Suspects expulsés : *${report.kicked.length}*\n` +
      `Heure : ${new Date().toLocaleString('fr-FR')}`
  }).catch(() => {})
}

export async function handleAntiRaidParticipantUpdate(sock, event, meta = null, conf = null) {
  const { id: groupId, participants = [], action } = event || {}
  if (!groupId || action !== 'add' || !participants.length) return { triggered: false, kicked: [] }

  const cfg = conf || getGroupConfig(groupId)
  const raid = cfg.raid || {}
  const windowMs = Math.max(5000, Number(raid.windowMs || 30000))
  const threshold = Math.max(2, Number(raid.joinThreshold || 5))
  const recent = rememberJoins(groupId, participants, windowMs)
  const triggered = Boolean(raid.enabled || recent.length >= threshold)

  if (!triggered) return { triggered: false, kicked: [] }

  const now = Date.now()
  updateGroupConfig(groupId, current => {
    current.raid.lastTriggeredAt = now
    return current
  })

  const botAdmin = isBotAdmin(meta, sock.user?.id)
  const groupName = meta?.subject || 'Groupe'
  const kicked = []
  let locked = false

  if (botAdmin && (raid.autoLock || raid.autoMute)) {
    await sock.groupSettingUpdate(groupId, 'announcement').then(() => { locked = true }).catch(() => {})
    if (!raid.enabled) await scheduleUnlock(sock, groupId, raid)
  }

  if (botAdmin && raid.suspectKick) {
    const suspects = participants.filter(jid => !isSuperAdmin(jid))
    for (const jid of suspects) {
      try {
        await sock.groupParticipantsUpdate(groupId, [jid], 'remove')
        kicked.push(jid)
      } catch {}
    }
  }

  const lastAlert = Number(raid.lastAlertAt || 0)
  if (now - lastAlert > 15000) {
    updateGroupConfig(groupId, current => {
      current.raid.lastAlertAt = now
      return current
    })

    const mentions = participants.slice(0, 20)
    await sock.sendMessage(groupId, {
      text:
        `╭━━━〔 🚨 *ANTI-RAID ACTIVÉ* 〕━━━╮\n\n` +
        `┃ Entrées détectées : *${recent.length}/${threshold}*\n` +
        `┃ Fenêtre : *${Math.round(windowMs / 1000)}s*\n` +
        `┃ Verrouillage : ${locked ? '✅ appliqué' : botAdmin ? '❌ échec' : '❌ bot non admin'}\n` +
        `┃ Expulsions suspectes : *${kicked.length}*\n\n` +
        `┃ Nouveaux comptes :\n` +
        participants.map(jid => `┃ • @${cleanNumber(jid)}`).join('\n') +
        `\n╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      mentions
    }).catch(() => {})

    await sendOwnerReport(sock, groupId, groupName, { recentCount: recent.length, threshold, locked, kicked })
  }

  return { triggered: true, kicked }
}