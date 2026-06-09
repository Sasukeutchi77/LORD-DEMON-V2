import { sendMessage } from '../lib/sendMessage.js'
const MEMES = [
  {top:'MOI QUI ARRIVE AU BOULOT',bot:'APRÈS 5 CAFÉS ET UNE PRIÈRE'},
  {top:'QUAND TU FIXES QUELQU'UN',bot:'ET QU'IL TE REGARDE AUSSI'},
  {top:'MON CERVEAU À 3H DU MAT',bot:'"ET SI LES MOUTONS COMPTAIENT LES HUMAINS?"'},
  {top:'MAMAN: TU JOUES AUX JEUX VIDÉO',bot:'MOI: NON J'ÉTUDIE L'ARCHITECTURE'},
  {top:'MOI QUAND J'AI 0 ÉNERGIE',bot:'MAIS QUE LA MUSIQUE COMMENCE'},
  {top:'TOUT LE MONDE: SOIS TOI-MÊME',bot:'MOI EN PUBLIC:'},
  {top:'PROF: 10 MIN D'EXAMEN',bot:'MES NEURONES:'},
  {top:'MOI: JE VAIS DORMIR TÔT',bot:'LE BOT À 2H DU MAT:'}
]
export default async function memegenerator(sock, sender, args, msg, ctx) {
  const meme = MEMES[Math.floor(Math.random()*MEMES.length)]
  await sendMessage(sock, sender, `☩━━━〔 😂 *MEME GENERATOR* 〕━━━☩\n☠\n⛧  🔝 ${meme.top}\n☠  ⬇️ ${meme.bot}\n☠\n✝  _LORD DEMON V2 Meme Factory_\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}