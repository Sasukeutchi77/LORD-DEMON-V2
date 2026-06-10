// lib/rpgSystem.js — LORD DEMON V2
// RPG Textuel Complet : Classes, Donjons, Boss, Inventaire

import Database from 'node-sqlite3-wasm'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = path.join(__dirname, '..', 'data', 'demon.db')
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)
db.exec('PRAGMA journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS rpg_heroes (
    jid         TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    class       TEXT NOT NULL,
    level       INTEGER DEFAULT 1,
    xp          INTEGER DEFAULT 0,
    hp          INTEGER DEFAULT 100,
    max_hp      INTEGER DEFAULT 100,
    attack      INTEGER DEFAULT 10,
    defense     INTEGER DEFAULT 5,
    mana        INTEGER DEFAULT 50,
    max_mana    INTEGER DEFAULT 50,
    gold        INTEGER DEFAULT 0,
    equipment   TEXT DEFAULT '{}',
    skills      TEXT DEFAULT '[]',
    dungeons    INTEGER DEFAULT 0,
    kills       INTEGER DEFAULT 0,
    deaths      INTEGER DEFAULT 0,
    created_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
  );

  CREATE TABLE IF NOT EXISTS rpg_battles (
    jid         TEXT PRIMARY KEY,
    enemy       TEXT NOT NULL,
    enemy_hp    INTEGER NOT NULL,
    enemy_max_hp INTEGER NOT NULL,
    turn        INTEGER DEFAULT 1,
    started_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
  );
