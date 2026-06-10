// lib/economySystem.js — LORD DEMON V2
// Système d'économie complet : coins, banque, inventaire, métiers
// Utilise la même DB SQLite que database.js

import Database from 'node-sqlite3-wasm'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = path.join(__dirname, '..', 'data', 'demon.db')
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)
db.exec('PRAGMA journal_mode = WAL')
db.exec('PRAGMA synchronous = NORMAL')

// ══════════════════════════════════════════════════
// SCHÉMA ÉCONOMIE
// ══════════════════════════════════════════════════
db.exec(`
  CREATE TABLE IF NOT EXISTS economy (
    jid           TEXT PRIMARY KEY,
    coins         INTEGER DEFAULT 0,
    bank          INTEGER DEFAULT 0,
    bank_capacity INTEGER DEFAULT 5000,
    total_earned  INTEGER DEFAULT 0,
    job           TEXT DEFAULT NULL,
    job_xp        INTEGER DEFAULT 0,
    last_work     INTEGER DEFAULT 0,
    last_rob      INTEGER DEFAULT 0,
    inventory     TEXT DEFAULT '{}',
    created_at    INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS marriages (
    jid1          TEXT NOT NULL,
    jid2          TEXT NOT NULL,
    married_at    INTEGER DEFAULT (strftime('%s','now') * 1000),
    ring          TEXT DEFAULT '💍',
    PRIMARY KEY(jid1, jid2)
  );

  CREATE TABLE IF NOT EXISTS guilds (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL UNIQUE,
    tag           TEXT NOT NULL,
    leader        TEXT NOT NULL,
    members       TEXT DEFAULT '[]',
    description   TEXT DEFAULT '',
    level         INTEGER DEFAULT 1,
    xp            INTEGER DEFAULT 0,
    coins         INTEGER DEFAULT 0,
    created_at    INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS guild_members (
    jid           TEXT NOT NULL,
    guild_id      INTEGER NOT NULL,
    role          TEXT DEFAULT 'membre',
    joined_at     INTEGER DEFAULT (strftime('%s','now') * 1000),
    PRIMARY KEY(jid)
  );

  CREATE TABLE IF NOT EXISTS pets (
    jid           TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    species       TEXT NOT NULL,
    level         INTEGER DEFAULT 1,
    xp            INTEGER DEFAULT 0,
    hunger        INTEGER DEFAULT 100,
    happiness     INTEGER DEFAULT 100,
    health        INTEGER DEFAULT 100,
    last_feed     INTEGER DEFAULT (strftime('%s','now') * 1000),
    last_play     INTEGER DEFAULT (strftime('%s','now') * 1000),
    adopted_at    INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS cards (
    jid           TEXT NOT NULL,
    card_id       TEXT NOT NULL,
    obtained_at   INTEGER DEFAULT (strftime('%s','now') * 1000),
    PRIMARY KEY(jid, card_id)
  );

  CREATE INDEX IF NOT EXISTS idx_economy_coins ON economy(coins DESC);
  CREATE INDEX IF NOT EXISTS idx_guild_members ON guild_members(guild_id);
`)

// ══════════════════════════════════════════════════
// BOUTIQUE — Objets disponibles
// ══════════════════════════════════════════════════
export const SHOP_ITEMS = {
  'role_demon':   { name: '😈 Rôle Démon',     price: 500,   desc: 'Titre Démon dans votre profil' },
  'role_chevalier': { name: '⚔️ Rôle Chevalier', price: 300,  desc: 'Titre Chevalier dans votre profil' },
  'bouclier':     { name: '🛡️ Bouclier',        price: 200,   desc: 'Protection contre les vols pendant 24h' },
  'amulette':     { name: '🔮 Amulette',         price: 150,   desc: 'Double XP pendant 1h' },
  'potion_xp':    { name: '⚗️ Potion XP',        price: 100,   desc: '+50 XP instantanément' },
  'capacite_banque': { name: '🏦 Extension banque', price: 1000, desc: '+5000 capacité bancaire' },
  'pack_cartes':  { name: '🃏 Pack cartes (x5)', price: 250,   desc: '5 cartes aléatoires' },
  'nourriture_pet': { name: '🦴 Croquettes (x5)', price: 80,  desc: 'Nourriture pour votre animal' },
}

