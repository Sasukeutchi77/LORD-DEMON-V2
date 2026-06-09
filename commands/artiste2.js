import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Pablo Picasso — Cubisme, 147000 oeuvres, Guernica","Léonard de Vinci — Génie universel, Mona Lisa 1503","Michel-Ange — Chapelle Sixtine, David marbre blanc","Vincent van Gogh — 2100 toiles, Nuit étoilée","Frida Kahlo — 143 toiles, 55 autoportraits, Mexique","Banksy — Street art anonyme, Girl with Balloon","Jean-Michel Basquiat — Du graffiti aux galeries NYC","Wifredo Lam — Afro-cubain, surréalisme tropical","El Anatsui — Sculptures capsules, Ghana-Nigeria","Kehinde Wiley — Portrait officiel Barack Obama"]
export default async function artiste2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎨 *ARTISTE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}