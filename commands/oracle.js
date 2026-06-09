// commands/oracle.js — ORACLE DÉMONIAQUE AVEC PARSING DE QUESTION
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const REPONSES_OUI = [
  '⛧ Les ombres confirment — *OUI, sans aucun doute*',
  '☠ Le Démon a parlé — *OUI, cela se réalisera*',
  '✝ Les astres s\'alignent — *OUI, le destin l\'a décidé*',
  '☩ Azrael acquiesce — *OUI, c\'est inévitable*',
  '🔮 La boule de cristal brille — *OUI, absolument*',
]
const REPONSES_NON = [
  '⛧ Les ombres se referment — *NON, n\'y compte pas*',
  '☠ Le Démon secoue la tête — *NON, oublie cette idée*',
  '✝ Les astres s\'opposent — *NON, le destin en a décidé autrement*',
  '☩ Azrael refuse — *NON, jamais*',
  '💀 Le grimoire se ferme — *NON, c\'est contre nature*',
]
const REPONSES_NEUTRE = [
  '🌑 Le Voile est trouble — *Incertain, méditez davantage*',
  '⸸ Le chaos règne — *Impossible à déterminer pour l\'instant*',
  '🔮 Les visions sont floues — *Revenez après minuit*',
  '☩ L\'Oracle hésite — *Les forces s\'équilibrent*',
  '⛧ Le destin hésite entre deux chemins — *Cela dépend de vos choix*',
]
const PROPHECIES = [
  { domaine: '💰 Richesse',    txt: 'Une opportunité financière se profile dans l\'ombre — saisissez-la avant l\'aube.' },
  { domaine: '⚔️ Combat',      txt: 'Un affrontement imminent — préparez votre âme car l\'ennemi est proche.' },
  { domaine: '❤️ Amour',       txt: 'Un lien fort se tisse dans les ténèbres — méfiez-vous de ce qui brille trop.' },
  { domaine: '🌑 Danger',      txt: 'Les ombres murmurent un avertissement — restez vigilant pendant 3 jours.' },
  { domaine: '🏆 Victoire',    txt: 'Le triomphe approche comme une tempête — tenez bon encore un peu.' },
  { domaine: '🔮 Mystère',     txt: 'Un secret vous sera révélé par un inconnu — soyez attentif aux signes.' },
  { domaine: '☠ Trahison',     txt: 'Un allié proche cache une ombre dans son cœur — faites confiance à votre instinct.' },
  { domaine: '⛧ Destin',       txt: 'Votre chemin est tracé par les forces du Chaos — vous ne pouvez que l\'accepter.' },
]
const rand = arr => arr[Math.floor(Math.random() * arr.length)]

export default async function cmd_oracle(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const question = args.join(' ').trim()

    // Mode prophétie (sans question)
    if (!question) {
      const proph = rand(PROPHECIES)
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🔮 *L'ORACLE DES TÉNÈBRES*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `_Vous n'avez pas posé de question..._\n` +
        `_L'Oracle choisit de vous révéler une prophétie :_\n\n` +
        `🌀 *Domaine :* ${proph.domaine}\n\n` +
        `📜 _"${proph.txt}"_\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ Posez une question : \`.oracle <question>\` ☠`)
    }

    // Mode question Oui/Non
    const isOuiNon = /^(est[- ]ce|dois[- ]je|vais[- ]je|ai[- ]je|faut[- ]il|peut[- ]on|est|aura|sera|feras|ferai)/i.test(question) || question.endsWith('?')
    const proph = rand(PROPHECIES)
    const roll = Math.random()

    let reponse
    if (isOuiNon) {
      reponse = roll < 0.4 ? rand(REPONSES_OUI) : roll < 0.7 ? rand(REPONSES_NON) : rand(REPONSES_NEUTRE)
    } else {
      reponse = `🌀 *Révélation :* ${proph.txt}`
    }

    const intensite = roll < 0.33 ? '🔴 FORTE' : roll < 0.66 ? '🟡 MODÉRÉE' : '🟢 FAIBLE'
    const confiance = Math.floor(roll * 100)

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔮 *L'ORACLE DES TÉNÈBRES*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `❓ *Question :*\n_"${question}"_\n\n` +
      `⸸─────────────────────────────────⸸\n\n` +
      `${reponse}\n\n` +
      `📊 Confiance de l'Oracle : *${confiance}%*\n` +
      `🌡️ Intensité vibratoire : ${intensite}\n` +
      `🌀 Domaine pressenti : ${proph.domaine}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Les Ténèbres ne mentent pas ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
