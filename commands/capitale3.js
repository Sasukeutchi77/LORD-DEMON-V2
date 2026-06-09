import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Paris (France) — Ville Lumière, Tour Eiffel, 2.2M hab","Tokyo (Japon) — 37M métropole, + grande au monde","New York (USA) — 8.3M, Wall Street, ONU siège","Beijing (Chine) — Cité Interdite, 21M hab","Moscou (Russie) — Kremlin, 12M, + grande Europe","Lagos (Nigeria) — 15M+, + grande ville Afrique","Le Caire (Égypte) — 20M, Pyramides, Nil","Nairobi (Kenya) — Silicon Savannah, 4M hab","Dakar (Sénégal) — Pointe extrême occidentale Afrique","Addis-Abeba (Éthiopie) — Siège UA, 4.5M hab"]
export default async function capitale3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🏙️ *CAPITALE3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}