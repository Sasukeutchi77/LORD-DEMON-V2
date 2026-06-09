import { sendMessage } from '../lib/sendMessage.js'
export default async function imc(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const poids = parseFloat(args[0]), taille = parseFloat(args[1])
  if (!poids||!taille) return await sendMessage(sock, sender, `☩━━━〔 ⚖️ *IMC* 〕━━━☩\n☠\n⛧  ${prefix}imc <poids_kg> <taille_cm>\n☠  Ex: ${prefix}imc 70 175\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const h = taille>3?taille/100:taille, imcVal = poids/(h*h)
  let cat, emoji
  if (imcVal<18.5){cat='Sous-poids';emoji='⚠️'}else if(imcVal<25){cat='Poids normal';emoji='✅'}else if(imcVal<30){cat='Surpoids';emoji='⚠️'}else{cat='Obésité';emoji='🔴'}
  await sendMessage(sock, sender, `☩━━━〔 ⚖️ *IMC* 〕━━━☩\n☠\n⛧  Poids: *${poids}kg* | Taille: *${taille}cm*\n☠\n✝  IMC: *${imcVal.toFixed(1)}*\n☠  ${emoji} *${cat}*\n☠\n✝  < 18.5: Sous-poids | 18.5-25: Normal\n☠  25-30: Surpoids | > 30: Obésité\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}