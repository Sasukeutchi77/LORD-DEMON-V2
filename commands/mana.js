// commands/mana.js — SYSTÈME DE MANA AVEC SORTS DISPONIBLES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const NIVEAUX_MANA = [
  { min:0,  max:10, titre:'💀 Épuisé',           classe:'Muet',               sorts_dispo:0,  desc:'Vous ne pouvez lancer aucun sort' },
  { min:11, max:25, titre:'⚫ Mana Critique',    classe:'Apprenti',           sorts_dispo:1,  desc:'Un sort faible possible' },
  { min:26, max:45, titre:'🔵 Mana Faible',      classe:'Mage Novice',        sorts_dispo:2,  desc:'Sorts basiques accessibles' },
  { min:46, max:65, titre:'🟡 Mana Stable',      classe:'Mage Confirmé',      sorts_dispo:4,  desc:'Sorts intermédiaires disponibles' },
  { min:66, max:80, titre:'🟠 Mana Puissant',    classe:'Archimage',          sorts_dispo:6,  desc:'Sorts puissants en réserve' },
  { min:81, max:93, titre:'🔴 Mana Abyssal',     classe:'Archimage Démoniaque',sorts_dispo:8, desc:'Sorts légendaires disponibles' },
  { min:94, max:99, titre:'⛧ Mana Infini',       classe:'Seigneur des Sorts', sorts_dispo:10, desc:'Puissance illimitée' },
  { min:100,max:100,titre:'☠ MANA ABSOLU',       classe:'AZRAEL',             sorts_dispo:99, desc:'Transcendance totale atteinte' },
]
const SORTS_PAR_NIVEAU = {
  0: [],
  1: ['Boule de Feu I'],
  2: ['Boule de Feu I', 'Bouclier d\'Ombre'],
  4: ['Fulgur I', 'Boule de Feu II', 'Soin Mineur', 'Malédiction I'],
  6: ['Tempête d\'Acide', 'Umbra II', 'Invocation Mineure', 'Soin II', 'Foudre Abyssale', 'Malédiction III'],
  8: ['Chaos Primordial', 'Nexus Demonicus', 'Mort Instantanée', 'Vol d\'Âme', 'Résurrection', 'Bouclier Infernal', 'Tempête Finale', 'Frappe Divine'],
  10:['Tous les sorts'],
}

export default async function mana(sock, sender, args, msg, ctx = {}) {
  try {
    const jid    = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const num    = Math.floor(Math.random() * 101)
    const niveau = NIVEAUX_MANA.find(n => num >= n.min && num <= n.max) || NIVEAUX_MANA[3]
    const barre  = '█'.repeat(Math.floor(num / 10)) + '░'.repeat(10 - Math.floor(num / 10))
    const mentions = target !== jid ? [target] : []
    const regenTime = Math.max(0, Math.floor((100 - num) / 10)) + ' min'

    // Sorts disponibles
    const sortsDispo = SORTS_PAR_NIVEAU[niveau.sorts_dispo] || SORTS_PAR_NIVEAU[10]
    const sortsStr = sortsDispo.length
      ? sortsDispo.slice(0, 5).map(s => `  • ${s}`).join('\n')
      : '  ❌ Aucun sort disponible'

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   💧 *JAUGE DE MANA*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `👤 @${target.split('@')[0]}\n\n` +
      `💧 Mana : [${barre}] *${num}/100*\n` +
      `✨ État : *${niveau.titre}*\n` +
      `🎓 Classe : *${niveau.classe}*\n\n` +
      `📖 _${niveau.desc}_\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🔮 *Sorts disponibles (${niveau.sorts_dispo === 99 ? '∞' : niveau.sorts_dispo}) :*\n${sortsStr}\n\n` +
      `⏱️ Régénération pleine : *~${regenTime}*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Maître du Mana ☠`,
      mentions.length ? { mentions } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
