import { sendMessage } from '../lib/sendMessage.js'
const CASES = [
  {crime:'Un diamant a disparu du musée',suspects:['Le gardien de nuit','La conservatrice','Le touriste mystérieux'],clue:'Empreintes de bottes militaires taille 42'},
  {crime:'Le chef du village a été empoisonné',suspects:['Son rival politique','La cuisinière','Le médecin'],clue:'Résidu de plante rare dans la coupe'},
  {crime:'Le coffre de la banque est vide',suspects:['Le directeur','L'expert sécurité','La nouvelle employée'],clue:'Code désactivé de l'intérieur à 3h07'},
  {crime:'Le trophée de la compétition a disparu',suspects:['Le second du classement','L'organisateur','Le sponsor'],clue:'Fibre textile rouge laissée sur le socle'},
]
export default async function detective2(sock, sender, args, msg, ctx) {
  const c = CASES[Math.floor(Math.random()*CASES.length)]
  const s = c.suspects.map((s,i)=>`${['🔴','🟡','🔵'][i]} ${s}`).join('\n☠  ')
  await sendMessage(sock, sender, `☩━━━〔 🔍 *ENQUÊTE DÉMON* 〕━━━☩\n☠\n⛧  📋 CRIME: *${c.crime}*\n☠\n✝  SUSPECTS:\n☠  ${s}\n☠\n⛧  🔍 INDICE: _${c.clue}_\n☠\n✝  Qui est le coupable? 🤔\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}