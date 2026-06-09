// commands/menace.js — MENACE DÉMONIAQUE AMÉLIORÉE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const MENACES = [
  { lvl:'I',   txt:'Les ombres commencent à noter ton nom dans le Livre Noir.',                   intensite:'⚪ Légère' },
  { lvl:'II',  txt:'Les corbeaux d\'Azrael ont transmis ton dossier au Conseil des Ténèbres.',   intensite:'🔵 Modérée' },
  { lvl:'III', txt:'Le Seigneur des Ombres a prononcé ton nom lors du rituel du soir.',           intensite:'🟡 Sérieuse' },
  { lvl:'IV',  txt:'Un Démon de Rang IV a été désigné pour te suivre discrètement.',              intensite:'🟠 Grave' },
  { lvl:'V',   txt:'Azrael lui-même a ouvert ton dossier — tes jours de paix sont comptés.',     intensite:'🔴 Critique' },
  { lvl:'VI',  txt:'Le pacte a été signé dans le sang. Tu ne peux plus fuir le destin qui vient.',intensite:'☠ FATALE' },
]
const CONSEQUENCES = [
  'Tes rêves seront peuplés de cauchemars démoniaques',
  'Chaque miroir te montrera une version corrompue de toi-même',
  'Les animaux sentiront ta malédiction et te fuiront',
  'La chance t\'abandonnera pour les 3 prochains jours',
  'Un spectre sera assigné à te surveiller 24h/24',
  'Tes proches ressentiront une présence inquiétante',
  'Les nombres que tu choisiras seront systématiquement maudits',
]
const DELAIS = ['avant l\'aube', 'sous la prochaine lune', 'quand le corbeau chantera', 'lors du prochain rituel', 'à la tombée des ténèbres', 'avant minuit']
const rand = arr => arr[Math.floor(Math.random()*arr.length)]

export default async function cmd_menace(sock, sender, args, msg, ctx = {}) {
  try {
    const jid    = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const menace = rand(MENACES)
    const consq  = rand(CONSEQUENCES)
    const delai  = rand(DELAIS)
    const mentions = target !== jid ? [target] : []
    const cible  = target !== jid ? `@${target.split('@')[0]}` : 'vous'

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ☠ *MENACE DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🎯 Cible : *${cible}*\n` +
      `⚠️ Niveau : *${menace.lvl}* — ${menace.intensite}\n\n` +
      `📜 *Message des Ténèbres :*\n_"${menace.txt}"_\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `💀 *Conséquence :*\n_${consq}_\n\n` +
      `⏳ *Délai d\'exécution :* ${delai}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Messager des Ténèbres ☠`,
      mentions.length ? { mentions } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
