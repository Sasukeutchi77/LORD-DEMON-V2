// commands/invocation.js — SYSTÈME D'INVOCATION PAR RANG
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const DEMONS = [
  { rang: 'I',   nom: 'Imp des Ombres',        puissance: [50,150],   cout: 0,    bonus: 5,   emoji: '👿' },
  { rang: 'II',  nom: 'Spectre Errant',         puissance: [150,300],  cout: 20,   bonus: 15,  emoji: '👻' },
  { rang: 'III', nom: 'Gardien Infernal',        puissance: [300,500],  cout: 50,   bonus: 30,  emoji: '⛧' },
  { rang: 'IV',  nom: 'Démon du Chaos',          puissance: [500,800],  cout: 100,  bonus: 60,  emoji: '🔥' },
  { rang: 'V',   nom: 'Archidémon Ancestral',    puissance: [800,1200], cout: 200,  bonus: 120, emoji: '👹' },
  { rang: 'VI',  nom: 'Seigneur des Ténèbres',   puissance: [1200,1800],cout: 400,  bonus: 250, emoji: '☠' },
  { rang: 'VII', nom: 'Entité du Voile Abyssal', puissance: [1800,2500],cout: 800,  bonus: 500, emoji: '🌑' },
  { rang: 'VIII',nom: 'Nécromancien Primordial', puissance: [2500,3500],cout: 1500, bonus: 900, emoji: '💀' },
  { rang: 'IX',  nom: 'AZRAEL — Ange de Mort',  puissance: [3500,5000],cout: 3000, bonus: 2000,emoji: '⚰️' },
]
const cooldowns = new Map()
function roll(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

export default async function cmd_invocation(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if (now - (cooldowns.get(jid) || 0) < 20000)
      return sendMessage(sock, sender, `⏳ Cooldown invocation: ${Math.ceil((20000-(now-(cooldowns.get(jid)||0)))/1000)}s`)
    cooldowns.set(jid, now)

    // Rang demandé ou aléatoire
    const rangArg = parseInt(args[0])
    let demon
    if (rangArg >= 1 && rangArg <= 9) {
      demon = DEMONS[rangArg - 1]
    } else {
      // Probabilité décroissante selon le rang
      const weights = [30, 25, 18, 12, 7, 4, 2, 1.5, 0.5]
      const total = weights.reduce((a, b) => a + b, 0)
      let r = Math.random() * total, acc = 0
      demon = DEMONS[0]
      for (let i = 0; i < weights.length; i++) { acc += weights[i]; if (r < acc) { demon = DEMONS[i]; break } }
    }

    // Coût économie
    if (demon.cout > 0 && economyDb) {
      const user = economyDb.ensure ? economyDb.ensure(jid) : economyDb.get(jid)
      if (user && user.coins < demon.cout)
        return sendMessage(sock, sender,
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ FONDS INSUFFISANTS   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 Rang ${demon.rang} coûte *${demon.cout}* 🪙\n💰 Vous avez: *${user.coins}* 🪙\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
      if (user && demon.cout > 0) economyDb.removeCoins ? economyDb.removeCoins(jid, demon.cout) : null
    }

    const puissance = roll(...demon.puissance)
    const etoiles = '⭐'.repeat(Math.min(9, parseInt(demon.rang)))
    if (economyDb && demon.bonus) {
      try { if (economyDb.addCoins) economyDb.addCoins(jid, demon.bonus) } catch {}
    }

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔮 *INVOCATION DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${demon.emoji} *${demon.nom}*\n` +
      `✝ Rang : *${demon.rang}* ${etoiles}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⚡ Puissance : *${puissance.toLocaleString()}*\n` +
      `💰 Coût invocation : *${demon.cout}* 🪙\n` +
      `🏆 Bonus obtenu : *+${demon.bonus}* 🪙\n\n` +
      `☩ _Le démon fait allégeance à votre volonté !_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Tip: \`.invocation <1-9>\` pour choisir le rang ☠`
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
