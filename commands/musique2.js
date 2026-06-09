import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Jazz — Née Nouvelle-Orléans 1890s, Louis Armstrong","Rock — Elvis Presley, Beatles, Stones années 1960s","Hip-Hop — Bronx NY 1973, Afrika Bambaataa, Kool Herc","Afrobeat — Fela Kuti Lagos 1970s, critique politique","Reggae — Bob Marley, Kingston Jamaica, One Love","Blues — Mississipi Robert Johnson, Muddy Waters","Classique — Bach, Beethoven, Mozart, Vivaldi, Chopin","Mbalax — Youssou N'Dour, Sénégal, tambour tama","Coupé-décalé — Côte d'Ivoire, Douk Saga, Paris","Afropop — Burna Boy, Wizkid, Nigeria fusion mondiale"]
export default async function musique2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎵 *MUSIQUE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}