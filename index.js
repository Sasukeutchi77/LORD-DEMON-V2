import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import { config } from './config.js'
import {
  isSuperAdmin, isSudo, isPremium, isOwner, isDeployer,
  getSenderJid, cleanNumber, matchJid, registerLid,
  isBotLid, loadOwnerLids, setRuntimeOwner
} from './lib/ownerSystem.js'
import { autoDetectOwnerLid, autoDetectLidFromMessage, autoDetectLidFromGroup } from './lib/lidAutoDetector.js'
import { groupMetaCache, getGroupMeta, invalidateGroupCache } from './lib/groupConfig.js'
import { checkAntiLink } from './lib/antiLinkManager.js'
import { checkAntiTag } from './lib/antiTagManager.js'
import { handleAntiRaidParticipantUpdate } from './lib/antiRaid.js'
import { evaluateCommandAccess, checkCommandCooldown, formatAccessDenied, formatCooldownDenied } from './lib/commandRegistry.js'
import { auditLog } from './lib/auditLogger.js'
import { isAntiSuppressionEnabled, getCachedMessage, removeCachedMessage } from './lib/antiSuppressionManager.js'
import { isAntiPromoteActive } from './commands/antipromote.js'
import { isAntiDemoteActive } from './commands/antidemote.js'
import pino from 'pino'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { restoreActiveSessions, createBotInstance, getBotInstance, isOnCooldown, getCooldownRemaining, sessionExists } from './lib/sessionManager.js'
import { handleMessage } from './lib/messageHandler.js'
import { startScheduler } from './lib/scheduler.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logger    = pino({ level: 'silent' })

const COMMANDS_DIR = path.join(__dirname, 'commands')
const DATA_DIR     = path.join(__dirname, 'data')
const AUTH_DIR     = path.join(__dirname, 'auth_info_baileys')
const STATS_FILE   = path.join(DATA_DIR, 'stats.json')
const USERS_FILE   = path.join(DATA_DIR, 'users.json')

