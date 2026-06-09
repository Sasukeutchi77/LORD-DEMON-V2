// commands/fight.js — SYSTÈME DE COMBAT AVANCÉ
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const ARMES = [
  { nom: '⚔️ Épée Maudite',     atk: [80,120], critique: 15 },
  { nom: '🗡️ Dague Spectrale',  atk: [60,150], critique: 25 },
  { nom: '🔱 Trident Infernal', atk: [90,130], critique: 20 },
  { nom: '🪓 Hache du Chaos',   atk: [100,140], critique: 10 },
  { nom: '🏹 Arc des Ombres',   atk: [70,160], critique: 30 },
]
const CAPACITES = [
  'Frappe Démoniaque', 'Coup Dévastateur', 'Attaque des Ombres',
  'Foudre Infernale', 'Lame Spectrale', 'Explosion Chaotique',
]
const cooldowns = new Map()

function roll(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function bar(val, max, len = 10) {
  const f = Math.min(Math.round((val / max) * len), len)
  return '█'.repeat(f) + '░'.repeat(len - f)
}

export default async function fight(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if (now - (cooldowns.get(jid) || 0) < 15000)
      return sendMessage(sock, sender, `⏳ Cooldown: ${Math.ceil((15000-(now-(cooldowns.get(jid)||0)))/1000)}s avant le prochain combat !`)
    cooldowns.set(jid, now)

    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const targetName = target ? `@${target.split('@')[0]}` : `un Démon Errant`

    const arme = ARMES[Math.floor(Math.random() * ARMES.length)]
    const cap  = CAPACITES[Math.floor(Math.random() * CAPACITES.length)]

    // Stats combat
    const isCrit  = Math.random() * 100 < arme.critique
    let dmgJoueur = roll(...arme.atk)
    if (isCrit) dmgJoueur = Math.floor(dmgJoueur * 1.8)
    const dmgEnnemi = roll(40, 110)
    const hpMax = 500
    const hpFinal = Math.max(0, hpMax - dmgEnnemi)
    const win = dmgJoueur > dmgEnnemi + 20

    // Récompense économie
    const gains = win ? roll(15, 45) : 0
    if (win && economyDb) economyDb.addCoins(jid, gains)

    const critTxt = isCrit ? `\n☠ *COUP CRITIQUE !* (x1.8)` : ''
    const winTxt  = win
      ? `✅ *VICTOIRE !* +${gains} 🪙`
      : `❌ *DÉFAITE !* Soignez-vous !`

    const mentions = target ? [target] : []
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ⚔️ *SYSTÈME DE COMBAT*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `👤 @${jid.split('@')[0]} vs ☠ ${targetName}\n\n` +
      `${arme.nom} — *${cap}*${critTxt}\n\n` +
      `⚔️ Vos dégâts : *${dmgJoueur}*\n` +
      `🩸 Dégâts reçus : *${dmgEnnemi}*\n\n` +
      `❤️ HP [${bar(hpFinal, hpMax)}] ${hpFinal}/${hpMax}\n\n` +
      `${winTxt}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Puissance des Ténèbres ☠`,
      mentions.length ? { mentions: [jid, ...mentions] } : { mentions: [jid] }
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
