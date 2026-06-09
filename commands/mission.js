// commands/mission.js — SYSTÈME DE MISSIONS AVEC RÉCOMPENSES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const MISSIONS = [
  // [difficulté, mission, xp, coins, durée]
  { diff: '⚪ COMMUNE',    emoji: '📜', txt: 'Survivre à la nuit dans les Bois Maudits',        xp: 50,   coins: 30,  duree: '15 min' },
  { diff: '⚪ COMMUNE',    emoji: '📜', txt: 'Collecter 10 herbes de Mandragore Noire',          xp: 40,   coins: 25,  duree: '10 min' },
  { diff: '🔵 RARE',       emoji: '📘', txt: 'Vaincre le Golem de Lave du Volcan Abyssal',      xp: 150,  coins: 90,  duree: '30 min' },
  { diff: '🔵 RARE',       emoji: '📘', txt: 'Décrypter le Grimoire des Sept Sceaux',            xp: 120,  coins: 75,  duree: '25 min' },
  { diff: '🟣 ÉPIQUE',     emoji: '📙', txt: 'Tuer l\'Archidémon du 5e Cercle',                  xp: 400,  coins: 250, duree: '1h' },
  { diff: '🟣 ÉPIQUE',     emoji: '📙', txt: 'Voler le Sceau d\'Azrael dans le Tombeau Infernal',xp: 350,  coins: 220, duree: '45 min' },
  { diff: '🔴 LÉGENDAIRE', emoji: '📕', txt: 'Ouvrir le Portail du Neuvième Enfer',              xp: 1000, coins: 800, duree: '3h' },
  { diff: '🔴 LÉGENDAIRE', emoji: '📕', txt: 'Sceller Lucifer dans son Trône de Ténèbres',      xp: 1200, coins: 1000,duree: '4h' },
  { diff: '☠ ABYSSALE',    emoji: '💀', txt: 'Traverser le Voile et revenir vivant',             xp: 3000, coins: 2500,duree: '12h' },
  { diff: '☠ ABYSSALE',    emoji: '💀', txt: 'Briser le Sceau du Chaos Primordial',              xp: 5000, coins: 4000,duree: '24h' },
]
const weights = [20, 20, 15, 15, 10, 10, 4, 4, 1, 1]
const cooldowns = new Map()

export default async function cmd_mission(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    const cdTime = 30 * 60 * 1000 // 30 min
    const lastMission = cooldowns.get(jid) || 0
    if (now - lastMission < cdTime) {
      const reste = Math.ceil((cdTime - (now - lastMission)) / 60000)
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⏳ *REPOS OBLIGATOIRE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠ Prochaine mission dans *${reste} min*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
    cooldowns.set(jid, now)

    // Tirage pondéré
    const total = weights.reduce((a, b) => a + b, 0)
    let r = Math.random() * total, acc = 0, mission = MISSIONS[0]
    for (let i = 0; i < weights.length; i++) { acc += weights[i]; if (r < acc) { mission = MISSIONS[i]; break } }

    // Résultat aléatoire (succès/échec partiel)
    const roll = Math.random()
    const succes = roll > 0.25
    const partiel = roll > 0.10 && roll <= 0.25
    const xpObtenu  = succes ? mission.xp : partiel ? Math.floor(mission.xp * 0.4) : 0
    const gainCoins = succes ? mission.coins : partiel ? Math.floor(mission.coins * 0.3) : 0
    const statusTxt = succes ? `✅ *MISSION ACCOMPLIE !*` : partiel ? `⚠️ *Succès partiel...*` : `❌ *Mission échouée*`

    if (gainCoins > 0 && economyDb) {
      try { if (economyDb.addCoins) economyDb.addCoins(jid, gainCoins) } catch {}
    }

    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ${mission.emoji} *MISSION DU SEIGNEUR*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `👤 @${target.split('@')[0]}\n` +
      `🏷️ Difficulté : ${mission.diff}\n\n` +
      `📋 *Objectif :*\n_${mission.txt}_\n\n` +
      `⏱️ Durée estimée : *${mission.duree}*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `${statusTxt}\n` +
      `⚡ XP : *+${xpObtenu}*\n` +
      `💰 Récompense : *+${gainCoins}* 🪙\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Prochaine mission disponible dans 30min ☠`,
      target !== jid ? { mentions: [target] } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
