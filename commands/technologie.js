import { sendMessage } from '../lib/sendMessage.js'
const FAITS = ['🤖 GPT-4 a été entraîné sur plus de 1 trillion de tokens','📱 Il y a plus de smartphones que d\'humains sur Terre','🌐 ARPANET (1969) avait seulement 4 ordinateurs connectés','💾 Le premier disque dur IBM (1956) pesait 1 tonne pour 5 MB','🖥️ Le premier processeur Intel (1971) avait 2,300 transistors vs milliards aujourd\'hui','📧 350 milliards d\'emails sont envoyés chaque jour','⚡ Le WiFi a été inventé en Australie dans les années 90','🎮 Minecraft est le jeu le plus vendu: 238M+ copies','🤳 TikTok a atteint 1 milliard d\'utilisateurs en 5 ans','🔋 Le premier iPhone (2007) ne supportait pas les apps tierces à la sortie']
export default async function technologie(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  💻 *FAIT TECHNOLOGIE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${FAITS[Math.floor(Math.random() * FAITS.length)]}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
