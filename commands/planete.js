// commands/planete.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const planetes = [
  { nom: "☀️ Soleil", type: "Étoile", dist: "0 km (référence)", diam: "1,392,700 km", temp: "5,500°C (surface)", lunes: 0, fun: "Un million de Terres rentreraient dedans !" },
  { nom: "🔴 Mars", type: "Planète tellurique", dist: "225 millions km", diam: "6,779 km", temp: "-80°C à 20°C", lunes: 2, fun: "La plus haute montagne du système solaire s'y trouve (Olympus Mons)" },
  { nom: "🔵 Neptune", type: "Géante de glace", dist: "4.5 milliards km", diam: "49,244 km", temp: "-214°C", lunes: 14, fun: "Ses vents atteignent 2100 km/h !" },
  { nom: "🟡 Saturne", type: "Géante gazeuse", dist: "1.4 milliards km", diam: "116,460 km", temp: "-178°C", lunes: 146, fun: "Sa densité est si faible qu'elle flotterait sur l'eau !" },
  { nom: "🟠 Jupiter", type: "Géante gazeuse", dist: "778 millions km", diam: "139,820 km", temp: "-145°C", lunes: 95, fun: "La Grande Tache Rouge est une tempête depuis 300 ans !" },
  { nom: "🌍 Terre", type: "Planète tellurique", dist: "150 millions km", diam: "12,742 km", temp: "-88°C à 58°C", lunes: 1, fun: "La seule planète connue abritant la vie !" },
]

export default async function planete(sock, sender, args) {
  try {
  const p = planetes[Math.floor(Math.random() * planetes.length)]
  const text =
    `☩━━━〔 🌌 *PLANÈTE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  🌍 *${p.nom}*\n` +
    `⛧  🏷️ *Type:* ${p.type}\n` +
    `✝  📏 *Diamètre:* ${p.diam}\n` +
    `☩  📍 *Distance du Soleil:* ${p.dist}\n` +
    `☠  🌡️ *Température:* ${p.temp}\n` +
    `⛧  🌙 *Lunes:* ${p.lunes}\n\n` +
    `✝  💡 *Fait incroyable:*\n` +
    `☩  _${p.fun}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}