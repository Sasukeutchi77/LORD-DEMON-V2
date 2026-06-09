// commands/fortune8ball.js — BOULE DE CRISTAL AVEC QUESTION
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const REPONSES = {
  positif: [
    { txt:'⛧ *C\'est certain* — les ténèbres le confirment', conf:99 },
    { txt:'☠ *Oui, sans aucun doute* — Azrael a parlé', conf:95 },
    { txt:'✝ *Oui, définitivement* — le Voile s\'ouvre', conf:90 },
    { txt:'☩ *Tu peux compter là-dessus* — les astres s\'alignent', conf:85 },
    { txt:'⛧ *Les signes sont favorables* — les ombres acquiescent', conf:75 },
    { txt:'💀 *Oui* — l\'Oracle des Abysses confirme', conf:70 },
  ],
  neutre: [
    { txt:'🌑 *Réponse trouble* — pose à nouveau à minuit', conf:50 },
    { txt:'⸸ *Impossible à déterminer* — le chaos brouille la vision', conf:45 },
    { txt:'🔮 *Mieux vaut ne pas répondre maintenant* — patiente', conf:40 },
    { txt:'☩ *Concentre-toi et redemande* — ta question manque de clarté', conf:35 },
  ],
  negatif: [
    { txt:'☠ *Non* — le destin s\'y oppose fermement', conf:70 },
    { txt:'⛧ *N\'y compte pas* — les ombres refusent', conf:75 },
    { txt:'✝ *Ma réponse est non* — Azrael secoue la tête', conf:80 },
    { txt:'💀 *Certainement pas* — les portes de l\'enfer se ferment', conf:85 },
    { txt:'⸸ *Mes visions sont sombres à ce sujet* — abandonne cette idée', conf:90 },
    { txt:'☠ *Non, jamais* — cette voie mène à la destruction', conf:95 },
  ],
}

export default async function fortune8ball(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const question = args.join(' ').trim()

    if (!question) {
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🎱 *BOULE DE CRISTAL*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `🔮 _La boule attend votre question..._\n\n` +
        `💡 Usage: \`.fortune8ball <votre question ?>\`\n` +
        `📖 Exemple: \`.fortune8ball Est-ce que je vais gagner ?\`\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ LORD DEMON — Oracle des Ténèbres ☠`)
    }

    const roll = Math.random()
    let categorie, liste
    if (roll < 0.45) { categorie = 'POSITIF ✅'; liste = REPONSES.positif }
    else if (roll < 0.70) { categorie = 'NÉGATIF ❌'; liste = REPONSES.negatif }
    else { categorie = 'INCERTAIN 🌑'; liste = REPONSES.neutre }

    const reponse = liste[Math.floor(Math.random() * liste.length)]
    const vibration = Math.floor(Math.random() * 3) + 1
    const vibTxt = '🔮'.repeat(vibration) + '⚫'.repeat(3 - vibration)

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎱 *BOULE DE CRISTAL*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `❓ *Question :*\n_"${question}"_\n\n` +
      `⸸─────────────────────────────────⸸\n\n` +
      `${vibTxt} *Vibrations détectées...*\n\n` +
      `🎱 *Réponse de l\'Oracle :*\n${reponse.txt}\n\n` +
      `📊 Confiance : *${reponse.conf}%*\n` +
      `🎭 Verdict : *${categorie}*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — La Vérité des Abysses ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
