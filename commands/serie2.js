import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Breaking Bad — AMC 5 saisons, Bryan Cranston, 10/10","Game of Thrones — HBO 8 saisons, dragons, politique","Squid Game (2021) — Netflix record 111M foyers S1","Money Heist (2017) — Netflix espagnol, La Casa","Lupin (2021) — Netflix, Omar Sy, 70M vues S1","Stranger Things — Netflix, années 80, Upside Down","The Last of Us (2023) — HBO, meilleure adaption jeu","Euphoria — HBO, Zendaya, génération Z dure","Dark (2017) — Netflix allemand, voyages temporels","Peaky Blinders — BBC, gangsters Birmingham 1919"]
export default async function serie2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 📺 *SERIE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}