// lib/webhookManager.js — LORD DEMON V2
// Webhooks : notifie des URLs externes sur les événements du bot

import { webhookDb } from './database.js'

// ══════════════════════════════════════════════════
// ÉVÉNEMENTS SUPPORTÉS
// ══════════════════════════════════════════════════

export const WEBHOOK_EVENTS = {
  message:    'Nouveau message reçu',
  join:       'Nouveau membre rejoint',
  leave:      'Membre quitte le groupe',
  ban:        'Membre banni',
  warn:       'Avertissement émis',
  command:    'Commande exécutée',
  raid:       'Tentative de raid détectée',
  level_up:   'Membre passe au niveau supérieur',
}

// ══════════════════════════════════════════════════
// ENVOI WEBHOOK
// ══════════════════════════════════════════════════

async function sendWebhook(url, payload) {
  try {
    const { default: fetch } = await import('node-fetch')
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'LORD-DEMON-BOT/2.0' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000)
    })
    return { ok: res.ok, status: res.status }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}

// ══════════════════════════════════════════════════
// DISPATCH
// ══════════════════════════════════════════════════

export async function dispatchWebhook(groupId, event, data = {}) {
  if (!WEBHOOK_EVENTS[event]) return

  const hooks = webhookDb.list(groupId)
  if (!hooks.length) return

  const payload = {
    event,
    group_id:  groupId,
    timestamp: Date.now(),
    bot:       'LORD DEMON V2',
    data
  }

  for (const hook of hooks) {
    if (!hook.events.includes(event) && !hook.events.includes('*')) continue
    sendWebhook(hook.url, payload).catch(() => {}) // Fire and forget
  }
}

// ══════════════════════════════════════════════════
// GESTION
// ══════════════════════════════════════════════════

export function addWebhook(groupId, url, events = ['message', 'join', 'leave', 'ban']) {
  // Valider l'URL
  try {
    new URL(url)
  } catch {
    return { ok: false, reason: 'URL invalide. Elle doit commencer par https://' }
  }

  if (!url.startsWith('https://')) {
    return { ok: false, reason: 'Seules les URLs HTTPS sont acceptées.' }
  }

  // Valider les événements
  const validEvents = events.filter(e => WEBHOOK_EVENTS[e] || e === '*')
  if (!validEvents.length) {
    return { ok: false, reason: 'Aucun événement valide. Utilisez : ' + Object.keys(WEBHOOK_EVENTS).join(', ') }
  }

  const id = webhookDb.add(groupId, url, validEvents)
  return { ok: true, id, events: validEvents }
}

export function removeWebhook(id, groupId) {
  return webhookDb.remove(id, groupId)
}

export function listWebhooks(groupId) {
  return webhookDb.list(groupId)
}

export function formatWebhookList(hooks) {
  if (!hooks.length) return '┃ _Aucun webhook configuré._'
  return hooks.map(h => {
    const domain = (() => { try { return new URL(h.url).hostname } catch { return h.url } })()
    return `┃ 🔗 *#${h.id}* → ${domain}\n┃    📡 Événements: ${h.events.join(', ')}`
  }).join('\n┃\n')
}