// ══════════════════════════════════════════════════
// MÉTIERS
// ══════════════════════════════════════════════════
export const JOBS = {
  mineur:      { emoji: '⛏️', name: 'Mineur',      base: 80,  cooldown: 3600, desc: 'Extrait des minerais précieux' },
  marchand:    { emoji: '🛒', name: 'Marchand',     base: 120, cooldown: 7200, desc: 'Commerce et négoce' },
  assassin:    { emoji: '🗡️', name: 'Assassin',    base: 200, cooldown: 14400, desc: 'Missions dangereuses, gain élevé' },
  sorcier:     { emoji: '🧙', name: 'Sorcier',      base: 150, cooldown: 10800, desc: 'Vend des potions et sorts' },
  forgeron:    { emoji: '🔨', name: 'Forgeron',     base: 100, cooldown: 5400, desc: 'Fabrique des armes et armures' },
  chasseur:    { emoji: '🏹', name: 'Chasseur',     base: 90,  cooldown: 4800, desc: 'Chasse des créatures' },
  alchimiste:  { emoji: '⚗️', name: 'Alchimiste',  base: 180, cooldown: 12000, desc: 'Transmutation et potions rares' },
  gladiateur:  { emoji: '⚔️', name: 'Gladiateur', base: 250, cooldown: 18000, desc: 'Combat dans l\'arène, gros gains' },
}

// ══════════════════════════════════════════════════
// API ÉCONOMIE
// ══════════════════════════════════════════════════
export const economyDb = {
  get(jid) {
    return db.prepare('SELECT * FROM economy WHERE jid = ?').get(jid) || null
  },

  ensure(jid) {
    db.prepare(`INSERT OR IGNORE INTO economy (jid) VALUES (?)`).run(jid)
    return this.get(jid)
  },

  addCoins(jid, amount) {
    this.ensure(jid)
    db.prepare(`UPDATE economy SET coins = MAX(0, coins + ?), total_earned = total_earned + MAX(0, ?) WHERE jid = ?`)
      .run(amount, amount, jid)
    return this.get(jid)
  },

  removeCoins(jid, amount) {
    this.ensure(jid)
    const e = this.get(jid)
    if ((e.coins || 0) < amount) return false
    db.prepare(`UPDATE economy SET coins = coins - ? WHERE jid = ?`).run(amount, jid)
    return true
  },

  deposit(jid, amount) {
    this.ensure(jid)
    const e = this.get(jid)
    if ((e.coins || 0) < amount) return { ok: false, reason: 'Pas assez de 🪙 coins en poche.' }
    const space = (e.bank_capacity || 5000) - (e.bank || 0)
    if (space <= 0) return { ok: false, reason: 'Banque pleine !' }
    const actual = Math.min(amount, space)
    db.prepare(`UPDATE economy SET coins = coins - ?, bank = bank + ? WHERE jid = ?`).run(actual, actual, jid)
    return { ok: true, deposited: actual }
  },

  withdraw(jid, amount) {
    this.ensure(jid)
    const e = this.get(jid)
    if ((e.bank || 0) < amount) return { ok: false, reason: 'Pas assez en banque.' }
    db.prepare(`UPDATE economy SET bank = bank - ?, coins = coins + ? WHERE jid = ?`).run(amount, amount, jid)
    return { ok: true, withdrawn: amount }
  },

  transfer(fromJid, toJid, amount) {
    this.ensure(fromJid); this.ensure(toJid)
    const from = this.get(fromJid)
    if ((from.coins || 0) < amount) return { ok: false, reason: 'Pas assez de coins.' }
    db.prepare(`UPDATE economy SET coins = coins - ? WHERE jid = ?`).run(amount, fromJid)
    db.prepare(`UPDATE economy SET coins = coins + ?, total_earned = total_earned + ? WHERE jid = ?`).run(amount, amount, toJid)
    return { ok: true }
  },

  getInventory(jid) {
    const e = this.ensure(jid)
    return JSON.parse(e.inventory || '{}')
  },

  addItem(jid, itemId, qty = 1) {
    const inv = this.getInventory(jid)
    inv[itemId] = (inv[itemId] || 0) + qty
    db.prepare(`UPDATE economy SET inventory = ? WHERE jid = ?`).run(JSON.stringify(inv), jid)
  },

  removeItem(jid, itemId, qty = 1) {
    const inv = this.getInventory(jid)
    if (!inv[itemId] || inv[itemId] < qty) return false
    inv[itemId] -= qty
    if (inv[itemId] <= 0) delete inv[itemId]
    db.prepare(`UPDATE economy SET inventory = ? WHERE jid = ?`).run(JSON.stringify(inv), jid)
    return true
  },

  setJob(jid, job) {
    this.ensure(jid)
    db.prepare(`UPDATE economy SET job = ?, job_xp = 0 WHERE jid = ?`).run(job, jid)
  },

  leaderboard(limit = 10) {
    return db.prepare(`SELECT jid, coins, bank, (coins + bank) as total FROM economy ORDER BY total DESC LIMIT ?`).all(limit)
  }
}

