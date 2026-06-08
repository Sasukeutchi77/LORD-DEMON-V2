// commands/webhook.js — LORD DEMON V2
// Gestion des webhooks externes

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo, isGroupAdmin } from '../lib/ownerSystem.js'
import { addWebhook, removeWebhook, listWebhooks, formatWebhookList, WEBHOOK_EVENTS } from '../lib/webhookManager.js'

export default async function webhook(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender, `☠ Commande groupe uniquement.`)
    }

    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const isAdmin = ctx.isAdmin || await isGroupAdmin(sock, sender, userId)
    const isOp    = ctx.isOwner || isDeployer(userId) || isSudo(userId) || isAdmin

    if (!isOp) {
      return await sendMessage(sock, sender,
        `╭━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━╮\n\n┃ Réservé aux admins.\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    const action = args[0]?.toLowerCase()

    // ── LISTE (défaut) ──────────────────────────────
    if (!action || action === 'list' || action === 'liste') {
      const hooks = listWebhooks(sender)
      return await sendMessage(sock, sender,
        `╭━━━〔 📡 *WEBHOOKS (${hooks.length})* 〕━━━╮\n\n` +
        formatWebhookList(hooks) +
        `\n\n┃ *Commandes :*\n` +
        `┃ • *.webhook add <url> [events]* — Ajouter\n` +
        `┃ • *.webhook remove <id>* — Supprimer\n` +
        `┃ • *.webhook events* — Voir les événements\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── VOIR LES ÉVÉNEMENTS ──────────────────────
    if (action === 'events' || action === 'événements') {
      const list = Object.entries(WEBHOOK_EVENTS)
        .map(([k, v]) => `┃ • *${k}* — ${v}`)
        .join('\n')
      return await sendMessage(sock, sender,
        `╭━━━〔 📡 *ÉVÉNEMENTS DISPONIBLES* 〕━━━╮\n\n` +
        list +
        `\n┃ • *** — Tous les événements\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── AJOUTER ──────────────────────────────────
    if (action === 'add' || action === 'ajouter') {
      const url = args[1]
      if (!url) {
        return await sendMessage(sock, sender,
          `☠ Usage : *.webhook add <url> [event1,event2]*\n\nEx: *.webhook add https://discord.com/api/webhooks/... message,join*`
        )
      }

      const eventsArg = args[2] ? args[2].split(',') : ['message', 'join', 'leave', 'ban']
      const result    = addWebhook(sender, url, eventsArg)

      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)

      return await sendMessage(sock, sender,
        `╭━━━〔 📡 *WEBHOOK AJOUTÉ* 〕━━━╮\n\n` +
        `┃ ✅ Webhook #${result.id} configuré !\n` +
        `┃ 📡 Événements : ${result.events.join(', ')}\n\n` +
        `┃ Le bot notifiera cette URL automatiquement.\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── SUPPRIMER ──────────────────────────────
    if (action === 'remove' || action === 'supprimer') {
      const id = parseInt(args[1])
      if (!id) return await sendMessage(sock, sender, `☠ Usage : *.webhook remove <id>*`)

      const done = removeWebhook(id, sender)
      return await sendMessage(sock, sender,
        done ? `✅ Webhook *#${id}* supprimé.` : `❌ Webhook *#${id}* introuvable.`
      )
    }

  } catch (e) {
    console.error('❌ webhook.js:', e)
    await sendMessage(sock, sender, `☠ Erreur webhook: ${e.message}`)
  }
}
