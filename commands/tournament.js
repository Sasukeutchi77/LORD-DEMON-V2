// commands/tournament.js — LORD DEMON V2
// Tournois multijoueurs

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSudo, isGroupAdmin, cleanNumber } from '../lib/ownerSystem.js'
import { tournamentManager } from '../lib/tournamentManager.js'

const SUPPORTED_GAMES = ['quiz', 'rps', 'tictactoe', 'coinflip', 'dice']

export default async function tournament(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender, `☠ Commande groupe uniquement.`)
    }

    const userId  = ctx.senderJid || getSenderJid(msg, sock)
    const action  = args[0]?.toLowerCase()
    const isAdmin = ctx.isAdmin || await isGroupAdmin(sock, sender, userId)
    const isOp    = ctx.isOwner || isDeployer(userId) || isSudo(userId) || isAdmin

    // ── AIDE ──────────────────────────────────────
    if (!action || action === 'help') {
      return await sendMessage(sock, sender,
☩━━━〔  🏆 *TOURNOIS*  〕━━━☩━━━☩\n\n` +
        `⛧  *Commandes :*\n` +
        `⛧  • *.tournament create <jeu>* — Créer (admin)\n` +
        `⛧  • *.tournament join* — Rejoindre\n` +
        `⛧  • *.tournament start* — Lancer (admin)\n` +
        `⛧  • *.tournament end @gagnant* — Terminer (admin)\n` +
        `⛧  • *.tournament cancel* — Annuler (admin)\n` +
        `⛧  • *.tournament status* — Voir l'état\n` +
        `⛧  • *.tournament history* — Historique\n\n` +
        `⛧  *Jeux supportés :*\n` +
        `⛧  ${SUPPORTED_GAMES.map(g => `• ${g}`).join('\n⛧  ')}\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── CRÉER ──────────────────────────────────────
    if (action === 'create' || action === 'créer') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)
      const game = args[1]?.toLowerCase()
      if (!game || !SUPPORTED_GAMES.includes(game)) {
        return await sendMessage(sock, sender,
          `☠ Jeu invalide.\n\nJeux disponibles : ${SUPPORTED_GAMES.join(', ')}\n\nEx: *.tournament create quiz*`
        )
      }

      const result = tournamentManager.create(sender, game, userId)
      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)

      return await sendMessage(sock, sender,
        `☩━━━〔 🏆 *TOURNOI CRÉÉ* 〕━━━☩\n\n` +
        `⛧  🎮 *Jeu :* ${game.toUpperCase()}\n` +
        `⛧  📊 *Statut :* 🟢 Inscriptions ouvertes\n` +
        `⛧  👥 *Joueurs :* 1 (créateur inscrit)\n\n` +
        `⛧  Pour rejoindre : *.tournament join*\n` +
        `⛧  Pour lancer : *.tournament start* (admin)\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── REJOINDRE ──────────────────────────────────
    if (action === 'join' || action === 'rejoindre') {
      const result = tournamentManager.join(sender, userId)
      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)

      const t = tournamentManager.getActive(sender)
      return await sendMessage(sock, sender,
        `☩━━━〔 🏆 *TOURNOI* 〕━━━☩\n\n` +
        `⛧  ✅ @${cleanNumber(userId)} rejoint le tournoi !\n` +
        `⛧  👥 *Joueurs inscrits :* ${result.count}\n\n` +
        `⛧  En attente du lancement par un admin.\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions: [userId] }
      )
    }

    // ── LANCER ──────────────────────────────────────
    if (action === 'start' || action === 'lancer') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)
      const result = tournamentManager.start(sender)
      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)

      const mentions = result.players
      return await sendMessage(sock, sender,
        `☩━━━〔 ⚔️ *TOURNOI LANCÉ !* 〕━━━☩\n\n` +
        `⛧  🎮 *Jeu :* ${result.game.toUpperCase()}\n` +
        `⛧  👥 *${result.players.length} joueurs :*\n` +
        result.players.map(j => `⛧  • @${cleanNumber(j)}`).join('\n') +
        `\n\n⛧  🏆 Bonne chance à tous !\n` +
        `⛧  Fin : *.tournament end @gagnant*\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions }
      )
    }

    // ── TERMINER ──────────────────────────────────
    if (action === 'end' || action === 'terminer') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)

      const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
      const winnerJid = mentions?.[0] || (args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)

      const result = tournamentManager.end(sender, winnerJid)
      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)

      return await sendMessage(sock, sender,
        `☩━━━〔 🏆 *TOURNOI TERMINÉ !* 〕━━━☩\n\n` +
        `⛧  🎮 *Jeu :* ${result.game.toUpperCase()}\n` +
        `⛧  🥇 *VAINQUEUR :* @${cleanNumber(winnerJid || 'inconnu')}\n\n` +
        `⛧  🏅 Badge "Champion" attribué !\n` +
        `⛧  Félicitations au champion !\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions: winnerJid ? [winnerJid] : [] }
      )
    }

    // ── ANNULER ──────────────────────────────────
    if (action === 'cancel' || action === 'annuler') {
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé aux admins.`)
      const done = tournamentManager.cancel(sender)
      return await sendMessage(sock, sender,
        done ? `✅ Tournoi annulé.` : `❌ Aucun tournoi en cours.`
      )
    }

    // ── STATUT ──────────────────────────────────
    if (action === 'status' || action === 'statut') {
      const t = tournamentManager.getActive(sender)
      return await sendMessage(sock, sender,
        `☩━━━〔 🏆 *STATUT TOURNOI* 〕━━━☩\n\n` +
        tournamentManager.formatStatus(t) +
        `\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── HISTORIQUE ──────────────────────────────
    if (action === 'history' || action === 'historique') {
      const history = tournamentManager.history(sender)
      if (!history.length) return await sendMessage(sock, sender, `ℹ️ Aucun tournoi dans l'historique.`)

      let text = `☩━━━〔 🏆 *HISTORIQUE* 〕━━━☩\n\n`
      history.forEach((t, i) => {
        const date = new Date(t.created_at).toLocaleDateString('fr-FR')
        text += `⛧  ${i + 1}. *${t.game.toUpperCase()}* — ${date}\n`
        text += `⛧  🏅 Gagnant: ${t.winner ? `@${cleanNumber(t.winner)}` : '_non défini_'}\n`
        if (i < history.length - 1) text += `⛧  \n`
      })
      text += `\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

      const mentions = history.filter(t => t.winner).map(t => t.winner)
      return await sendMessage(sock, sender, text, { mentions })
    }

  } catch (e) {
    console.error('❌ tournament.js:', e)
    await sendMessage(sock, sender, `☠ Erreur tournoi: ${e.message}`)
  }
}
