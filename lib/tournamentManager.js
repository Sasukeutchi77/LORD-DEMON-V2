// lib/tournamentManager.js — LORD DEMON V2
// Gestion des tournois multijoueurs (quiz, rps, tictactoe)

import { db } from './database.js'
import { cleanNumber } from './ownerSystem.js'
import { awardSpecialBadge } from './xpSystem.js'

export const tournamentManager = {

  create(groupId, game, createdBy) {
    const existing = db.prepare(
      "SELECT id FROM tournaments WHERE group_id = ? AND status IN ('open','running')"
    ).get(groupId)
    if (existing) return { ok: false, reason: 'Un tournoi est déjà en cours dans ce groupe.' }

    const r = db.prepare(
      "INSERT INTO tournaments (group_id, game, players) VALUES (?, ?, ?)"
    ).run(groupId, game, JSON.stringify([createdBy]))

    return { ok: true, id: Number(r.lastInsertRowid) }
  },

  join(groupId, userJid) {
    const t = this.getActive(groupId)
    if (!t) return { ok: false, reason: "Aucun tournoi ouvert dans ce groupe. Utilisez `.tournament create <jeu>`" }
    if (t.status !== 'open') return { ok: false, reason: 'Le tournoi est déjà lancé.' }

    const players = JSON.parse(t.players)
    if (players.includes(userJid)) return { ok: false, reason: 'Vous êtes déjà inscrit.' }
    if (players.length >= 16) return { ok: false, reason: 'Tournoi complet (16 joueurs max).' }

    players.push(userJid)
    db.prepare('UPDATE tournaments SET players = ? WHERE id = ?').run(JSON.stringify(players), t.id)
    return { ok: true, count: players.length }
  },

  start(groupId) {
    const t = this.getActive(groupId)
    if (!t) return { ok: false, reason: 'Aucun tournoi en attente.' }
    const players = JSON.parse(t.players)
    if (players.length < 2) return { ok: false, reason: 'Minimum 2 joueurs requis.' }

    db.prepare("UPDATE tournaments SET status = 'running' WHERE id = ?").run(t.id)
    return { ok: true, players, game: t.game }
  },

  end(groupId, winnerJid) {
    const t = this.getActive(groupId)
    if (!t) return { ok: false, reason: 'Aucun tournoi en cours.' }

    db.prepare("UPDATE tournaments SET status = 'finished', winner = ? WHERE id = ?")
      .run(winnerJid, t.id)

    // Attribuer badge champion
    if (winnerJid) awardSpecialBadge(winnerJid, '🏆 Champion')

    return { ok: true, game: t.game, winner: winnerJid }
  },

  cancel(groupId) {
    const t = this.getActive(groupId)
    if (!t) return false
    db.prepare("UPDATE tournaments SET status = 'cancelled' WHERE id = ?").run(t.id)
    return true
  },

  getActive(groupId) {
    return db.prepare(
      "SELECT * FROM tournaments WHERE group_id = ? AND status IN ('open','running') ORDER BY created_at DESC LIMIT 1"
    ).get(groupId)
  },

  history(groupId, limit = 5) {
    return db.prepare(
      "SELECT * FROM tournaments WHERE group_id = ? ORDER BY created_at DESC LIMIT ?"
    ).all(groupId, limit)
  },

  formatStatus(t) {
    if (!t) return '┃ _Aucun tournoi actif._'
    const players = JSON.parse(t.players)
    const statusIcon = t.status === 'open' ? '🟢 Inscriptions ouvertes' : '⚔️ En cours'
    return (
      `┃ 🎮 *Jeu :* ${t.game}\n` +
      `┃ 📊 *Statut :* ${statusIcon}\n` +
      `┃ 👥 *Joueurs (${players.length}) :*\n` +
      players.map(j => `┃  • @${cleanNumber(j)}`).join('\n')
    )
  }
}
