import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["❤️ Cœur: bat 100 000 fois/jour, pompe 7 500L sang","🧠 Cerveau: 86 milliards neurones, 20% énergie corps","🫁 Poumons: 300M alvéoles, 500mL air/respiration","🦷 Dents: l'émail est le tissu le plus dur du corps humain","🩸 Sang: 5L au total, 25 billions de globules rouges","🦴 Squelette: 206 os, renouvellement tous les 10 ans","🌡️ Température: 37°C normale, fièvre > 38°C","💤 Sommeil: 7-9h/nuit recommandé, 3 cycles paradoxaux","🏃 Sport: 150 min/sem réduit risque maladies de 35%","🥗 Nutrition: 5 fruits/légumes/jour, 2L eau minimum"]
export default async function sante2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🏥 *SANTE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}