import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["GTA V (2013) — Rockstar, $8Mrd total, jeu le plus rentable","Minecraft (2011) — Mojang, 238M copies, sandbox","Fortnite (2017) — Epic, 350M joueurs inscrits","League of Legends (2009) — Riot, 150M comptes","FIFA/EA FC — EA Sports, série sportive #1","Counter-Strike 2 (2023) — Valve, esport compétitif","Red Dead 2 (2018) — Rockstar, 250km² open world","God of War Ragnarök (2022) — Sony, 10M copies","Elden Ring (2022) — Fromsoftware, GOTY, 20M copies","Hogwarts Legacy (2023) — WB, 22M copies en 2 sem"]
export default async function jeux3(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎮 *JEUX3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}