// ══════════════════════════════════════════════════
// API MARIAGES
// ══════════════════════════════════════════════════
export const marriageDb = {
  get(jid) {
    return db.prepare(`SELECT * FROM marriages WHERE jid1 = ? OR jid2 = ?`).get(jid, jid) || null
  },
  marry(jid1, jid2, ring = '💍') {
    try {
      db.prepare(`INSERT INTO marriages (jid1, jid2, ring) VALUES (?, ?, ?)`).run(jid1, jid2, ring)
      return true
    } catch { return false }
  },
  divorce(jid) {
    const m = this.get(jid)
    if (!m) return false
    db.prepare(`DELETE FROM marriages WHERE jid1 = ? OR jid2 = ?`).run(jid, jid)
    return true
  },
  getPartner(jid) {
    const m = this.get(jid)
    if (!m) return null
    return m.jid1 === jid ? m.jid2 : m.jid1
  }
}

// ══════════════════════════════════════════════════
// API GUILDES
// ══════════════════════════════════════════════════
export const guildDb = {
  create(name, tag, leaderJid, desc = '') {
    try {
      const r = db.prepare(`INSERT INTO guilds (name, tag, leader, description) VALUES (?, ?, ?, ?)`).run(name, tag.toUpperCase(), leaderJid, desc)
      const guildId = r.lastInsertRowid
      db.prepare(`INSERT OR REPLACE INTO guild_members (jid, guild_id, role) VALUES (?, ?, 'chef')`).run(leaderJid, guildId)
      return { ok: true, id: guildId }
    } catch(e) { return { ok: false, reason: 'Nom déjà pris.' } }
  },

  get(id) { return db.prepare(`SELECT * FROM guilds WHERE id = ?`).get(id) },
  getByName(name) { return db.prepare(`SELECT * FROM guilds WHERE LOWER(name) = LOWER(?)`).get(name) },

  getMember(jid) { return db.prepare(`SELECT gm.*, g.name, g.tag FROM guild_members gm JOIN guilds g ON g.id = gm.guild_id WHERE gm.jid = ?`).get(jid) },

  join(jid, guildId) {
    try {
      db.prepare(`INSERT OR REPLACE INTO guild_members (jid, guild_id) VALUES (?, ?)`).run(jid, guildId)
      return true
    } catch { return false }
  },

  leave(jid) {
    return db.prepare(`DELETE FROM guild_members WHERE jid = ?`).run(jid).changes > 0
  },

  members(guildId) {
    return db.prepare(`SELECT * FROM guild_members WHERE guild_id = ?`).all(guildId)
  },

  leaderboard(limit = 10) {
    return db.prepare(`SELECT g.*, COUNT(gm.jid) as member_count FROM guilds g LEFT JOIN guild_members gm ON g.id = gm.guild_id GROUP BY g.id ORDER BY g.xp DESC LIMIT ?`).all(limit)
  },

  addXp(guildId, amount) {
    db.prepare(`UPDATE guilds SET xp = xp + ? WHERE id = ?`).run(amount, guildId)
  }
}

// ══════════════════════════════════════════════════
// API ANIMAUX VIRTUELS
// ══════════════════════════════════════════════════
export const SPECIES = {
  '🐺 Loup': { emoji: '🐺', power: 'Attaque physique' },
  '🐉 Dragon': { emoji: '🐉', power: 'Souffle de feu' },
  '🦅 Faucon': { emoji: '🦅', power: 'Vision perçante' },
  '🐍 Serpent': { emoji: '🐍', power: 'Venin mortel' },
  '🦁 Lion': { emoji: '🦁', power: 'Rugissement terrifiant' },
  '🐺 Loup noir': { emoji: '🐺', power: 'Attaque nocturne' },
  '🦊 Renard': { emoji: '🦊', power: 'Ruse et esquive' },
  '🦄 Licorne': { emoji: '🦄', power: 'Magie de soin' },
}

