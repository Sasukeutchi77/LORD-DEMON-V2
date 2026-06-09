import { sendMessage } from '../lib/sendMessage.js'
const ACTIONS = ['sauter dans une piscine d'eau froide','manger quelque chose d'épicé','appeler quelqu'un pas vu depuis longtemps','dire une vérité difficile à quelqu'un','essayer un nouveau sport','apprendre 10 mots dans une nouvelle langue','cuisiner un plat d'un autre pays','écouter de la musique que tu détestes','méditer 10 minutes en silence','écrire une lettre à ta future version']
const LEVELS = ['⚪ Facile','🟡 Moyen','🟠 Difficile','🔴 Hardcore','☠️ Extreme']
export default async function risque(sock, sender, args, msg, ctx) {
  try {
  const action = ACTIONS[Math.floor(Math.random()*ACTIONS.length)]
  const level = LEVELS[Math.floor(Math.random()*LEVELS.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎲 *DÉFI RISQUE* 〕━━━☩\n☠\n⛧  ${level}\n☠\n✝  🎯 Défi: *${action}*\n☠\n⛧  Oses-tu le faire? 😏\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}