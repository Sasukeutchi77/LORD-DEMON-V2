import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Mercure — 88 jours/orbite, -180°C à +430°C","Vénus — La plus chaude (462°C), tourne à l'envers","Terre — 71% eau, atmosphère protectrice, 1 lune","Mars — 2 lunes, Olympus Mons le plus grand volcan","Jupiter — 79 lunes, Grande Tache Rouge 350 ans","Saturne — Anneaux glacés sur 400 000 km","Uranus — Inclinaison 98°, atmosphère méthane bleue","Neptune — Vents 2100 km/h, lune Triton rétrograde","Pluton — Reclassée naine 2006, 5 lunes connues"]
export default async function planete3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🪐 *PLANETE3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}