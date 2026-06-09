import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Christianisme — 2.4Mrd, 1ère religion, Jésus-Christ","Islam — 1.9Mrd, 5 piliers, prophète Muhammad","Hindouisme — 1.2Mrd, 4000 ans, dharma, karma","Bouddhisme — 520M, Bouddha Siddhartha, impermanence","Judaïsme — 15M, + vieille religion monothéiste","Sikhisme — 30M, Punjab, égalité, service (sewa)","Animisme africain — Esprits ancêtres, nature sacrée","Bahá'í — 7M, unité religions et humanité","Vodou — Haïti et Bénin, esprits Loa, cérémonies","Confucianisme — Chine, harmonie sociale, piété filiale"]
export default async function religion3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🙏 *RELIGION3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}