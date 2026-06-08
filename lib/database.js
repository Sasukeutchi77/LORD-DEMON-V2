// lib/database.js — LORD DEMON V2
// Base de données SQLite — remplace le stockage JSON fragmenté
// Utilise better-sqlite3 (synchrone, rapide, sans callbacks)

import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = path.join(__dirname, '..', 'data', 'demon.db')

// Assurer que le dossier data existe
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)

// Performance optimisations
db.pragma('journal_mode = WAL')
db.pragma('synchronous = NORMAL')
db.pragma('foreign_keys = ON')

// ══════════════════════════════════════════════════
// SCHÉMA — créé automatiquement au démarrage
// ══════════════════════════════════════════════════

db.exec(`
  -- Utilisateurs (XP, profil, stats)
  CREATE TABLE IF NOT EXISTS users (
    jid         TEXT PRIMARY KEY,
    xp          INTEGER DEFAULT 0,
    level       INTEGER DEFAULT 1,
    msg_count   INTEGER DEFAULT 0,
    daily_last  INTEGER DEFAULT 0,
    badges      TEXT    DEFAULT '[]',
    registered  INTEGER DEFAULT (strftime('%s','now') * 1000),
    last_seen   INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  -- Groupes (config par groupe)
  CREATE TABLE IF NOT EXISTS group_settings (
    group_id    TEXT PRIMARY KEY,
    settings    TEXT DEFAULT '{}',
    updated_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  -- Bans persistants
  CREATE TABLE IF NOT EXISTS bans (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    user_jid    TEXT NOT NULL,
    reason      TEXT DEFAULT 'Non spécifiée',
    banned_by   TEXT,
    banned_at   INTEGER DEFAULT (strftime('%s','now') * 1000),
    UNIQUE(group_id, user_jid)
  );

  -- Avertissements
  CREATE TABLE IF NOT EXISTS warns (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    user_jid    TEXT NOT NULL,
    reason      TEXT DEFAULT 'Non spécifiée',
    warned_by   TEXT,
    warned_at   INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  -- Notes de groupe
  CREATE TABLE IF NOT EXISTS notes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    name        TEXT NOT NULL,
    content     TEXT NOT NULL,
    created_by  TEXT,
    created_at  INTEGER DEFAULT (strftime('%s','now') * 1000),
    UNIQUE(group_id, name)
  );

  -- Tickets support
  CREATE TABLE IF NOT EXISTS tickets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id   TEXT NOT NULL UNIQUE,
    group_id    TEXT NOT NULL,
    user_jid    TEXT NOT NULL,
    subject     TEXT NOT NULL,
    status      TEXT DEFAULT 'open',
    created_at  INTEGER DEFAULT (strftime('%s','now') * 1000),
    closed_at   INTEGER
  );

  -- Tournois
  CREATE TABLE IF NOT EXISTS tournaments (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    game        TEXT NOT NULL,
    status      TEXT DEFAULT 'open',
    players     TEXT DEFAULT '[]',
    winner      TEXT,
    created_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  -- Blacklist globale (partagée entre groupes)
  CREATE TABLE IF NOT EXISTS global_blacklist (
    user_jid    TEXT PRIMARY KEY,
    reason      TEXT,
    added_by    TEXT,
    added_at    INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  -- Rappels planifiés
  CREATE TABLE IF NOT EXISTS reminders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id     TEXT NOT NULL,
    user_jid    TEXT NOT NULL,
    message     TEXT NOT NULL,
    fire_at     INTEGER NOT NULL,
    done        INTEGER DEFAULT 0
  );

  -- Webhooks configurés
  CREATE TABLE IF NOT EXISTS webhooks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    url         TEXT NOT NULL,
    events      TEXT DEFAULT '["message"]',
    active      INTEGER DEFAULT 1,
    created_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  -- Index pour les requêtes fréquentes
  CREATE INDEX IF NOT EXISTS idx_warns_group  ON warns(group_id);
  CREATE INDEX IF NOT EXISTS idx_warns_user   ON warns(user_jid);
  CREATE INDEX IF NOT EXISTS idx_bans_group   ON bans(group_id);
  CREATE INDEX IF NOT EXISTS idx_notes_group  ON notes(group_id);
  CREATE INDEX IF NOT EXISTS idx_reminders_fire ON reminders(fire_at) WHERE done = 0;
`)

