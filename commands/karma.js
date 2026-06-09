// commands/karma.js — KARMA AVEC HISTORIQUE D'ÉVÉNEMENTS
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const NIVEAUX = [
  { min:0,  max:10, nom:'☠ KARMA ABYSSAL',      desc:'Âme corrompue au-delà du rachat',           effet:'Malédiction perpétuelle — tout va de travers' },
  { min:11, max:25, nom:'⸸ Karma Maudit',        desc:'Les forces obscures vous accablent',          effet:'Malchance chronique (-30% à tout)' },
  { min:26, max:40, nom:'💀 Mauvais Karma',       desc:'Vos actions passées vous reviennent',         effet:'Malus fréquents dans les jeux' },
  { min:41, max:59, nom:'⚪ Karma Neutre',         desc:'L\'équilibre entre lumière et ombre',         effet:'Aucun effet particulier' },
  { min:60, max:74, nom:'✝ Bon Karma',            desc:'Les bonnes actions portent leurs fruits',      effet:'Légère chance bonus (+10%)' },
  { min:75, max:88, nom:'⛧ Karma Démoniaque',     desc:'Maître des forces obscures bienveillantes',   effet:'Puissance bonus +25% dans les combats' },
  { min:89, max:96, nom:'☩ Karma Transcendant',   desc:'Seigneur de l\'Abîsse — favori des dieux',    effet:'Bonus massif +50%, récompenses doublées' },
  { min:97, max:99, nom:'💫 Karma Légendaire',     desc:'Élu des ténèbres, béni d\'Azrael',            effet:'Immunité aux malédictions + fortune permanente' },
  { min:100,max:100,nom:'👑 KARMA DIVIN ABSOLU',  desc:'Transcendance totale — vous êtes intouchable', effet:'TOUT est possible — aucune limite' },
]
const EVENEMENTS_POS = [
  'Vous avez aidé une âme perdue à trouver son chemin',
  'Votre loyauté envers vos alliés a été reconnue',
  'Vous avez épargné un ennemi vaincu',
  'Vos offrandes aux Ténèbres ont été acceptées',
  'Votre discipline dans la pratique des arts sombres',
  'Un sacrifice volontaire pour protéger votre cercle',
]
const EVENEMENTS_NEG = [
  'Une trahison commise dans un moment de faiblesse',
  'Vous avez abandonné un allié dans le besoin',
  'Vos promesses non tenues pèsent sur votre âme',
  'Un rituel bâclé qui a offensé les Anciens',
  'L\'abus de votre pouvoir sur les plus faibles',
  'Un mensonge qui a causé du tort à un innocent',
]

const rand = arr => arr[Math.floor(Math.random()*arr.length)]

export default async function karma(sock, sender, args, msg, ctx = {}) {
  try {
    const jid    = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const mentions = target !== jid ? [target] : []

    const num    = Math.floor(Math.random() * 101)
    const niveau = NIVEAUX.find(n => num >= n.min && num <= n.max) || NIVEAUX[3]
    const barre  = '█'.repeat(Math.floor(num / 10)) + '░'.repeat(10 - Math.floor(num / 10))

    // Événements qui ont influencé le karma
    const nb = Math.floor(Math.random() * 2) + 1
    const evtsPos = Array.from({length: Math.random() > 0.5 ? nb : 0}, () => `✅ ${rand(EVENEMENTS_POS)}`)
    const evtsNeg = Array.from({length: Math.random() > 0.5 ? nb : 0}, () => `❌ ${rand(EVENEMENTS_NEG)}`)
    const evts = [...evtsPos, ...evtsNeg].slice(0, 3)

    // Prochaine évolution
    const evolution = num >= 50
      ? `📈 *Tendance :* Karma en hausse (+${Math.floor(Math.random()*15)+1}/jour)`
      : `📉 *Tendance :* Karma en baisse (-${Math.floor(Math.random()*15)+1}/jour)`

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ☯️ *REGISTRE DE KARMA*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `👤 @${target.split('@')[0]}\n\n` +
      `[${barre}] *${num}/100*\n` +
      `✨ *${niveau.nom}*\n\n` +
      `📖 _${niveau.desc}_\n` +
      `⚡ _${niveau.effet}_\n\n` +
      (evts.length ? `⸸─────────────────────────────────⸸\n📋 *Actions récentes :*\n${evts.join('\n')}\n\n` : '') +
      `${evolution}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Gardien du Karma ☠`,
      mentions.length ? { mentions } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
