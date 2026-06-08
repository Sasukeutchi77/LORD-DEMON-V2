// commands/ticket.js — LORD DEMON V2
// Système de tickets support

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo, isGroupAdmin } from '../lib/ownerSystem.js'
import { ticketSystem } from '../lib/ticketSystem.js'

export default async function ticket(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender, `☠ Commande groupe uniquement.`)
    }

    const userId = ctx.senderJid || getSenderJid(msg, sock)
    const action = args[0]?.toLowerCase()
    const isAdmin = ctx.isAdmin || await isGroupAdmin(sock, sender, userId)
    const isOp    = ctx.isOwner || isDeployer(userId) || isSudo(userId) || isAdmin

    // ── OUVRIR UN TICKET ──────────────────────────────
    if (!action || action === 'open' || action === 'ouvrir') {
      const subject = args.slice(action ? 1 : 0).join(' ').trim()
      if (!subject) {
        return await sendMessage(sock, sender,
          `╭━━━〔 🎫 *TICKETS* 〕━━━╮\n\n` +
          `┃ Usage : *.ticket <sujet>*\n` +
          `┃ Ex: *.ticket Problème avec ban injuste*\n\n` +
          `┃ *Autres commandes :*\n` +
          `┃ • *.ticket list* — Voir les tickets ouverts (admin)\n` +
          `┃ • *.ticket close <ID>* — Fermer un ticket (admin)\n` +
          `┃ • *.ticket mien* — Voir votre ticket\n\n` +
          `╰━━━━━━━━━━━━━━━━━━━━━━╯`
        )
      }

      const result = ticketSystem.open(sender, userId, subject)
      if (!result.ok) {
        return await sendMessage(sock, sender,
          `╭━━━〔 ⚠️ *TICKET* 〕━━━╮\n\n` +
          `┃ ❌ ${result.reason}\n` +
          `┃ Tapez *.ticket mien* pour voir votre ticket.\n\n` +
          `╰━━━━━━━━━━━━━━━━━━━━━━╯`
        )
      }

      return await sendMessage(sock, sender,
        `╭━━━〔 🎫 *TICKET OUVERT* 〕━━━╮\n\n` +
        `┃ ✅ Votre ticket a été créé !\n` +
        `┃\n` +
        `┃ 🆔 *ID :* ${result.ticketId}\n` +
        `┃ 📝 *Sujet :* ${subject}\n` +
        `┃ 📊 *Statut :* 🟢 Ouvert\n\n` +
        `┃ Un admin va vous répondre bientôt.\n` +
        `┃ *.ticket mien* pour suivre l'état.\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── VOIR SON TICKET ──────────────────────────────
    if (action === 'mien' || action === 'mon' || action === 'my') {
      const t = ticketSystem.userTicket(sender, userId)
      if (!t) {
        return await sendMessage(sock, sender,
          `╭━━━〔 🎫 *MON TICKET* 〕━━━╮\n\n` +
          `┃ ℹ️ Vous n'avez aucun ticket ouvert.\n` +
          `┃ Créez-en un : *.ticket <sujet>*\n\n` +
          `╰━━━━━━━━━━━━━━━━━━━━━━╯`
        )
      }
      const date = new Date(t.created_at).toLocaleString('fr-FR')
      return await sendMessage(sock, sender,
        `╭━━━〔 🎫 *VOTRE TICKET* 〕━━━╮\n\n` +
        `┃ 🆔 *ID :* ${t.ticket_id}\n` +
        `┃ 📝 *Sujet :* ${t.subject}\n` +
        `┃ 📊 *Statut :* 🟢 Ouvert\n` +
        `┃ 📅 *Créé le :* ${date}\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── LISTE (ADMIN) ──────────────────────────────
    if (action === 'list' || action === 'liste') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)
      const tickets = ticketSystem.list(sender, 'open')
      return await sendMessage(sock, sender,
        `╭━━━〔 🎫 *TICKETS OUVERTS (${tickets.length})* 〕━━━╮\n\n` +
        ticketSystem.formatList(tickets) +
        `\n\n┃ Pour fermer : *.ticket close <ID>*\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── FERMER (ADMIN) ──────────────────────────────
    if (action === 'close' || action === 'fermer') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)
      const ticketId = args[1]?.toUpperCase()
      if (!ticketId) return await sendMessage(sock, sender, `☠ Usage : *.ticket close <ID>*`)

      const closed = ticketSystem.close(ticketId, sender)
      if (!closed) return await sendMessage(sock, sender, `❌ Ticket *${ticketId}* introuvable ou déjà fermé.`)

      return await sendMessage(sock, sender,
        `╭━━━〔 ✅ *TICKET FERMÉ* 〕━━━╮\n\n` +
        `┃ 🆔 *${ticketId}* — Résolu\n` +
        `┃ 📊 *Statut :* 🔴 Fermé\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // ── HISTORIQUE (ADMIN) ──────────────────────────
    if (action === 'history' || action === 'historique') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)
      const closed = ticketSystem.list(sender, 'closed')
      return await sendMessage(sock, sender,
        `╭━━━〔 🎫 *TICKETS FERMÉS (${closed.length})* 〕━━━╮\n\n` +
        ticketSystem.formatList(closed) +
        `\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

    // Par défaut : ouvrir avec tout le texte
    const subject = args.join(' ').trim()
    if (subject) {
      const result = ticketSystem.open(sender, userId, subject)
      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)
      return await sendMessage(sock, sender,
        `╭━━━〔 🎫 *TICKET OUVERT* 〕━━━╮\n\n` +
        `┃ ✅ Ticket créé : *${result.ticketId}*\n` +
        `┃ 📝 Sujet : ${subject}\n\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯`
      )
    }

  } catch (e) {
    console.error('❌ ticket.js:', e)
    await sendMessage(sock, sender, `☠ Erreur ticket: ${e.message}`)
  }
}