for (const dir of [DATA_DIR, AUTH_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const afkStore     = new Map()
const commandCache = new Map()

function loadStats() {
  try { return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8')) }
  catch { return { totalCommands: 0, startTime: Date.now() } }
}
function saveStats(d) { try { fs.writeFileSync(STATS_FILE, JSON.stringify(d, null, 2)) } catch {} }
function loadUsers() { try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')) } catch { return {} } }
function saveUsers(d) { try { fs.writeFileSync(USERS_FILE, JSON.stringify(d, null, 2)) } catch {} }

// ── NUMÉRO OWNER — lu UNIQUEMENT depuis .env, pas de prompt interactif ──
// Sur un hébergeur bot (pas de terminal), readline bloquerait ou crasherait.
function getOwnerNumber() {
  const envNumber = process.env.OWNER_NUMBER || config.ownerNumber
  if (!envNumber || envNumber.toString().replace(/[^0-9]/g, '').length < 7) {
    console.error('\n╔══════════════════════════════════════════════════════╗')
    console.error('║  ❌  ERREUR : OWNER_NUMBER manquant dans .env !      ║')
    console.error('║  Ajoutez :  OWNER_NUMBER=indicatif+numero            ║')
    console.error('║  Exemple :  OWNER_NUMBER=22653718750                 ║')
    console.error('╚══════════════════════════════════════════════════════╝\n')
    process.exit(1)
  }
  const cleaned = envNumber.toString().replace(/[^0-9]/g, '')
  console.log('📱 Numéro owner (OWNER_NUMBER): +' + cleaned)
  return cleaned
}

async function loadCommand(name) {
  if (commandCache.has(name)) return commandCache.get(name)
  const filePath = path.join(COMMANDS_DIR, name + '.js')
  if (!fs.existsSync(filePath)) return null
  try {
    const mod = await import(filePath + '?v=' + Date.now())
    const fn  = mod.default
    if (typeof fn === 'function') { commandCache.set(name, fn); return fn }
  } catch (e) { console.error(`❌ Erreur chargement cmd ${name}:`, e.message) }
  return null
}

async function main() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR)
  const { version } = await fetchLatestBaileysVersion().catch(() => ({ version: [2, 3000, 1015901307] }))
  const stats = loadStats()

  const sock = makeWASocket({
    version,
    logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    browser: Browsers.ubuntu('Chrome'),
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    markOnlineOnConnect: false,
    printQRInTerminal: false,
  })

  sock.ev.on('creds.update', saveCreds)

  if (!sock.authState.creds.registered) {
    const phoneNumber = getOwnerNumber()

    console.log('\n⏳ Connexion au serveur WhatsApp...')
    await new Promise(resolve => setTimeout(resolve, 3000))

    let pairingAttempt = 0
    const maxAttempts  = 3

    while (pairingAttempt < maxAttempts) {
      pairingAttempt++
      try {
        const code      = await sock.requestPairingCode(phoneNumber)
        const formatted = code?.match(/.{1,4}/g)?.join('-') || code

        console.log('\n╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮')
        console.log('┃      ⚡ LORD DEMON V2 — PAIRING       ┃')
        console.log('╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯')
        console.log('┃')
        console.log('┃  📱 Numéro: +' + phoneNumber)
        console.log('┃')
        console.log('┃  🔑 CODE DE COUPLAGE:')
        console.log('┃')
        console.log('┃        ' + formatted)
        console.log('┃')
        console.log('┃  📋 Comment entrer le code:')
        console.log('┃  1. Ouvrez WhatsApp sur votre téléphone')
        console.log('┃  2. Paramètres > Appareils liés')
        console.log('┃  3. Appuyez "Lier un appareil"')
        console.log('┃  4. Choisissez "Lier avec numéro de téléphone"')
        console.log('┃  5. Entrez le code ci-dessus')
        console.log('┃')
        console.log('┃  ⏱️  Ce code est valide ~60 secondes')
        console.log('╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n')
        break
      } catch (e) {
        console.error(`\n❌ Échec génération code (tentative ${pairingAttempt}/${maxAttempts}):`, e.message)
        if (pairingAttempt < maxAttempts) {
          console.log('🔄 Nouvel essai dans 5s...')
          await new Promise(r => setTimeout(r, 5000))
        } else {
          console.log('💡 Solutions possibles:')
          console.log('   → Supprimez le dossier auth_info_baileys et redémarrez')
          console.log('   → Vérifiez OWNER_NUMBER dans .env (avec indicatif pays)')
          console.log('   → Vérifiez votre connexion internet')
          process.exit(1)
        }
      }
    }
  }

  sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      config.botNumber = cleanNumber(sock.user?.id || '')
      config.botLid    = sock.user?.id || ''

      if (config.ownerNumber) {
        setRuntimeOwner({
          ownerNumber: config.ownerNumber,
          ownerLid:    config.ownerLid || ""
        })
      }

      await loadOwnerLids(sock).catch(() => {})
      autoDetectOwnerLid(sock).catch(() => {})

      console.log('\n╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮')
      console.log('┃  ⚡ LORD DEMON V2 CONNECTÉ  ┃')
      console.log('╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯')
      console.log('┃ 📱 Bot: +' + config.botNumber)
      console.log('┃ 👑 Owner: +' + (config.ownerNumber || 'NON DÉFINI ⚠️'))
      const commandCount = fs.readdirSync(COMMANDS_DIR).filter(file => file.endsWith('.js')).length
      console.log('┃ 📋 Commandes: ' + commandCount)
      console.log('┃ 🔤 Préfixe: ' + (config.prefix || '.'))
      console.log('┃ 📦 Mode: ' + (config.mode || 'public'))
      console.log('╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n')

      try { startScheduler(sock, 5000) } catch (e) { console.error('scheduler start:', e.message) }
    }
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
      const definitiveCodes = new Set([
        DisconnectReason.loggedOut,
        DisconnectReason.forbidden,
        DisconnectReason.badSession,
        405,
      ])
      const willReconnect = !definitiveCodes.has(reason)
      console.log('🔴 Connexion fermée, raison:', reason, '| Reconnexion:', willReconnect)
      if (willReconnect) {
        console.log('🔄 Reconnexion dans 5s...')
        setTimeout(main, 5000)
      } else {
        console.log('🚪 Déconnexion définitive (code ' + reason + ').')
        console.log('   → Supprimez auth_info_baileys et redémarrez pour reconnecter.')
        process.exit(1)
      }
    }
  })

  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    try {
      const meta = await getGroupMeta(sock, id)
      const conf = (await import('./lib/groupConfig.js')).getGroupConfig(id)
      const raidResult = await handleAntiRaidParticipantUpdate(sock, { id, participants, action }, meta, conf)
      const kickedByRaid = new Set(raidResult?.kicked || [])

      for (const jid of participants) {
        const num = cleanNumber(jid)
        if (action === 'add' && conf.welcome && !kickedByRaid.has(jid)) {
          const welcomeMsg = conf.welcomeMsg ||
            "╭━━━━━━━━━━━━━━━━━━━━━━╮\n" +
            "┃  👋 *BIENVENUE !* 👋   ┃\n" +
            "╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n" +
            "Bienvenue @" + num + " dans *" + (meta?.subject || 'ce groupe') + "* !\n" +
            "👥 Membres: " + (meta?.participants?.length || '?') + "\n" +
            "📜 Lisez les règles: *.rules*"
          await sock.sendMessage(id, { text: welcomeMsg, mentions: [jid] })
        }
        if (action === 'remove' && conf.goodbye) {
          const goodbyeMsg = conf.goodbyeMsg || "👋 @" + num + " a quitté le groupe. Au revoir !"
          await sock.sendMessage(id, { text: goodbyeMsg, mentions: [jid] })
        }
        if (action === 'remove') {
          const anti = (await import('./lib/antipurgeTracker.js')).default
          if (anti?.track) anti.track(id, jid)

          if (anti.isAntipurgeActive(id) && anti.isPurging(id) && anti.canTrigger(id)) {
            anti.markTriggered(id)
            try {
              const freshMeta = await getGroupMeta(sock, id)
              const botJid = sock.user?.id || ''
              const admins = (freshMeta?.participants || [])
                .filter(p => p.admin && !matchJid(p.id, botJid))
                .map(p => p.id)

              await sock.sendMessage(id, {
                text:
                  "🚨 *ALERTE ANTI-PURGE !*\n\n" +
                  `Plus de ${anti.PURGE_THRESHOLD - 1} suppressions détectées en moins de ` +
                  `${anti.PURGE_WINDOW_MS / 1000} secondes.\n\n` +
                  "🔻 Révocation de *tous les admins*\n" +
                  "🔒 *Verrouillage* du groupe (mode annonce)"
              })

              if (admins.length) {
                try { await sock.groupParticipantsUpdate(id, admins, 'demote') }
                catch (e) { console.error('antipurge demote error:', e.message) }
              }
              try { await sock.groupSettingUpdate(id, 'announcement') }
              catch (e) { console.error('antipurge lock error:', e.message) }
            } catch (e) {
              console.error('antipurge trigger error:', e.message)
            }
          }
        }
      }
      invalidateGroupCache(id)
    } catch (e) { console.error('group-participants error:', e.message) }
  })

  const _selfActionGuard = new Set()
  function _markSelfAction(groupId, action, jids) {
    for (const jid of jids) {
      const key = `${groupId}|${action}|${cleanNumber(jid)}`
      _selfActionGuard.add(key)
      setTimeout(() => _selfActionGuard.delete(key), 6000)
    }
  }
  function _isSelfAction(groupId, action, jid) {
    return _selfActionGuard.has(`${groupId}|${action}|${cleanNumber(jid)}`)
  }

  async function _safeGroupAction(groupId, jids, action, label = '') {
    const targets = (jids || []).filter(Boolean)
    if (!targets.length) return { ok: true, results: [] }
    _markSelfAction(groupId, action, targets)

    let lastErr = null
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const results = await sock.groupParticipantsUpdate(groupId, targets, action)
        return { ok: true, results }
      } catch (e) {
        lastErr = e
        const wait = 500 * attempt + 200 * attempt
        await new Promise(r => setTimeout(r, wait))
      }
    }
    console.error(`❌ ${label || action} échec après 3 tentatives:`, lastErr?.message)
    return { ok: false, error: lastErr }
  }

  sock.ev.on('group-participants.update', async ({ id, author, participants, action }) => {
    try {
      if (action !== 'promote' && action !== 'demote') return
      if (!Array.isArray(participants) || participants.length === 0) return

      const allFromBot = participants.every(p => _isSelfAction(id, action, p))
      if (allFromBot) return

      const realTargets = participants.filter(p => !_isSelfAction(id, action, p))
      if (realTargets.length === 0) return

      const antiPromoteOn = action === 'promote' && isAntiPromoteActive(id)
      const antiDemoteOn  = action === 'demote'  && isAntiDemoteActive(id)
      if (!antiPromoteOn && !antiDemoteOn) return

      const meta = await getGroupMeta(sock, id).catch(() => null)
      const botJid = sock.user?.id || ''
      const botIsAdmin = meta?.participants?.some(p => matchJid(p.id, botJid) && p.admin)
      if (!botIsAdmin) {
        try {
          await sock.sendMessage(id, {
            text:
              `🛡️ *${antiPromoteOn ? 'ANTI-PROMOTE' : 'ANTI-DEMOTE'} actif*\n\n` +
              `⚠️ Je ne suis *pas administrateur* du groupe.\n` +
              `👉 Promouvez-moi admin pour que la protection fonctionne.`
          })
        } catch {}
        return
      }

      const actor = author || ''
      const actorIsBot = actor && matchJid(actor, botJid)
      const actorIsProtected =
        !actor || actorIsBot ||
        isOwner(actor) || isDeployer(actor) || isSuperAdmin(actor)

      const targets = realTargets.filter(p => !matchJid(p, botJid))

      if (antiPromoteOn) {
        if (targets.length > 0) await _safeGroupAction(id, targets, 'demote', 'antipromote.revert')
        if (!actorIsProtected) await _safeGroupAction(id, [actor], 'demote', 'antipromote.actor')
        try {
          const mentions = [...(actor && !actorIsBot ? [actor] : []), ...targets]
          await sock.sendMessage(id, {
            text:
              "🛡️ *ANTI-PROMOTE ACTIF*\n\n" +
              (actor && !actorIsBot
                ? `⚠️ @${cleanNumber(actor)} a tenté de promouvoir un membre.\n\n`
                : "⚠️ Une tentative de promotion a été détectée.\n\n") +
              "⛔ Promotion annulée" +
              (actorIsProtected ? "." : " et l'auteur a été *rétrogradé*."),
            mentions
          })
        } catch (e) { console.error('antipromote notify error:', e.message) }
        return
      }

      if (antiDemoteOn) {
        if (targets.length > 0) await _safeGroupAction(id, targets, 'promote', 'antidemote.restore')
        const botWasDemoted = realTargets.some(p => matchJid(p, botJid))
        if (botWasDemoted) {
          setTimeout(() => {
            _safeGroupAction(id, [botJid], 'promote', 'antidemote.bot-self').catch(() => {})
          }, 1500)
        }
        if (!actorIsProtected) await _safeGroupAction(id, [actor], 'demote', 'antidemote.actor')
        try {
          const mentions = [...(actor && !actorIsBot ? [actor] : []), ...targets]
          await sock.sendMessage(id, {
            text:
              "🛡️ *ANTI-DEMOTE ACTIF*\n\n" +
              (actor && !actorIsBot
                ? `⚠️ @${cleanNumber(actor)} a tenté de rétrograder un admin.\n\n`
                : "⚠️ Une tentative de rétrogradation a été détectée.\n\n") +
              "✅ Admin(s) rétabli(s)" +
              (actorIsProtected ? "." : " et auteur *rétrogradé*."),
            mentions
          })
        } catch (e) { console.error('antidemote notify error:', e.message) }
        return
      }
    } catch (e) {
      console.error('promote/demote handler error:', e.message)
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return
    for (const msg of messages) {
      try {
        await handleMessage(sock, msg, stats, afkStore, {
          sessionManager: { createBotInstance, getBotInstance, isOnCooldown, getCooldownRemaining, sessionExists }
        })
      } catch (e) { console.error('msg handler error:', e.message) }
    }
    saveStats(stats)
  })

  sock.ev.on('messages.update', async (updates) => {
    for (const update of updates) {
      try {
        const msgKey  = update.key
        const groupId = msgKey?.remoteJid
        if (!groupId || !groupId.endsWith('@g.us')) continue

        const isDelete =
          update.update?.message?.protocolMessage?.type === 0 ||
          update.update?.message?.protocolMessage?.type === 'REVOKE' ||
          (update.update?.message?.protocolMessage?.key?.id)

        if (!isDelete) continue
        if (!isAntiSuppressionEnabled(groupId)) continue

        const deletedMsgId = update.update?.message?.protocolMessage?.key?.id || msgKey?.id
        if (!deletedMsgId) continue

        const cached = getCachedMessage(deletedMsgId)
        if (!cached) continue

        const botNum    = cleanNumber(sock.user?.id || '')
        const senderNum = cleanNumber(cached.sender || '')
        if (senderNum === botNum) continue

        removeCachedMessage(deletedMsgId)

        const senderDisplay = cached.pushName || senderNum || 'Inconnu'
        let msgReveal = `🗑️ *MESSAGE SUPPRIMÉ*\n👤 *De:* ${senderDisplay}\n\n`

        if (cached.text) {
          msgReveal += `💬 *Message:*\n${cached.text}`
          await sock.sendMessage(groupId, { text: msgReveal })
        } else if (cached.type === 'image') {
          msgReveal += `📷 _(Image supprimée)_`
          await sock.sendMessage(groupId, { text: msgReveal })
          try {
            await sock.sendMessage(groupId, {
              image: cached.msg?.imageMessage,
              caption: `🗑️ Image supprimée par ${senderDisplay}`
            })
          } catch {}
        } else {
          const typeLabel = { video: '🎥 Vidéo', audio: '🎵 Audio', sticker: '🏷️ Sticker', document: '📄 Document' }
          msgReveal += `${typeLabel[cached.type] || '_(Message)'} supprimé(e)_`
          await sock.sendMessage(groupId, { text: msgReveal })
        }
      } catch (e) {
        console.error('❌ AntiSuppression update error:', e.message)
      }
    }
  })

  return sock
}

restoreActiveSessions().catch(err => console.error('[Sessions] Erreur restauration:', err.message))

main().catch(err => {
  console.error('❌ Erreur fatale:', err)
  process.exit(1)
})
