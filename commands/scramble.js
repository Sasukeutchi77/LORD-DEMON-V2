import { sendMessage } from '../lib/sendMessage.js'
const WORDS_FR = ['ORDINATEUR','TELEPHONE','PROGRAMMATION','INTELLIGENCE','JAVASCRIPT','ALGORITHME','STRUCTURE','ELECTRONIQUE','COMMUNICATION','PHOTOGRAPHIE','BIBLIOTHEQUE','MATHEMATIQUES','ARCHITECTURE','CINEMATOGRAPHE','PHILOSOPHIQUE']
const games = new Map()
export default async function scramble(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX || '.'
  const guess = args[0]?.toUpperCase()
  const key = sender
  if (guess === 'STOP') { games.delete(key); return await sendMessage(sock, sender, `🛑 Scramble arrêté.`) }
  if (games.has(key)) {
    const g = games.get(key)
    if (guess === g.word) { games.delete(key); return await sendMessage(sock, sender, `☩━━━〔 🏆 *SCRAMBLE — GAGNÉ !* 〕━━━☩\n☠\n⛧  🎉 *${g.word}* — C'est exact !\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) }
    return await sendMessage(sock, sender, `☩━━━〔 ❌ *SCRAMBLE* 〕━━━☩\n☠\n⛧  ❌ *${guess}* — Non !\n☠  🔀 Mélangé: *${g.scrambled}*\n✝  Encore: ${prefix}scramble <MOT> | ${prefix}scramble stop\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const word = WORDS_FR[Math.floor(Math.random()*WORDS_FR.length)]
  const scrambled = word.split('').sort(()=>Math.random()-0.5).join('')
  games.set(key, { word, scrambled })
  await sendMessage(sock, sender, `☩━━━〔 🔀 *SCRAMBLE* 〕━━━☩\n☠\n⛧  Remets les lettres dans l'ordre!\n☠\n✝  🔀 Mélangé: *${scrambled}*\n☠  (${word.length} lettres)\n☠\n⛧  ${prefix}scramble <MOT> pour répondre\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}