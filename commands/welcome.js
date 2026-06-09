// commands/welcome.js — LORD DEMON V2 (VERSION AMÉLIORÉE)
// Bienvenue enrichie : message personnalisé + infos niveau/badges

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isGroupAdmin, isSudo, cleanNumber } from '../lib/ownerSystem.js'
import { userDb, getLevel, getLevelEmoji, getXpBar, checkAndAwardBadges } from '../lib/xpSystem.js'
import { groupSettingsDb } from '../lib/database.js'
import { dispatchWebhook } from '../lib/webhookManager.js'

// ══════════════════════════════════════════════════
// ENVOI DU MESSAGE DE BIENVENUE (appelé par index.js)
// ══════════════════════════════════════════════════

export async function sendWelcomeMessage(sock, groupId, participants, meta) {
  const settings = groupSettingsDb.get(groupId)
  const wcfg     = settings.welcome || {}
  if (!wcfg.enabled) return

  const groupName  = meta?.subject || 'le groupe'
  const memberCount = meta?.participants?.length || 0

  for (const jid of participants) {
    const user   = userDb.get(jid)
    const xp     = user?.xp || 0
    const lvl    = getLevel(xp)
    const lvlEmoji = getLevelEmoji(lvl)
    const badges = JSON.parse(user?.badges || '[]')

    let customMsg = wcfg.message || ''
    if (customMsg) {
      customMsg = customMsg
        .replace(/{name}/g, `@${cleanNumber(jid)}`)
        .replace(/{group}/g, groupName)
        .replace(/{count}/g, memberCount.toString())
        .replace(/{level}/g, lvl.toString())
        .replace(/{xp}/g, xp.toString())
    }

    const defaultMsg =
☩━━━〔  👋 *BIENVENUE !*  〕━━━☩━━━☩\n\n` +
      `⛧  🩸 @${cleanNumber(jid)}\n` +
      `⛧  vient de rejoindre *${groupName}* !\n` +
      `⛧  \n` +
      `⛧  👥 *Membre #${memberCount}*\n` +
      `⛧  ${lvlEmoji} *Niveau :* ${lvl}\n` +
      `⛧  ✨ *XP :* ${xp.toLocaleString()}\n` +
      (badges.length ? `⛧  🏅 *Badges :* ${badges.slice(0, 3).join(' ')}\n` : '') +
      `⛧  \n` +
      `⛧  _Bienvenue dans le cercle !_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    await sock.sendMessage(groupId, {
      text: customMsg || defaultMsg,
      mentions: [jid]
    }).catch(() => {})

    // Donner XP de bienvenue (première fois)
    if (!user) {
      userDb.upsert(jid, {})
      const newBadges = checkAndAwardBadges(jid, userDb.get(jid))
      if (newBadges.length) {
        await sock.sendMessage(groupId, {
          text: `🎉 @${cleanNumber(jid)} reçoit le badge *${newBadges[0]}* en rejoignant !`,
          mentions: [jid]
        }).catch(() => {})
      }
    }

    // Notifier via webhook
    dispatchWebhook(groupId, 'join', { user: jid, memberCount }).catch(() => {})
  }
}

// ══════════════════════════════════════════════════
// COMMANDE .welcome (configuration)
// ══════════════════════════════════════════════════

export default async function welcome(sock, sender, args, msg, ctx = {}) {
  try {
    const userId = ctx.senderJid || getSenderJid(msg, sock)
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender, `☠ Commande groupe uniquement.`)
    }

    const canUse = ctx.isOwner || isDeployer(userId) || isSudo(userId) || ctx.isAdmin || await isGroupAdmin(sock, sender, userId)
    if (!canUse) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n\n⛧  🔒 Requis : admin du groupe.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const action   = args[0]?.toLowerCase()
    const settings = groupSettingsDb.get(sender)
    const wcfg     = settings.welcome || {}

    // ── ACTIVER ──────────────────────────────────
    if (action === 'on') {
      groupSettingsDb.update(sender, { welcome: { ...wcfg, enabled: true } })
      return await sendMessage(sock, sender,
        `☩━━━〔 👋 *WELCOME ACTIVÉ* 〕━━━☩\n\n` +
        `⛧  ✅ Message de bienvenue *activé* !\n\n` +
        `⛧  Fonctionnalités incluses :\n` +
        `⛧  • 👤 Nom + mention du nouveau membre\n` +
        `⛧  • 📊 Niveau XP et badges\n` +
        `⛧  • 👥 Numéro du membre dans le groupe\n` +
        `⛧  • 🎉 Attribution badge "Nouveau"\n\n` +
        `⛧  💡 Personnaliser : *.welcome set <msg>*\n` +
        `⛧  Variables : {name} {group} {count} {level} {xp}\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── DÉSACTIVER ──────────────────────────────
    if (action === 'off') {
      groupSettingsDb.update(sender, { welcome: { ...wcfg, enabled: false } })
      return await sendMessage(sock, sender,
        `☩━━━〔 👋 *WELCOME DÉSACTIVÉ* 〕━━━☩\n\n⛧  ❌ Message de bienvenue désactivé.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── PERSONNALISER ──────────────────────────
    if (action === 'set') {
      const newMsg = args.slice(1).join(' ')
      if (!newMsg) {
        return await sendMessage(sock, sender,
          `☠ Usage : *.welcome set <message>*\n\nVariables disponibles :\n• {name} → @mention du nouveau\n• {group} → nom du groupe\n• {count} → nb membres\n• {level} → niveau du membre\n• {xp} → XP du membre`
        )
      }
      groupSettingsDb.update(sender, { welcome: { ...wcfg, message: newMsg } })
      return await sendMessage(sock, sender,
        `✅ Message de bienvenue personnalisé sauvegardé !\n\n📝 Aperçu :\n_${newMsg}_`
      )
    }

    // ── RÉINITIALISER ──────────────────────────
    if (action === 'reset') {
      const { message: _, ...rest } = wcfg
      groupSettingsDb.update(sender, { welcome: rest })
      return await sendMessage(sock, sender, `✅ Message de bienvenue réinitialisé au message par défaut.`)
    }

    // ── STATUT (défaut) ──────────────────────────
    const status = wcfg.enabled ? '🟢 *ACTIVÉ*' : '🔴 *DÉSACTIVÉ*'
    await sendMessage(sock, sender,
      `☩━━━〔 👋 *WELCOME* 〕━━━☩\n\n` +
      `⛧  📊 Statut : ${status}\n\n` +
      `⛧  📝 Message : ${wcfg.message ? `_${wcfg.message.slice(0, 80)}..._` : '_Message par défaut (enrichi XP)_'}\n\n` +
      `⛧  *Commandes :*\n` +
      `⛧  • *.welcome on/off*\n` +
      `⛧  • *.welcome set <msg>* — Personnaliser\n` +
      `⛧  • *.welcome reset* — Réinitialiser\n\n` +
      `⛧  📌 *Variables :* {name} {group} {count} {level} {xp}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

  } catch (e) {
    console.error('❌ welcome.js:', e)
    await sendMessage(sock, sender, `☠ Rituel échoué: ${e.message}`)
  }
}