export const petDb = {
  get(jid) { return db.prepare(`SELECT * FROM pets WHERE jid = ?`).get(jid) },

  adopt(jid, name, species) {
    try {
      db.prepare(`INSERT INTO pets (jid, name, species) VALUES (?, ?, ?)`).run(jid, name, species)
      return true
    } catch { return false }
  },

  feed(jid) {
    const now = Date.now()
    const pet = this.get(jid)
    if (!pet) return null
    const newHunger = Math.min(100, (pet.hunger || 0) + 30)
    db.prepare(`UPDATE pets SET hunger = ?, last_feed = ? WHERE jid = ?`).run(newHunger, now, jid)
    return this.get(jid)
  },

  play(jid) {
    const now = Date.now()
    const pet = this.get(jid)
    if (!pet) return null
    const newHappiness = Math.min(100, (pet.happiness || 0) + 20)
    const newXp = (pet.xp || 0) + 5
    const newLevel = Math.floor(Math.sqrt(newXp / 10)) + 1
    db.prepare(`UPDATE pets SET happiness = ?, xp = ?, level = ?, last_play = ? WHERE jid = ?`)
      .run(newHappiness, newXp, newLevel, now, jid)
    return this.get(jid)
  },

  decay(jid) {
    const now = Date.now()
    const pet = this.get(jid)
    if (!pet) return
    const hoursSinceFeed = (now - (pet.last_feed || now)) / 3600000
    const hoursSincePlay = (now - (pet.last_play || now)) / 3600000
    const newHunger = Math.max(0, (pet.hunger || 100) - Math.floor(hoursSinceFeed * 5))
    const newHappiness = Math.max(0, (pet.happiness || 100) - Math.floor(hoursSincePlay * 3))
    const newHealth = newHunger < 20 ? Math.max(0, (pet.health || 100) - 10) : pet.health
    db.prepare(`UPDATE pets SET hunger = ?, happiness = ?, health = ? WHERE jid = ?`)
      .run(newHunger, newHappiness, newHealth, jid)
  },

  statusBar(val) {
    const filled = Math.round(val / 10)
    return '█'.repeat(filled) + '░'.repeat(10 - filled)
  }
}

// ══════════════════════════════════════════════════
// API CARTES
// ══════════════════════════════════════════════════
export const CARD_CATALOG = {
  // Communes (60%)
  'c001': { name: '👹 Gobelin',    rarity: '⚪ Commune',    power: 10, emoji: '👹' },
  'c002': { name: '🧟 Zombie',     rarity: '⚪ Commune',    power: 12, emoji: '🧟' },
  'c003': { name: '🐺 Loup',       rarity: '⚪ Commune',    power: 15, emoji: '🐺' },
  'c004': { name: '🕷️ Araignée',  rarity: '⚪ Commune',    power: 8,  emoji: '🕷️' },
  'c005': { name: '🦇 Chauve-souris', rarity: '⚪ Commune', power: 6,  emoji: '🦇' },
  // Rares (30%)
  'r001': { name: '⚔️ Chevalier', rarity: '🔵 Rare',       power: 40, emoji: '⚔️' },
  'r002': { name: '🧙 Sorcier',   rarity: '🔵 Rare',       power: 35, emoji: '🧙' },
  'r003': { name: '🐉 Dragon',     rarity: '🔵 Rare',       power: 55, emoji: '🐉' },
  'r004': { name: '🏹 Archer',     rarity: '🔵 Rare',       power: 38, emoji: '🏹' },
  // Épiques (8%)
  'e001': { name: '☠️ Liche',      rarity: '🟣 Épique',    power: 80, emoji: '☠️' },
  'e002': { name: '👑 Roi Démon',  rarity: '🟣 Épique',    power: 90, emoji: '👑' },
  'e003': { name: '🔥 Phénix',     rarity: '🟣 Épique',    power: 85, emoji: '🔥' },
  // Légendaires (2%)
  'l001': { name: '⛧ LORD DEMON', rarity: '🔴 Légendaire', power: 150, emoji: '⛧' },
  'l002': { name: '💀 Azrael',    rarity: '🔴 Légendaire', power: 140, emoji: '💀' },
}

function randomCard() {
  const roll = Math.random() * 100
  let pool
  if (roll < 2)       pool = Object.keys(CARD_CATALOG).filter(k => k.startsWith('l'))
  else if (roll < 10) pool = Object.keys(CARD_CATALOG).filter(k => k.startsWith('e'))
  else if (roll < 40) pool = Object.keys(CARD_CATALOG).filter(k => k.startsWith('r'))
  else                pool = Object.keys(CARD_CATALOG).filter(k => k.startsWith('c'))
  return pool[Math.floor(Math.random() * pool.length)]
}

export const cardDb = {
  getCollection(jid) {
    return db.prepare(`SELECT card_id, obtained_at FROM cards WHERE jid = ?`).all(jid)
  },

  pull(jid, count = 1) {
    const pulled = []
    for (let i = 0; i < count; i++) {
      const cardId = randomCard()
      try {
        db.prepare(`INSERT OR IGNORE INTO cards (jid, card_id) VALUES (?, ?)`).run(jid, cardId)
      } catch {}
      pulled.push(cardId)
    }
    return pulled
  },

  hasCard(jid, cardId) {
    return !!db.prepare(`SELECT 1 FROM cards WHERE jid = ? AND card_id = ?`).get(jid, cardId)
  },

  count(jid) {
    return db.prepare(`SELECT COUNT(*) as c FROM cards WHERE jid = ?`).get(jid)?.c || 0
  }
}

export { db as econDb }
