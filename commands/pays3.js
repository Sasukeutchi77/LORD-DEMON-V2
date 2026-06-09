import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Chine — 1.4Mrd hab, 2e économie $18T, Grande Muraille","Inde — 1.42Mrd, 1ère population mondiale 2023","USA — 334M, 1ère économie $26T, Hollywood","Brésil — 215M, 8e économie, Amazonie 60% CO2","Russie — 144M, 17M km², 1ère superficie mondiale","Nigeria — 220M, 1ère économie africaine, Nollywood","Kenya — M-Pesa pionnière mobile money Afrique","Sénégal — 17M, démocratie stable, Teranga accueil","Maroc — 37M, hub Afrique-Europe, 1er touriste","Éthiopie — 120M, 2e pop africaine, siège Union Africaine"]
export default async function pays3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌍 *PAYS3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}