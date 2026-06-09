import { sendMessage } from '../lib/sendMessage.js'
const TITLES = ['☠️ Démon Absolu','👑 Roi des Ténèbres','⚔️ Chevalier Noir','🔥 Seigneur de l'Enfer','💀 Reaper','🌑 Ombre Éternelle','🐉 Maître Dragon','⛧ Archidémon','🌟 Élu des Astres','💎 Cristal d'Âme']
const POWERS = ['Contrôle des ombres 🌑','Télékinésie pure ⚡','Vision du futur 🔮','Vitesse absolue 💨','Invincibilité 🛡️','Magie sombre max 🔥','Manipulation mentale 🧠','Vol temporel ⏱️','Force divine ⚔️','Resurrection 💀']
export default async function rangdemain(sock, sender, args, msg, ctx) {
  try {
  const title = TITLES[Math.floor(Math.random()*TITLES.length)]
  const power = POWERS[Math.floor(Math.random()*POWERS.length)]
  const level = Math.floor(Math.random()*100)+1
  const xp = level * 1337
  await sendMessage(sock, sender, `☩━━━〔 🔮 *RANG DE DEMAIN* 〕━━━☩\n☠\n⛧  Titre prédit: *${title}*\n☠  Pouvoir: *${power}*\n✝  Niveau: *${level}*\n☠  XP total: *${xp.toLocaleString()}*\n☠\n✝  _Prophecy revealed by LORD DEMON V2_\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}