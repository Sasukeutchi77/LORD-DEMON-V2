import { sendMessage } from '../lib/sendMessage.js'
export default async function bmi2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const poids = parseFloat(args[0]), taille = parseFloat(args[1]), age = parseInt(args[2])
  if (!poids||!taille) return await sendMessage(sock, sender, `☩━━━〔 ⚖️ *SANTÉ* 〕━━━☩\n☠\n⛧  ${prefix}bmi2 <poids> <taille_cm> [age]\n☠  Ex: ${prefix}bmi2 70 175 25\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const h = taille>3?taille/100:taille, imcVal = poids/(h*h)
  let cat, emoji, conseil
  if(imcVal<18.5){cat='Sous-poids';emoji='⚠️';conseil='Augmente tes apports caloriques'}
  else if(imcVal<25){cat='Poids idéal';emoji='✅';conseil='Continue ainsi! Tu es en forme'}
  else if(imcVal<30){cat='Surpoids';emoji='⚠️';conseil='Régime équilibré + sport recommandé'}
  else{cat='Obésité';emoji='🔴';conseil='Consulte un médecin pour un suivi adapté'}
  const idealMin = (18.5*h*h).toFixed(1), idealMax = (24.9*h*h).toFixed(1)
  await sendMessage(sock, sender, `☩━━━〔 ⚖️ *BILAN SANTÉ* 〕━━━☩\n☠\n⛧  Poids: *${poids}kg* | Taille: *${taille}cm*${age?' | Âge: '+age+'ans':''}\n☠\n✝  IMC: *${imcVal.toFixed(1)}* — ${emoji} *${cat}*\n☠  Poids idéal: *${idealMin}-${idealMax}kg*\n⛧  💡 ${conseil}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}