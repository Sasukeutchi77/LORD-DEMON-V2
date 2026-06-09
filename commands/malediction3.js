// commands/malediction3.js — MALÉDICTION RITUELLE INTERACTIVE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const RITUELS = [
  { nom:'Rituel du Sang Noir',     ingredients:['Sang de corbeau','Cire noire','Sel de mer maudit'],    duree:'1 heure sous la pleine lune' },
  { nom:'Cérémonie des Neuf Bougies',ingredients:['9 bougies noires','Encens d\'absinthe','Miroir brisé'],duree:'Minuit précis' },
  { nom:'Invocation du Voile',     ingredients:['Pierre de l\'Abîsse','Plume d\'Azrael','Encre de seiche noire'],duree:'Éclipse lunaire' },
  { nom:'Pacte des Ombres Éternelles',ingredients:['Signature en sang','Grimoire interdit','Bougie de minuit'],duree:'3 nuits consécutives' },
]
const MALEDICTIONS = [
  'Que chaque victoire te coûte deux fois plus d\'effort que les autres',
  'Que les portes se ferment devant toi au moment où tu en as le plus besoin',
  'Que le sommeil te fuie dans tes moments de faiblesse',
  'Que les alliances que tu forges se brisent à l\'heure cruciale',
  'Que ta force soit invisible à ceux que tu veux impressionner',
  'Que tes plans les mieux construits rencontrent toujours un obstacle imprévu',
  'Que tu sentes toujours une présence derrière toi dans l\'obscurité',
  'Que les miroirs te montrent ce que tu refuses de voir en toi',
  'Que le temps s\'écoule différemment pour toi dans les moments décisifs',
  'Que tes mots perdent leur pouvoir face à ceux qui t\'oppriment',
]
const SIGNES_RITUEL = ['☠','⛧','✝','☩','⸸','💀','🌑','🩸']

export default async function cmd_malediction3(sock, sender, args, msg, ctx = {}) {
  try {
    const jid    = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const mentions = target !== jid ? [target] : []
    const cible  = target !== jid ? `@${target.split('@')[0]}` : 'vous-même'

    const rituel   = rand(RITUELS)
    const malédiction = rand(MALEDICTIONS)
    const signe1   = rand(SIGNES_RITUEL), signe2 = rand(SIGNES_RITUEL), signe3 = rand(SIGNES_RITUEL)
    const intensite = Math.floor(Math.random()*100)+1
    const rang = intensite>=90?'☠ ABSOLUE':intensite>=70?'🔴 MAJEURE':intensite>=40?'🟠 MODÉRÉE':'⚪ MINEURE'
    const ingredients = rituel.ingredients.map(i => `  • ${i}`).join('\n')

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🩸 *RITUEL DE MALÉDICTION III*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🎯 Cible : *${cible}*\n` +
      `⚡ Intensité : *${intensite}/100* — ${rang}\n\n` +
      `🔮 *${rituel.nom}*\n\n` +
      `📋 *Ingrédients du rituel :*\n${ingredients}\n` +
      `⏱️ *Durée :* ${rituel.duree}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `${signe1} ${signe2} ${signe3} *MALÉDICTION PRONONCÉE :* ${signe3} ${signe2} ${signe1}\n\n` +
      `📜 _"${malédiction}"_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Grand Maître des Rituels ☠`,
      mentions.length ? { mentions } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
