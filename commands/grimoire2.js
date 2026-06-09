// commands/grimoire2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const sorts = [
  { nom: "Flammes Éternelles", niveau: "⭐⭐⭐⭐", type: "Attaque", effet: "Brûle tout sur son passage pendant 30 secondes", mana: 50 },
  { nom: "Voile des Ombres", niveau: "⭐⭐⭐", type: "Défense", effet: "Rend invisible pendant 1 minute", mana: 35 },
  { nom: "Malédiction de Sang", niveau: "⭐⭐⭐⭐⭐", type: "Maléfice", effet: "Réduit la force de l'ennemi de 50% pour 24h", mana: 80 },
  { nom: "Régénération Démoniaque", niveau: "⭐⭐⭐", type: "Soin", effet: "Restaure 200 HP en 10 secondes", mana: 40 },
  { nom: "Tempête Électrique", niveau: "⭐⭐⭐⭐", type: "Attaque", effet: "Frappe jusqu'à 5 ennemis simultanément", mana: 65 },
  { nom: "Bouclier de Pierre", niveau: "⭐⭐", type: "Défense", effet: "Absorbe les 3 prochains dégâts", mana: 20 },
  { nom: "Vision du Futur", niveau: "⭐⭐⭐", type: "Divination", effet: "Révèle les intentions de l'ennemi", mana: 30 },
]

export default async function grimoire2(sock, sender, args) {
  const sort = sorts[Math.floor(Math.random() * sorts.length)]
  const text =
    `☩━━━〔 📚 *GRIMOIRE DÉMONIAQUE II* 〕━━━☩\n\n` +
    `☠  ✨ *Sort découvert:*\n` +
    `⛧  *${sort.nom}*\n\n` +
    `✝  ${sort.niveau} *Niveau*\n` +
    `☩  🏷️ *Type:* ${sort.type}\n` +
    `☠  💧 *Mana requis:* ${sort.mana}\n\n` +
    `⛧  ⚡ *Effet:*\n` +
    `✝  _${sort.effet}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
