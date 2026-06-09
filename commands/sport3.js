import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Football — 4Mrd fans, Coupe du Monde tous les 4 ans","Basketball — Inventé 1891 Naismith, NBA $10Mrd/saison","Tennis — 4 Grand Chelems, Wimbledon le plus ancien","Boxe — 17 catégories de poids, Ali légende 56-5","Athlétisme — Bolt 9.58s 100m, Kipchoge marathon","Cyclisme — Tour de France 3500km, 21 étapes","Rugby — 15 joueurs, Coupe du Monde bisannuelle","Natation — Phelps 23 médailles or JO, 100m 46.9s","Cricket — 2e sport mondial 2.5Mrd fans, Inde fort","Arts martiaux — Judo, taekwondo, karaté aux JO"]
export default async function sport3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ⚽ *SPORT3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}