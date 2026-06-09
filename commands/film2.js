import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Titanic (1997) — Cameron, $2.2Mrd, Oscar Meilleur Film","Le Parrain (1972) — Coppola, Marlon Brando, 9.2/10","Star Wars (1977) — Lucas, franchise $10Mrd totale","Avengers Endgame (2019) — $2.79Mrd record mondial","Inception (2010) — Nolan, rêves dans les rêves","The Dark Knight (2008) — Ledger/Joker, 9.0/10 IMDB","Parasite (2019) — Bong Joon-ho, 1er film non-anglais","Black Panther (2018) — Wakanda, $1.3Mrd box office","Spirited Away (2001) — Miyazaki, Oscar animation","Pan's Labyrinth (2006) — Del Toro, fantastique sombre"]
export default async function film2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎬 *FILM2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}