// commands/portebonheur.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const objets = [
  { nom: "🍀 Trèfle à quatre feuilles", bonus: "+30% de chance", duree: "24 heures" },
  { nom: "🐇 Pied de lapin", bonus: "+20% de fortune", duree: "48 heures" },
  { nom: "🌟 Étoile démoniaque", bonus: "+50% de puissance RPG", duree: "12 heures" },
  { nom: "💎 Diamant noir", bonus: "+40% de richesse", duree: "72 heures" },
  { nom: "🦋 Aile de papillon mystique", bonus: "+25% de créativité", duree: "36 heures" },
  { nom: "☩ Croix de sang", bonus: "+60% résistance aux malédictions", duree: "6 heures" },
  { nom: "🌙 Pierre de lune", bonus: "+35% d'intuition", duree: "Une nuit" },
]

export default async function portebonheur(sock, sender, args, msg) {
  try {
  const name = msg?.pushName || 'Âme'
  const obj = objets[Math.floor(Math.random() * objets.length)]
  const text =
    `☩━━━〔 🍀 *PORTE-BONHEUR DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  👤 *${name}*, le Démon t'offre :\n\n` +
    `⛧  *${obj.nom}*\n\n` +
    `✝  ⚡ *Bonus:* ${obj.bonus}\n` +
    `☩  ⏳ *Durée:* ${obj.duree}\n\n` +
    `☠  _Porte-le avec fierté, guerrier !_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}