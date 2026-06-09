// commands/monstre2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const monstres = [
  { nom: "🐉 Drakon Infernal", hp: 9500, atk: 840, def: 620, element: "Feu 🔥", capacite: "Souffle de Lave", faiblesse: "Glace ❄️", xp: 2500, reward: "Écaille de Dragon" },
  { nom: "👹 Démon Abyssal", hp: 7200, atk: 950, def: 400, element: "Ombre 🌑", capacite: "Dévoration d'Âme", faiblesse: "Lumière ✨", xp: 1800, reward: "Corne de Démon" },
  { nom: "🧟 Liche Ancienne", hp: 11000, atk: 700, def: 800, element: "Mort ☠️", capacite: "Armée des Morts", faiblesse: "Feu sacré 🕯️", xp: 3000, reward: "Phylactère" },
  { nom: "🦂 Scorpion Géant", hp: 4500, atk: 1100, def: 350, element: "Venin ☣️", capacite: "Dard Empoisonné", faiblesse: "Foudre ⚡", xp: 1200, reward: "Venin Rare" },
  { nom: "🌊 Kraken des Abysses", hp: 15000, atk: 600, def: 900, element: "Eau 💧", capacite: "Étreinte Mortelle", faiblesse: "Électricité ⚡", xp: 4000, reward: "Tentacule Magique" },
]

export default async function monstre2(sock, sender, args, msg) {
  const m = monstres[Math.floor(Math.random() * monstres.length)]
  const playerAtk = Math.floor(Math.random() * 500) + 300
  const result = playerAtk >= m.def ? `✅ Victoire ! Dégâts infligés: ${playerAtk - m.def}` : `❌ Défaite ! Le monstre résiste (Défense: ${m.def})`
  const text =
    `☩━━━〔 👹 *MONSTRE RENCONTRÉ* 〕━━━☩\n\n` +
    `☠  *${m.nom}*\n\n` +
    `⛧  ❤️ *HP:* ${m.hp.toLocaleString()}\n` +
    `✝  ⚔️ *ATK:* ${m.atk} | 🛡️ *DEF:* ${m.def}\n` +
    `☩  🌀 *Élément:* ${m.element}\n` +
    `☠  💥 *Capacité spéciale:* ${m.capacite}\n` +
    `⛧  ⚠️ *Faiblesse:* ${m.faiblesse}\n\n` +
    `✝  ─────────────────\n` +
    `☩  🗡️ *Ton attaque:* ${playerAtk}\n` +
    `☠  ${result}\n\n` +
    `⛧  🏆 *XP potentiel:* ${m.xp} | 🎁 *Récompense:* ${m.reward}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