// ══════════════════════════════════════════════════
// API USERS
// ══════════════════════════════════════════════════

export const userDb = {
  get(jid) {
    return db.prepare('SELECT * FROM users WHERE jid = ?').get(jid) || null
  },

  upsert(jid, data = {}) {
    const existing = this.get(jid)
    if (!existing) {
      db.prepare(`
        INSERT INTO users (jid, xp, level, msg_count, daily_last, badges, last_seen)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(jid, data.xp || 0, data.level || 1, data.msg_count || 0,
              data.daily_last || 0, JSON.stringify(data.badges || []), Date.now())
    } else {
      const sets = Object.keys(data).map(k => `${k} = ?`).join(', ')
      const vals = Object.values(data).map(v => typeof v === 'object' ? JSON.stringify(v) : v)
      db.prepare(`UPDATE users SET ${sets}, last_seen = ? WHERE jid = ?`)
        .run(...vals, Date.now(), jid)
    }
    return this.get(jid)
  },

  addXp(jid, amount) {
    db.prepare(`
      INSERT INTO users (jid, xp, msg_count, last_seen)
      VALUES (?, ?, 1, ?)
      ON CONFLICT(jid) DO UPDATE SET
        xp = xp + excluded.xp,
        msg_count = msg_count + 1,
        last_seen = excluded.last_seen
    `).run(jid, amount, Date.now())
    return this.get(jid)
  },

  getLevel(xp) {
    return Math.floor(Math.sqrt((xp || 0) / 10)) + 1
  },

  leaderboard(limit = 10) {
    return db.prepare('SELECT * FROM users ORDER BY xp DESC LIMIT ?').all(limit)
  },

  weeklyLeaderboard(limit = 10) {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return db.prepare(
      'SELECT * FROM users WHERE last_seen > ? ORDER BY xp DESC LIMIT ?'
    ).all(weekAgo, limit)
  },

  addBadge(jid, badge) {
    const user = this.get(jid)
    const badges = JSON.parse(user?.badges || '[]')
    if (!badges.includes(badge)) {
      badges.push(badge)
      db.prepare('UPDATE users SET badges = ? WHERE jid = ?')
        .run(JSON.stringify(badges), jid)
    }
  },

  getBadges(jid) {
    const user = this.get(jid)
    return JSON.parse(user?.badges || '[]')
  }
}

// ══════════════════════════════════════════════════
// API BANS
// ══════════════════════════════════════════════════

export const banDb = {
  isBanned(groupId, userJid) {
    return !!db.prepare('SELECT 1 FROM bans WHERE group_id = ? AND user_jid = ?').get(groupId, userJid)
  },

  add(groupId, userJid, reason = 'Non spécifiée', bannedBy = null) {
    try {
      db.prepare('INSERT OR IGNORE INTO bans (group_id, user_jid, reason, banned_by) VALUES (?, ?, ?, ?)')
        .run(groupId, userJid, reason, bannedBy)
      return true
    } catch { return false }
  },

  remove(groupId, userJid) {
    const r = db.prepare('DELETE FROM bans WHERE group_id = ? AND user_jid = ?').run(groupId, userJid)
    return r.changes > 0
  },

  list(groupId) {
    return db.prepare('SELECT * FROM bans WHERE group_id = ? ORDER BY banned_at DESC').all(groupId)
  }
}

// ══════════════════════════════════════════════════
// API WARNS
// ══════════════════════════════════════════════════

export const warnDb = {
  add(groupId, userJid, reason = 'Non spécifiée', warnedBy = null) {
    db.prepare('INSERT INTO warns (group_id, user_jid, reason, warned_by) VALUES (?, ?, ?, ?)')
      .run(groupId, userJid, reason, warnedBy)
    return this.count(groupId, userJid)
  },

  count(groupId, userJid) {
    return db.prepare('SELECT COUNT(*) as c FROM warns WHERE group_id = ? AND user_jid = ?')
      .get(groupId, userJid)?.c || 0
  },

  list(groupId, userJid) {
    return db.prepare('SELECT * FROM warns WHERE group_id = ? AND user_jid = ? ORDER BY warned_at DESC')
      .all(groupId, userJid)
  },

  clear(groupId, userJid) {
    return db.prepare('DELETE FROM warns WHERE group_id = ? AND user_jid = ?').run(groupId, userJid).changes
  },

  removeOne(groupId, userJid) {
    const last = db.prepare('SELECT id FROM warns WHERE group_id = ? AND user_jid = ? ORDER BY warned_at DESC LIMIT 1')
      .get(groupId, userJid)
    if (!last) return false
    db.prepare('DELETE FROM warns WHERE id = ?').run(last.id)
    return true
  }
}

// ══════════════════════════════════════════════════
// API NOTES
// ══════════════════════════════════════════════════

export const noteDb = {
  set(groupId, name, content, createdBy = null) {
    db.prepare(`
      INSERT INTO notes (group_id, name, content, created_by)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(group_id, name) DO UPDATE SET content = excluded.content
    `).run(groupId, name.toLowerCase(), content, createdBy)
  },

  get(groupId, name) {
    return db.prepare('SELECT * FROM notes WHERE group_id = ? AND name = ?')
      .get(groupId, name.toLowerCase())
  },

  list(groupId) {
    return db.prepare('SELECT * FROM notes WHERE group_id = ? ORDER BY name').all(groupId)
  },

  delete(groupId, name) {
    return db.prepare('DELETE FROM notes WHERE group_id = ? AND name = ?')
      .run(groupId, name.toLowerCase()).changes > 0
  }
}

// ══════════════════════════════════════════════════
// API GLOBAL BLACKLIST
// ══════════════════════════════════════════════════

export const globalBlacklist = {
  isBlacklisted(userJid) {
    return !!db.prepare('SELECT 1 FROM global_blacklist WHERE user_jid = ?').get(userJid)
  },

  add(userJid, reason, addedBy) {
    db.prepare('INSERT OR IGNORE INTO global_blacklist (user_jid, reason, added_by) VALUES (?, ?, ?)')
      .run(userJid, reason, addedBy)
  },

  remove(userJid) {
    return db.prepare('DELETE FROM global_blacklist WHERE user_jid = ?').run(userJid).changes > 0
  },

  list() {
    return db.prepare('SELECT * FROM global_blacklist ORDER BY added_at DESC').all()
  }
}

// ══════════════════════════════════════════════════
// API REMINDERS
// ══════════════════════════════════════════════════

export const reminderDb = {
  add(chatId, userJid, message, fireAt) {
    const r = db.prepare('INSERT INTO reminders (chat_id, user_jid, message, fire_at) VALUES (?, ?, ?, ?)')
      .run(chatId, userJid, message, fireAt)
    return r.lastInsertRowid
  },

  getPending() {
    return db.prepare('SELECT * FROM reminders WHERE done = 0 AND fire_at <= ?').all(Date.now())
  },

  markDone(id) {
    db.prepare('UPDATE reminders SET done = 1 WHERE id = ?').run(id)
  },

  list(userJid) {
    return db.prepare('SELECT * FROM reminders WHERE user_jid = ? AND done = 0 ORDER BY fire_at').all(userJid)
  }
}

// ══════════════════════════════════════════════════
// API WEBHOOKS
// ══════════════════════════════════════════════════

export const webhookDb = {
  add(groupId, url, events = ['message']) {
    const r = db.prepare('INSERT INTO webhooks (group_id, url, events) VALUES (?, ?, ?)')
      .run(groupId, url, JSON.stringify(events))
    return r.lastInsertRowid
  },

  list(groupId) {
    return db.prepare('SELECT * FROM webhooks WHERE group_id = ? AND active = 1').all(groupId)
      .map(w => ({ ...w, events: JSON.parse(w.events) }))
  },

  remove(id, groupId) {
    return db.prepare('DELETE FROM webhooks WHERE id = ? AND group_id = ?').run(id, groupId).changes > 0
  }
}

// ══════════════════════════════════════════════════
// GROUPE SETTINGS (JSON flexible)
// ══════════════════════════════════════════════════

export const groupSettingsDb = {
  get(groupId) {
    const row = db.prepare('SELECT settings FROM group_settings WHERE group_id = ?').get(groupId)
    return row ? JSON.parse(row.settings) : {}
  },

  set(groupId, settings) {
    db.prepare(`
      INSERT INTO group_settings (group_id, settings, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(group_id) DO UPDATE SET settings = excluded.settings, updated_at = excluded.updated_at
    `).run(groupId, JSON.stringify(settings), Date.now())
  },

  update(groupId, patch) {
    const current = this.get(groupId)
    this.set(groupId, { ...current, ...patch })
  }
}

export { db }
export default db
