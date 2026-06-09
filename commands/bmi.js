import { sendMessage } from '../lib/sendMessage.js'
export default async function bmi(sock, sender, args, msg, ctx = {}) {
  const poids = parseFloat(args[0])
  const taille = parseFloat(args[1]) / 100
  if (!poids || !taille) return sendMessage(sock, sender, `☠ Usage: .bmi <poids(kg)> <taille(cm)>\nEx: .bmi 70 175`)
  const imc = (poids / (taille * taille)).toFixed(1)
  let cat, emoji, conseil
  if (imc < 18.5) { cat = 'Insuffisance pondérale'; emoji = '⚠️'; conseil = 'Augmenter les apports caloriques' }
  else if (imc < 25) { cat = 'Poids idéal'; emoji = '✅'; conseil = 'Maintenir ce mode de vie' }
  else if (imc < 30) { cat = 'Surpoids'; emoji = '⚠️'; conseil = 'Régime équilibré + activité physique' }
  else { cat = 'Obésité'; emoji = '🔴'; conseil = 'Consulter un médecin' }
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚖️ *CALCUL IMC*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚖️ *Poids:* ${poids} kg\n` +
    `⛧  📏 *Taille:* ${(taille*100).toFixed(0)} cm\n\n` +
    `✝  📊 *IMC:* ${imc}\n` +
    `☩  ${emoji} *Statut:* ${cat}\n` +
    `☠  💡 *Conseil:* ${conseil}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
