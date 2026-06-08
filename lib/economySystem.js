// lib/economySystem.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  SYSTÈME ÉCONOMIQUE COMPLET — SQLite                 ║
// ║  Coins, banque, travail, vol, jeux, loterie          ║
// ╚══════════════════════════════════════════════════════╝

import Database from 'better-sqlite3'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = path.join(__dirname, '..', 'data', 'demon.db')

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS economy (
    jid           TEXT PRIMARY KEY,
    coins         INTEGER DEFAULT 0,
    bank          INTEGER DEFAULT 0,
    total_earned  INTEGER DEFAULT 0,
    total_spent   INTEGER DEFAULT 0,
    last_work     INTEGER DEFAULT 0,
    last_daily    INTEGER DEFAULT 0,
    last_rob      INTEGER DEFAULT 0,
    work_streak   INTEGER DEFAULT 0,
    created_at    INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS lottery (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    jackpot     INTEGER DEFAULT 1000,
    last_draw   INTEGER DEFAULT 0,
    active      INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS lottery_tickets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id    TEXT NOT NULL,
    user_jid    TEXT NOT NULL,
    tickets     INTEGER DEFAULT 1,
    bought_at   INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS economy_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    jid         TEXT NOT NULL,
    type        TEXT NOT NULL,
    amount      INTEGER NOT NULL,
    description TEXT,
    created_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
  );
`)

// ── Config ───────────────────────────────────────────────
export const ECONOMY = {
  WORK_COOLDOWN:    30 * 60 * 1000,   // 30 min
  DAILY_COOLDOWN:   24 * 60 * 60 * 1000,
  ROB_COOLDOWN:     60 * 60 * 1000,   // 1h
  WORK_MIN:         50,
  WORK_MAX:         300,
  DAILY_BASE:       200,
  DAILY_STREAK_BONUS: 50,
  ROB_SUCCESS_RATE: 0.35,
  ROB_MIN_WALLET:   100,
  LOTTERY_TICKET:   100,
  LOTTERY_CUT:      0.10,  // 10% du jackpot au bot
  BLACKJACK_MIN:    10,
  SLOTS_MIN:        10,
  DUEL_MIN:         10,
  SYMBOL:           '🪙',
}

export const ecoDb = {
  get(jid) {
    return db.prepare('SELECT * FROM economy WHERE jid = ?').get(jid) || { jid, coins: 0, bank: 0, total_earned: 0, total_spent: 0, last_work: 0, last_daily: 0, last_rob: 0, work_streak: 0 }
  },

  ensure(jid) {
    db.prepare('INSERT OR IGNORE INTO economy (jid) VALUES (?)').run(jid)
    return this.get(jid)
  },

  addCoins(jid, amount, description = '') {
    this.ensure(jid)
    db.prepare('UPDATE economy SET coins = coins + ?, total_earned = total_earned + ? WHERE jid = ?').run(Math.abs(amount), Math.abs(amount), jid)
    this.log(jid, 'earn', amount, description)
    return this.get(jid)
  },

  removeCoins(jid, amount, description = '') {
    this.ensure(jid)
    const user = this.get(jid)
    const actual = Math.min(amount, user.coins)
    db.prepare('UPDATE economy SET coins = MAX(0, coins - ?), total_spent = total_spent + ? WHERE jid = ?').run(amount, actual, jid)
    this.log(jid, 'spend', amount, description)
    return this.get(jid)
  },

  transfer(fromJid, toJid, amount) {
    this.ensure(fromJid); this.ensure(toJid)
    const from = this.get(fromJid)
    if (from.coins < amount) return { ok: false, reason: 'Pas assez de coins' }
    db.prepare('UPDATE economy SET coins = coins - ? WHERE jid = ?').run(amount, fromJid)
    db.prepare('UPDATE economy SET coins = coins + ?, total_earned = total_earned + ? WHERE jid = ?').run(amount, amount, toJid)
    this.log(fromJid, 'transfer_out', amount, `→ ${toJid}`)
    this.log(toJid, 'transfer_in', amount, `← ${fromJid}`)
    return { ok: true }
  },

  deposit(jid, amount) {
    this.ensure(jid)
    const user = this.get(jid)
    if (user.coins < amount) return { ok: false, reason: 'Pas assez de coins en poche' }
    db.prepare('UPDATE economy SET coins = coins - ?, bank = bank + ? WHERE jid = ?').run(amount, amount, jid)
    return { ok: true }
  },

  withdraw(jid, amount) {
    this.ensure(jid)
    const user = this.get(jid)
    if (user.bank < amount) return { ok: false, reason: 'Pas assez de coins en banque' }
    db.prepare('UPDATE economy SET bank = bank - ?, coins = coins + ? WHERE jid = ?').run(amount, amount, jid)
    return { ok: true }
  },

  setWork(jid, streak = 0) {
    db.prepare('UPDATE economy SET last_work = ?, work_streak = ? WHERE jid = ?').run(Date.now(), streak, jid)
  },

  setDaily(jid) {
    db.prepare('UPDATE economy SET last_daily = ? WHERE jid = ?').run(Date.now(), jid)
  },

  setRob(jid) {
    db.prepare('UPDATE economy SET last_rob = ? WHERE jid = ?').run(Date.now(), jid)
  },

  leaderboard(limit = 10) {
    return db.prepare('SELECT jid, coins + bank as total, coins, bank, total_earned FROM economy ORDER BY total DESC LIMIT ?').all(limit)
  },

  log(jid, type, amount, description = '') {
    try { db.prepare('INSERT INTO economy_log (jid, type, amount, description) VALUES (?, ?, ?, ?)').run(jid, type, amount, description) } catch {}
  }
}

// ── Slots symboles & logique ─────────────────────────────
export const SLOTS_SYMBOLS = ['🍒','🍊','🍋','🍇','💎','👑','🎰']
export const SLOTS_PAYOUTS = {
  '🎰🎰🎰': 50,  '👑👑👑': 20,  '💎💎💎': 15,
  '🍇🍇🍇': 10,  '🍋🍋🍋': 7,   '🍊🍊🍊': 5,
  '🍒🍒🍒': 3,   '🍒🍒': 2,    '💎💎': 1.5,
}

export function spinSlots() {
  return [0,1,2].map(() => SLOTS_SYMBOLS[Math.floor(Math.random() * SLOTS_SYMBOLS.length)])
}

export function calcSlotWin(reels, bet) {
  const [a,b,c] = reels
  const key3 = `${a}${b}${c}`
  const key2 = `${a}${b}`
  if (SLOTS_PAYOUTS[key3]) return { win: true, mult: SLOTS_PAYOUTS[key3], combo: key3 }
  if (a === b && SLOTS_PAYOUTS[key2]) return { win: true, mult: SLOTS_PAYOUTS[key2], combo: key2 }
  return { win: false, mult: 0, combo: '' }
}

// ── Blackjack logique ────────────────────────────────────
export const CARD_VALUES = { 'A': 11, '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10 }
export const CARD_SUITS  = ['♠','♥','♦','♣']
export const CARD_RANKS  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

export function makeDeck() {
  const deck = []
  for (const s of CARD_SUITS) for (const r of CARD_RANKS) deck.push(`${r}${s}`)
  return deck.sort(() => Math.random() - 0.5)
}

export function handValue(hand) {
  let total = 0, aces = 0
  for (const card of hand) {
    const rank = card.replace(/[♠♥♦♣]/g, '')
    total += CARD_VALUES[rank] || 0
    if (rank === 'A') aces++
  }
  while (total > 21 && aces > 0) { total -= 10; aces-- }
  return total
}

// ── Lottery ──────────────────────────────────────────────
export const lotteryDb = {
  get(groupId) {
    let row = db.prepare('SELECT * FROM lottery WHERE group_id = ?').get(groupId)
    if (!row) {
      db.prepare('INSERT INTO lottery (group_id) VALUES (?)').run(groupId)
      row = db.prepare('SELECT * FROM lottery WHERE group_id = ?').get(groupId)
    }
    return row
  },

  addJackpot(groupId, amount) {
    db.prepare('UPDATE lottery SET jackpot = jackpot + ? WHERE group_id = ?').run(amount, groupId)
  },

  getTickets(groupId) {
    return db.prepare('SELECT * FROM lottery_tickets WHERE group_id = ?').all(groupId)
  },

  getUserTickets(groupId, jid) {
    const row = db.prepare('SELECT tickets FROM lottery_tickets WHERE group_id = ? AND user_jid = ?').get(groupId, jid)
    return row?.tickets || 0
  },

  addTicket(groupId, jid) {
    const existing = db.prepare('SELECT id FROM lottery_tickets WHERE group_id = ? AND user_jid = ?').get(groupId, jid)
    if (existing) {
      db.prepare('UPDATE lottery_tickets SET tickets = tickets + 1 WHERE group_id = ? AND user_jid = ?').run(groupId, jid)
    } else {
      db.prepare('INSERT INTO lottery_tickets (group_id, user_jid, tickets) VALUES (?, ?, 1)').run(groupId, jid)
    }
  },

  draw(groupId) {
    const tickets = this.getTickets(groupId)
    if (!tickets.length) return null
    // Pondéré par nombre de tickets
    const pool = []
    for (const t of tickets) for (let i = 0; i < t.tickets; i++) pool.push(t.user_jid)
    const winner = pool[Math.floor(Math.random() * pool.length)]
    // Reset
    db.prepare('DELETE FROM lottery_tickets WHERE group_id = ?').run(groupId)
    const lot = this.get(groupId)
    const prize = Math.floor(lot.jackpot * (1 - ECONOMY.LOTTERY_CUT))
    db.prepare('UPDATE lottery SET jackpot = 1000, last_draw = ? WHERE group_id = ?').run(Date.now(), groupId)
    return { winner, prize, totalTickets: pool.length }
  }
}

export { db as ecoRawDb }
