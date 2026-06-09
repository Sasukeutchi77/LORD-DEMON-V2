import { sendMessage } from '../lib/sendMessage.js'
export default async function imc(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const poids = parseFloat(args[0]), taille = parseFloat(args[1])
  if (!poids||!taille) return await sendMessage(sock, sender, `☩━━━〔 ⚖️ *IMC* 〕━━━☩\n☠\n⛧  Usage: ${prefix}imc <poids_kg> <taille_cm>\n☠  Ex: ${prefix}imc 70 175\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const tailleM = taille > 3 ? taille/100 : taille
  const imc = poids / (tailleM * tailleM)
  let cat, emoji
  if (imc < 18.5) { cat='Sous-poids'; emoji='⚠️' }
  else if (imc < 25) { cat='Poids normal'; emoji='✅' }
  else if (imc < 30) { cat='Surpoids'; emoji='⚠️' }
  else { cat='Obésité'; emoji='🔴' }
  await sendMessage(sock, sender, `☩━━━〔 ⚖️ *IMC / BMI* 〕━━━☩\n☠\n⛧  👤 Poids: *${poids}kg* | Taille: *${taille}cm*\n☠\n✝  📊 IMC: *${imc.toFixed(1)}*\n☠  ${emoji} Catégorie: *${cat}*\n☠\n⛧  Référence:
✝  < 18.5: Sous-poids\n☠  18.5-25: Normal ✅\n⛧  25-30: Surpoids\n☩  > 30: Obésité\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}