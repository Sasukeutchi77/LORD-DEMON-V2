import { sendMessage } from '../lib/sendMessage.js'
const games = new Map()
const STARTER_WORDS = ['LION','NUIT','TIGRE','ENFANT','TRISTE','ETOILE','LUNE','ECLIPSE','EGLISE','SOLEIL']
export default async function wordchain(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX || '.'
  const word = args[0]?.toUpperCase()
  const key = sender
  if (word === 'STOP') { games.delete(key); return await sendMessage(sock, sender, `🛑 Jeu de chaîne arrêté.`) }
  if (!games.has(key)) {
    const starter = STARTER_WORDS[Math.floor(Math.random()*STARTER_WORDS.length)]
    games.set(key, { last: starter, used: new Set([starter]), count: 0 })
    return await sendMessage(sock, sender,
      `☩━━━〔 🔗 *CHAÎNE DE MOTS* 〕━━━☩\n☠\n⛧  Je commence: *${starter}*\n☠\n✝  Règle: commence par la dernière lettre\n☠  du mot précédent.\n☠\n⛧  ${prefix}wordchain <mot>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const g = games.get(key)
  const lastChar = g.last[g.last.length - 1]
  if (!word || !word.length) return await sendMessage(sock, sender, `☠ Donne un mot commençant par *${lastChar}*`)
  if (word[0] !== lastChar) return await sendMessage(sock, sender, `☩━━━〔 ❌ *ERREUR* 〕━━━☩\n☠\n⛧  Le mot doit commencer par *${lastChar}* (fin de *${g.last}*)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  if (g.used.has(word)) return await sendMessage(sock, sender, `☩━━━〔 ❌ *MOT DÉJÀ UTILISÉ* 〕━━━☩\n☠\n⛧  *${word}* a déjà été joué !\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  g.used.add(word); g.count++
  const nextChar = word[word.length - 1]
  const botWords = STARTER_WORDS.filter(w => w[0] === nextChar && !g.used.has(w))
  if (!botWords.length) {
    games.delete(key)
    return await sendMessage(sock, sender, `☩━━━〔 🏆 *VICTOIRE !* 〕━━━☩\n☠\n⛧  Je ne trouve pas de mot commençant par *${nextChar}*\n☠  🎉 Tu as gagné après ${g.count} mots !\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const botWord = botWords[Math.floor(Math.random()*botWords.length)]
  g.used.add(botWord); g.last = botWord
  await sendMessage(sock, sender, `☩━━━〔 🔗 *CHAÎNE* (${g.count} mots) 〕━━━☩\n☠\n⛧  ✅ *${word}* accepté !\n☠  🤖 Mon mot: *${botWord}*\n✝  (commence par *${botWord[botWord.length-1]}*)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}