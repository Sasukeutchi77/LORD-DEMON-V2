import { sendMessage } from '../lib/sendMessage.js'
export default async function bmi2(sock, sender, args, msg, ctx = {}) {
  try {
    const [p, t] = args
    if (!p || !t) return await sendMessage(sock, sender, '☠ Usage: .bmi2 <poids_kg> <taille_cm>\nEx: .bmi2 70 175')
    const pf = parseFloat(p), tf = parseFloat(t) / 100
    const bmi = (pf / (tf * tf)).toFixed(1)
    const cat = bmi < 18.5 ? '🔵 Insuffisance pondérale' : bmi < 25 ? '🟢 Poids normal' : bmi < 30 ? '🟡 Surpoids' : '🔴 Obésité'
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚖️ *IMC — INDICE DE MASSE CORPORELLE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Poids : *${pf} kg*\n✝ Taille : *${t} cm*\n☠ IMC : *${bmi}*\n⛧ Statut : *${cat}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
