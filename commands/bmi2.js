import { sendMessage } from '../lib/sendMessage.js'
export default async function bmi2(sock, sender, args, msg, ctx = {}) {
  const poids = parseFloat(args[0])
  const taille = parseFloat(args[1])
  const ageSaisi = parseInt(args[2])
  if (!poids||!taille) return sendMessage(sock, sender, `☠ Usage: .bmi2 <poids> <taille_cm> [age]\nEx: .bmi2 70 175 25`)
  const h = taille > 3 ? taille/100 : taille
  const imcVal = poids/(h*h)
  let cat, emoji, conseil
  if(imcVal<18.5){cat='Sous-poids';emoji='⚠️';conseil='Augmente tes apports caloriques'}
  else if(imcVal<25){cat='Poids idéal';emoji='✅';conseil='Continue ainsi — tu es en forme'}
  else if(imcVal<30){cat='Surpoids';emoji='⚠️';conseil='Régime équilibré + sport recommandé'}
  else{cat='Obésité';emoji='🔴';conseil='Consulte un médecin pour un suivi adapté'}
  const idealMin = (18.5*h*h).toFixed(1)
  const idealMax = (24.9*h*h).toFixed(1)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚖️ *BILAN SANTÉ AVANCÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚖️ *Poids:* ${poids}kg | *Taille:* ${taille}cm${ageSaisi?' | *Âge:* '+ageSaisi+' ans':''}\n\n` +
    `⛧  📊 *IMC:* ${imcVal.toFixed(1)} — ${emoji} *${cat}*\n` +
    `✝  🎯 *Poids idéal:* ${idealMin}–${idealMax} kg\n` +
    `☩  💡 *Conseil:* ${conseil}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
