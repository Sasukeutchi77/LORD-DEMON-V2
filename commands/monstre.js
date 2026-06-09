// commands/monstre.js — GÉNÉRATEUR DE MONSTRES AVEC STATS COMPLÈTES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const PREFIXES  = ['Ombre','Sang','Feu','Nuit','Mort','Chaos','Ténèbres','Abîme','Spectre','Venin','Glace','Foudre']
const TYPES     = ['Dragon','Démon','Liche','Golem','Spectre','Vampire','Basilic','Hydre','Wendigo','Banshee','Kraken','Manticore']
const SUFFIXES  = ['Ancien','Corrompu','Légendaire','Maudit','Immortel','Primordial','Abyssal','Infernal','Spectral','du Chaos']
const ELEMENTS  = ['🔥 Feu','❄️ Glace','⚡ Foudre','🌑 Ombre','💧 Eau','⸸ Mort','🌪️ Vent','🩸 Sang']
const CAPACITES = ['Souffle Dévastateur','Dévoration d\'Âme','Régénération Infernale','Aura de Terreur','Malédiction Ancienne','Explosion Chaotique','Vol de Force Vitale','Invocation d\'Armée','Absorption de Magie']
const FAIBLESSES= ['Lumière Sacrée ✨','Feu Béni 🕯️','Sel Sanctifié 🧂','Son Aigu 🔔','Eau Bénite 💧','Acier Argenté ⚔️']
const BUTINS    = ['Écaille Légendaire','Corne de Démon','Essence Chaotique','Croc Maudit','Phylactère Ancien','Sang Élémentaire','Cristal d\'Abîsse','Rune Primordiale']

function roll(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function bar(val, max, len=10) { const f=Math.min(Math.round((val/max)*len),len); return '█'.repeat(f)+'░'.repeat(len-f) }
const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const cooldowns = new Map()

export default async function monstre(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if (now - (cooldowns.get(jid)||0) < 15000)
      return sendMessage(sock, sender, `⏳ ${Math.ceil((15000-(now-(cooldowns.get(jid)||0)))/1000)}s avant la prochaine rencontre`)
    cooldowns.set(jid, now)

    const nom = `${rand(PREFIXES)}${rand(TYPES)} ${rand(SUFFIXES)}`
    const level = roll(1, 100)
    const rang  = level >= 90 ? '👑 BOSS LÉGENDAIRE' : level >= 70 ? '🔴 ÉPIQUE' : level >= 50 ? '🟣 RARE' : level >= 30 ? '🔵 COMMUN' : '⚪ FAIBLE'
    const hp    = level * roll(80, 150)
    const atk   = level * roll(8, 15)
    const def   = level * roll(5, 12)
    const elem  = rand(ELEMENTS)
    const capa  = rand(CAPACITES)
    const faib  = rand(FAIBLESSES)
    const butin = rand(BUTINS)
    const xp    = level * roll(20, 40)
    const coins = Math.floor(level * roll(5, 15))

    // Calcul du combat joueur
    const playerAtk = roll(100, 800)
    const playerDef = roll(50, 300)
    const dmgDeal   = Math.max(0, playerAtk - def)
    const dmgRecv   = Math.max(0, atk * 0.3 - playerDef * 0.5)
    const win       = dmgDeal > hp * 0.4

    if (win && economyDb) {
      try { if (economyDb.addCoins) economyDb.addCoins(jid, coins) } catch {}
    }

    const hpBar  = bar(hp, level*150)
    const winTxt = win
      ? `✅ *VICTOIRE !* XP: +${xp} | 💰 +${coins} 🪙 | 🎁 ${butin}`
      : `❌ *DÉFAITE !* Le monstre est trop puissant — revenez plus fort !`

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   👹 *MONSTRE RENCONTRÉ*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠ *${nom}*\n` +
      `🏷️ ${rang} | Niv.*${level}*\n` +
      `🌀 Élément : ${elem}\n\n` +
      `❤️ HP [${hpBar}] *${hp.toLocaleString()}*\n` +
      `⚔️ ATK : *${atk}* | 🛡️ DEF : *${def}*\n\n` +
      `💥 *Capacité :* ${capa}\n` +
      `⚠️ *Faiblesse :* ${faib}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🗡️ Votre frappe : *${dmgDeal}* dégâts infligés\n` +
      `🩸 Dégâts reçus : *${Math.floor(dmgRecv)}*\n\n` +
      `${winTxt}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Chasse aux Monstres ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
