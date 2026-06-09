// commands/luck.js — CHANCE QUOTIDIENNE AVEC EFFETS RÉELS
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const NIVEAUX = [
  { min:0,  max:5,  nom:'💀 MALÉDICTION TOTALE',    emoji:'☠', desc:'Les forces obscures s\'acharnent sur vous', bonus:-50,  couleur:'ROUGE SANG' },
  { min:6,  max:20, nom:'🌑 Très Malchanceux',       emoji:'⸸', desc:'Les ombres vous tournent le dos',          bonus:-20,  couleur:'NOIR' },
  { min:21, max:40, nom:'⚫ Malchanceux',             emoji:'✝', desc:'La chance vous évite ce jour',            bonus:-5,   couleur:'SOMBRE' },
  { min:41, max:60, nom:'⚪ Neutre',                  emoji:'☩', desc:'L\'équilibre des forces',                 bonus:0,    couleur:'GRIS' },
  { min:61, max:75, nom:'🟡 Chanceux',                emoji:'⛧', desc:'Les astres vous sourient légèrement',    bonus:10,   couleur:'DORÉ' },
  { min:76, max:88, nom:'🟠 Très Chanceux',           emoji:'🍀', desc:'La fortune démonique vous favorise',    bonus:30,   couleur:'ORANGE' },
  { min:89, max:96, nom:'🔴 BÉNI DES TÉNÈBRES',      emoji:'🌟', desc:'Le Seigneur vous accorde sa faveur',     bonus:75,   couleur:'ROUGE' },
  { min:97, max:99, nom:'💎 ÉTOILE DÉMONIAQUE',       emoji:'💫', desc:'Vous êtes l\'élu du Chaos ce jour',     bonus:150,  couleur:'DIAMANT' },
  { min:100,max:100,nom:'⛧ GRÂCE ABSOLUE D\'AZRAEL', emoji:'👑', desc:'MIRACLE — Azrael lui-même vous bénit',  bonus:500,  couleur:'LÉGENDAIRE' },
]
const EFFETS = [
  'Les dés vous favorisent (+15% gains en jeux)',
  'Votre instinct est aiguisé (esquive +20%)',
  'Les marchands baissent leurs prix pour vous',
  'Les ennemis vous craignent aujourd\'hui',
  'Un trésor caché vous attend quelque part',
  'Vos sorts ont +25% de puissance',
]
const cooldowns = new Map() // jid → {last, count}

export default async function luck(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid

    // Cooldown 1h pour la chance quotidienne
    const now = Date.now()
    const data = cooldowns.get(jid) || { last: 0, count: 0 }
    if (now - data.last < 3600000) {
      const reste = Math.ceil((3600000 - (now - data.last)) / 60000)
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🍀 *CHANCE DÉJÀ CONSULTÉE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠ Prochaine consultation dans *${reste} min*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
    cooldowns.set(jid, { last: now, count: data.count + 1 })

    const num    = Math.floor(Math.random() * 101)
    const niveau = NIVEAUX.find(n => num >= n.min && num <= n.max) || NIVEAUX[3]
    const barre  = '█'.repeat(Math.floor(num / 10)) + '░'.repeat(10 - Math.floor(num / 10))
    const effet  = EFFETS[Math.floor(Math.random() * EFFETS.length)]
    const mentions = target !== jid ? [target] : []

    // Appliquer bonus/malus économie
    if (niveau.bonus !== 0 && economyDb) {
      try {
        if (niveau.bonus > 0 && economyDb.addCoins) economyDb.addCoins(target, niveau.bonus)
        else if (niveau.bonus < 0 && economyDb.removeCoins) economyDb.removeCoins(target, Math.abs(niveau.bonus))
      } catch {}
    }

    const bonusTxt = niveau.bonus > 0
      ? `💰 Bonus : *+${niveau.bonus}* 🪙 accordé !`
      : niveau.bonus < 0
      ? `💸 Malus : *-${Math.abs(niveau.bonus)}* 🪙 perdu...`
      : `⚖️ Aucun changement de fortune`

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🍀 *CHANCE DU JOUR*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `👤 @${target.split('@')[0]}\n\n` +
      `[${barre}] *${num}/100*\n` +
      `${niveau.emoji} *${niveau.nom}*\n\n` +
      `✨ _${niveau.desc}_\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⚡ *Effet du jour :*\n_${effet}_\n\n` +
      `${bonusTxt}\n` +
      `🎨 Couleur de destin : *${niveau.couleur}*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Prochaine chance dans 1h ☠`,
      mentions.length ? { mentions } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
