import { sendMessage } from '../lib/sendMessage.js'
const WORDS = ['DEMON','MAGIE','FORCE','LUEUR','BRUME','OMBRE','FLAME','CRANE','LANDE','FUITE','MONDE','ARBRE','NUAGE','VAGUE','ECLAT','ORGUE','AMOUR','PLUIE','ROCHE','GLACE']
const games = new Map()
function evaluate(guess, target) {
  const result = []
  const tArr = target.split(''), gArr = guess.split('')
  const used = new Array(5).fill(false)
  for (let i = 0; i < 5; i++) {
    if (gArr[i] === tArr[i]) { result[i] = '🟩'; used[i] = true }
    else result[i] = null
  }
  for (let i = 0; i < 5; i++) {
    if (result[i]) continue
    const j = tArr.findIndex((c, idx) => !used[idx] && c === gArr[i])
    if (j >= 0) { result[i] = '🟨'; used[j] = true } else result[i] = '⬛'
  }
  return result.join('')
}
export default async function wordle2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  const sub = args[0]?.toUpperCase()
  const key = `${sender}_${ctx?.senderJid||msg.key.participant||msg.key.remoteJid}`
  if (sub === 'STOP' || sub === 'FIN') { games.delete(key); return await sendMessage(sock, sender, `🛑 Partie Wordle arrêtée.`) }
  if (!games.has(key)) {
    const word = WORDS[Math.floor(Math.random()*WORDS.length)]
    games.set(key, { word, guesses: [], maxTries: 6 })
    return await sendMessage(sock, sender,
      `☩━━━〔 🟩 *WORDLE DÉMON* 〕━━━☩\n☠\n⛧  Trouve le mot de 5 lettres !\n☠  6 tentatives max.\n☠\n✝  🟩 = Bonne lettre, bonne place\n☠  🟨 = Bonne lettre, mauvaise place\n⛧  ⬛ = Lettre absente\n☠\n☩  Tape ${prefix}wordle2 <MOT> pour jouer\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (!sub || sub.length !== 5 || !/^[A-Z]+$/.test(sub)) return await sendMessage(sock, sender, `☠ Tape un mot de 5 lettres (ex: ${prefix}wordle2 CRANE)`)
  const g = games.get(key)
  const res = evaluate(sub, g.word)
  g.guesses.push({ guess: sub, result: res })
  const board = g.guesses.map(e => `${e.guess}  ${e.result}`).join('\n')
  if (sub === g.word) {
    games.delete(key)
    return await sendMessage(sock, sender, `☩━━━〔 🏆 *WORDLE — GAGNÉ !* 〕━━━☩\n☠\n${board}\n☠\n⛧  🎉 Bravo ! Mot trouvé en ${g.guesses.length} essai(s) !\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (g.guesses.length >= g.maxTries) {
    games.delete(key)
    return await sendMessage(sock, sender, `☩━━━〔 💀 *WORDLE — PERDU* 〕━━━☩\n☠\n${board}\n☠\n⛧  Le mot était: *${g.word}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  await sendMessage(sock, sender, `☩━━━〔 🟩 *WORDLE* (${g.guesses.length}/${g.maxTries}) 〕━━━☩\n☠\n\`\`\`\n${board}\n\`\`\`\n☠\n⛧  ${g.maxTries - g.guesses.length} essai(s) restant(s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
