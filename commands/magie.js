// commands/magie.js — SYSTÈME DE MAGIE AVANCÉ
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const SORTS = [
  { nom: 'Ignis Daemonicus',   type: 'Attaque',    dmg: [120,200], mana: 40,  effet: '🔥 Flammes infernales — brûle et diminue la défense' },
  { nom: 'Glacius Mortis',     type: 'Attaque',    dmg: [80,160],  mana: 30,  effet: '❄️ Blizzard de la mort — ralentit et gèle' },
  { nom: 'Fulgur Abyssi',      type: 'Attaque',    dmg: [150,250], mana: 60,  effet: '⚡ Foudre abyssale — paralysie instantanée' },
  { nom: 'Vita Daemonica',     type: 'Soin',       dmg: [100,180], mana: 35,  effet: '💚 Régénération démoniaque — restaure les HP' },
  { nom: 'Umbra Suprema',      type: 'Malédiction',dmg: [90,140],  mana: 50,  effet: '🌑 Ombre absolue — réduit l'attaque ennemie de 40%' },
  { nom: 'Chaos Primordialis', type: 'Ultime',     dmg: [200,350], mana: 100, effet: '💥 Chaos primordial — dégâts massifs en zone' },
  { nom: 'Nexus Demonicus',    type: 'Portail',    dmg: [60,120],  mana: 45,  effet: '🌀 Portail démoniaque — convoque un allié' },
  { nom: 'Anima Vorantis',     type: 'Vol d'âme',  dmg: [110,170], mana: 55,  effet: '☠ Dévoration — vole 30% des HP ennemis' },
  { nom: 'Mortis Vinculum',    type: 'Chaînes',    dmg: [70,130],  mana: 38,  effet: '⛓️ Chaînes de la mort — immobilise 3 tours' },
  { nom: 'Lux Malefica',       type: 'Lumière',    dmg: [130,210], mana: 65,  effet: '✨ Lumière maudite — détruit les protections' },
]
const cooldowns = new Map()
function roll(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

export default async function cmd_magie(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if (now - (cooldowns.get(jid) || 0) < 12000)
      return sendMessage(sock, sender, `⏳ Recharge du sort: ${Math.ceil((12000-(now-(cooldowns.get(jid)||0)))/1000)}s`)
    cooldowns.set(jid, now)

    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const sort = SORTS[Math.floor(Math.random() * SORTS.length)]
    const isCrit = Math.random() < 0.18
    let valeur = roll(...sort.dmg)
    if (isCrit) valeur = Math.floor(valeur * 1.75)
    const critTxt = isCrit ? '\n☠ *SORT CRITIQUE !* ×1.75 ✨' : ''
    const label = sort.type === 'Soin' ? `💚 Soins : *+${valeur} HP*` : `💥 Dégâts : *${valeur}*`
    const targetStr = target !== jid ? `@${target.split('@')[0]}` : 'vous-même'
    const stars = '⭐'.repeat(Math.min(5, Math.ceil(valeur / 70)))

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔮 *INCANTATION DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `✝ Sort : *${sort.nom}*\n` +
      `☩ Type : *${sort.type}* ${stars}\n` +
      `☠ Mana : *${sort.mana}* 💧\n` +
      `⛧ Cible : *${targetStr}*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🌀 *Effet :* ${sort.effet}${critTxt}\n\n` +
      `${label}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Magie des Ténèbres ☠`,
      target !== jid ? { mentions: [target] } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
