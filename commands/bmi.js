// commands/bmi.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function bmi(sock, sender, args, msg) {
  const poids = parseFloat(args[0])
  const taille = parseFloat(args[1]) / 100
  if (!poids || !taille) return sendMessage(sock, sender, '☠ Usage: .bmi <poids(kg)> <taille(cm)>\nEx: .bmi 70 175')
  const imc = (poids / (taille * taille)).toFixed(1)
  const cat = imc < 18.5 ? '🔵 Insuffisance pondérale' : imc < 25 ? '🟢 Poids normal ✅' : imc < 30 ? '🟡 Surpoids' : '🔴 Obésité'
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚖️ CALCUL IMC   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n⚖️ Poids: ${poids} kg\n📏 Taille: ${(taille*100).toFixed(0)} cm\n\n📊 IMC: *${imc}*\n${cat}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