`)

// ══════════════════════════════════════════════════
// CLASSES RPG
// ══════════════════════════════════════════════════
export const RPG_CLASSES = {
  guerrier: {
    emoji: '⚔️', name: 'Guerrier',
    hp: 150, attack: 15, defense: 10, mana: 30,
    desc: 'Tank puissant, fort en défense',
    skills: ['Coup de bouclier', 'Rage de combat', 'Forteresse']
  },
  mage: {
    emoji: '🧙', name: 'Mage',
    hp: 80, attack: 25, defense: 3, mana: 120,
    desc: 'Attaque magique dévastatrice',
    skills: ['Boule de feu', 'Éclair', 'Tempête arcanique']
  },
  assassin: {
    emoji: '🗡️', name: 'Assassin',
    hp: 100, attack: 20, defense: 5, mana: 60,
    desc: 'Critique et esquive élevés',
    skills: ['Coup fatal', 'Disparaître', 'Poison mortel']
  },
  paladin: {
    emoji: '🛡️', name: 'Paladin',
    hp: 120, attack: 12, defense: 15, mana: 80,
    desc: 'Soin et protection divine',
    skills: ['Soin divin', 'Bouclier sacré', 'Jugement']
  },
  archer: {
    emoji: '🏹', name: 'Archer',
    hp: 90, attack: 18, defense: 6, mana: 50,
    desc: 'Distance et précision mortelle',
    skills: ['Flèche percante', 'Pluie de flèches', 'Tir de précision']
  },
  necromancien: {
    emoji: '☠️', name: 'Nécromancien',
    hp: 85, attack: 22, defense: 4, mana: 100,
    desc: 'Invoque les morts, drain de vie',
    skills: ['Drain de vie', 'Invoquer squelette', 'Malédiction']
  }
}

// ══════════════════════════════════════════════════
// ENNEMIS & BOSS
// ══════════════════════════════════════════════════
export const ENEMIES = {
  // Donjons normaux
  gobelin:     { name: '👹 Gobelin',    hp: 30,  atk: 8,  def: 2,  xp: 20,  gold: 15 },
  zombie:      { name: '🧟 Zombie',     hp: 45,  atk: 10, def: 3,  xp: 30,  gold: 20 },
  loup_noir:   { name: '🐺 Loup Noir',  hp: 60,  atk: 14, def: 4,  xp: 40,  gold: 30 },
  vampire:     { name: '🧛 Vampire',    hp: 80,  atk: 18, def: 6,  xp: 60,  gold: 50 },
  golem:       { name: '🗿 Golem',      hp: 120, atk: 12, def: 15, xp: 80,  gold: 65 },
  // Élites
  chevalier_mort: { name: '💀 Chevalier Mort', hp: 150, atk: 22, def: 12, xp: 120, gold: 100 },
  liche:       { name: '☠️ Liche',      hp: 180, atk: 28, def: 8,  xp: 150, gold: 130 },
  // BOSS
  dragon_rouge: { name: '🐉 Dragon Rouge', hp: 500, atk: 40, def: 20, xp: 500, gold: 400, isBoss: true },
  seigneur_demon: { name: '👑 Seigneur Démon', hp: 800, atk: 55, def: 30, xp: 1000, gold: 800, isBoss: true },
  azrael: { name: '💀 AZRAEL', hp: 1200, atk: 70, def: 40, xp: 2000, gold: 1500, isBoss: true },
}

export const DUNGEONS = [
  { id: 1, name: '🏚️ Crypte Maudite',    enemies: ['gobelin','zombie'],          minLevel: 1  },
  { id: 2, name: '🌲 Forêt des Ombres',  enemies: ['loup_noir','vampire'],       minLevel: 5  },
  { id: 3, name: '🏔️ Montagne de Feu',  enemies: ['golem','chevalier_mort'],    minLevel: 10 },
  { id: 4, name: '🏰 Château du Démon',  enemies: ['liche','seigneur_demon'],    minLevel: 20 },
  { id: 5, name: '☠️ Domaine d\'Azrael', enemies: ['liche','azrael'],           minLevel: 40 },
]

// ══════════════════════════════════════════════════
// ÉQUIPEMENTS
// ══════════════════════════════════════════════════
export const EQUIPMENT = {
  // Armes
  epee_rouille:    { name: '🗡️ Épée rouillée',  slot: 'weapon', atk: 5,  def: 0, price: 50  },
  epee_acier:      { name: '⚔️ Épée en acier',  slot: 'weapon', atk: 15, def: 0, price: 200 },
  baton_magique:   { name: '🪄 Bâton magique',   slot: 'weapon', atk: 20, def: 0, price: 300 },
  arc_long:        { name: '🏹 Arc long',         slot: 'weapon', atk: 12, def: 0, price: 180 },
  // Armures
  armure_cuir:     { name: '🥋 Armure de cuir',  slot: 'armor',  atk: 0, def: 8,  price: 100 },
  armure_acier:    { name: '🛡️ Armure en acier', slot: 'armor',  atk: 0, def: 20, price: 400 },
  robe_mage:       { name: '👘 Robe de mage',    slot: 'armor',  atk: 5, def: 5,  price: 250 },
}

// ══════════════════════════════════════════════════
// LOGIQUE DE COMBAT
// ══════════════════════════════════════════════════
export function calculateDamage(attacker, target, isCrit = false) {
  const baseDmg = Math.max(1, attacker.attack - Math.floor(target.defense / 2))
  const roll = Math.floor(Math.random() * 5) - 2
  const dmg = Math.max(1, baseDmg + roll)
  return isCrit ? Math.floor(dmg * 1.8) : dmg
}

export function getCritChance(heroClass) {
  return heroClass === 'assassin' ? 0.30 : heroClass === 'archer' ? 0.20 : 0.10
}

export function getXpForLevel(level) { return ((level - 1) ** 2) * 50 }
export function getLevelFromXp(xp) { return Math.floor(Math.sqrt((xp || 0) / 50)) + 1 }

export function levelUpStats(hero, cls) {
  const classData = RPG_CLASSES[cls] || RPG_CLASSES.guerrier
  return {
    max_hp: hero.max_hp + Math.floor(classData.hp / 10),
    attack: hero.attack + Math.floor(classData.attack / 10),
    defense: hero.defense + Math.floor(classData.defense / 10),
    max_mana: hero.max_mana + Math.floor(classData.mana / 10),
  }
}

// ══════════════════════════════════════════════════
// API RPG
// ══════════════════════════════════════════════════
export const rpgDb = {
  getHero(jid) { return db.prepare(`SELECT * FROM rpg_heroes WHERE jid = ?`).get(jid) },

  createHero(jid, name, heroClass) {
    const cls = RPG_CLASSES[heroClass]
    if (!cls) return false
    try {
      db.prepare(`INSERT INTO rpg_heroes (jid, name, class, hp, max_hp, attack, defense, mana, max_mana, skills)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(jid, name, heroClass, cls.hp, cls.hp, cls.attack, cls.defense, cls.mana, cls.mana, JSON.stringify(cls.skills))
      return true
    } catch { return false }
  },

  updateHero(jid, data) {
    const sets = Object.keys(data).map(k => `${k} = ?`).join(', ')
    const vals = Object.values(data)
    db.prepare(`UPDATE rpg_heroes SET ${sets} WHERE jid = ?`).run(...vals, jid)
    return this.getHero(jid)
  },

  addXp(jid, amount) {
    const hero = this.getHero(jid)
    if (!hero) return null
    const newXp = hero.xp + amount
    const newLevel = getLevelFromXp(newXp)
    const leveledUp = newLevel > hero.level
    let updates = { xp: newXp, level: newLevel }
    if (leveledUp) {
      const bonus = levelUpStats(hero, hero.class)
      updates = { ...updates, ...bonus, hp: bonus.max_hp, mana: bonus.max_mana }
    }
    this.updateHero(jid, updates)
    return { hero: this.getHero(jid), leveledUp, newLevel }
  },

  startBattle(jid, enemyKey) {
    const enemy = ENEMIES[enemyKey]
    if (!enemy) return false
    db.prepare(`INSERT OR REPLACE INTO rpg_battles (jid, enemy, enemy_hp, enemy_max_hp) VALUES (?, ?, ?, ?)`)
      .run(jid, enemyKey, enemy.hp, enemy.hp)
    return true
  },

  getBattle(jid) { return db.prepare(`SELECT * FROM rpg_battles WHERE jid = ?`).get(jid) },

  endBattle(jid) { db.prepare(`DELETE FROM rpg_battles WHERE jid = ?`).run(jid) },

  updateBattle(jid, data) {
    const sets = Object.keys(data).map(k => `${k} = ?`).join(', ')
    db.prepare(`UPDATE rpg_battles SET ${sets} WHERE jid = ?`).run(...Object.values(data), jid)
  },

  leaderboard(limit = 10) {
    return db.prepare(`SELECT * FROM rpg_heroes ORDER BY level DESC, xp DESC LIMIT ?`).all(limit)
  }
}

export { db as rpgDbRaw }
