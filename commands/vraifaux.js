// commands/vraifaux.js — VRAI ou FAUX ✅❌
import { sendMessage } from '../lib/sendMessage.js'

const QUESTIONS = [
    { q: 'La Grande Muraille de Chine est visible depuis l\'espace.', r: false, expl: '❌ FAUX. Elle est trop étroite pour être vue à l\'œil nu depuis l\'espace.' },
    { q: 'Le cœur humain bat environ 100 000 fois par jour.', r: true, expl: '✅ VRAI. Le cœur bat environ 60-80x/min, soit ~100 000 fois par jour.' },
    { q: 'Les éléphants sont les seuls animaux qui ne peuvent pas sauter.', r: false, expl: '❌ FAUX. Les hippopotames, rhinocéros et certaines tortues ne sautent pas non plus.' },
    { q: 'L\'eau bout à 100°C au niveau de la mer.', r: true, expl: '✅ VRAI. À pression atmosphérique standard (1 atm).' },
    { q: 'Les pieuvres ont 3 cœurs.', r: true, expl: '✅ VRAI. 2 cœurs branchiaux + 1 cœur systémique.' },
    { q: 'La foudre ne tombe jamais deux fois au même endroit.', r: false, expl: '❌ FAUX. La foudre peut frapper plusieurs fois le même endroit.' },
    { q: 'Le Soleil est une étoile de type naine jaune.', r: true, expl: '✅ VRAI. Le Soleil est classifié comme naine jaune (G2V).' },
    { q: 'Les chauves-souris sont aveugles.', r: false, expl: '❌ FAUX. Les chauves-souris voient, mais utilisent surtout l\'écholocation la nuit.' },
    { q: 'L\'ADN humain partagé avec une banane est d\'environ 60%.', r: true, expl: '✅ VRAI. Nous partageons ~60% de gènes avec la banane.' },
    { q: 'Napoléon était très petit (moins de 1m60).', r: false, expl: '❌ FAUX. Napoléon mesurait ~1m69, la taille moyenne de son époque.' },
    { q: 'Le sang est bleu dans les veines.', r: false, expl: '❌ FAUX. Le sang est toujours rouge. Les veines paraissent bleues à cause de la peau.' },
    { q: 'On utilise seulement 10% de notre cerveau.', r: false, expl: '❌ FAUX. On utilise pratiquement tout notre cerveau, juste pas tout simultanément.' },
    { q: 'Mercure est la planète la plus chaude du système solaire.', r: false, expl: '❌ FAUX. Vénus est la plus chaude (~465°C) malgré étant plus loin du Soleil.' },
    { q: 'Le français est la langue officielle de plus de 29 pays.', r: true, expl: '✅ VRAI. Le français est langue officielle dans 29 pays.' },
    { q: 'Les pingouins vivent en Arctique.', r: false, expl: '❌ FAUX. Les pingouins vivent en Antarctique (pôle Sud), pas en Arctique.' },
]

const sessions = new Map()

export default async function vraifaux(sock, sender, args, msg) {
  try {
    const sub = args[0]?.toLowerCase()

    if (sessions.has(sender)) {
        if (sub === 'vrai' || sub === 'v' || sub === 'true') {
            const s = sessions.get(sender)
            sessions.delete(sender)
            const correct = s.r === true
            return sendMessage(sock, sender,
                (correct ? `†┈┈┈┈┈┈┈┈┈┈┈┈†\n🎉 *BONNE RÉPONSE !*\n` : `☩━━━〔 ❌ *FAUX !* 〕━━━☩\n`) +
                `\n📖 ${s.expl}\n\n💡 Rejoue: \`.vraifaux\``
            )
        }
        if (sub === 'faux' || sub === 'f' || sub === 'false') {
            const s = sessions.get(sender)
            sessions.delete(sender)
            const correct = s.r === false
            return sendMessage(sock, sender,
                (correct ? `†┈┈┈┈┈┈┈┈┈┈┈┈†\n🎉 *BONNE RÉPONSE !*\n` : `☩━━━〔 ❌ *FAUX !* 〕━━━☩\n`) +
                `\n📖 ${s.expl}\n\n💡 Rejoue: \`.vraifaux\``
            )
        }
    }

    const item = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
    sessions.set(sender, item)

    await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   ✅❌ *VRAI ou FAUX ?*           ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `❓ *Affirmation:*\n"${item.q}"\n\n` +
        `▶️ Réponds: \`.vraifaux vrai\` ou \`.vraifaux faux\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}