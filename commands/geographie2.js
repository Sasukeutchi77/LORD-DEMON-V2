import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🌍 Océan Pacifique — 165M km², 47% surface terrestre, le plus grand","🌋 Mont Everest — 8849m, Himalaya, point culminant Terre","🏜️ Sahara — 9.2M km², plus grand désert chaud, Afrique du Nord","🌊 Fosse des Mariannes — 11 034m, point le plus profond Terre","🌿 Amazonie — 5.5M km², 10% espèces Terre, poumon planète","❄️ Antarctique — 14M km², 70% eau douce mondiale en glace","🏔️ Andes — 7500km, plus longue chaîne montagnes Terre","🌊 Nil — 6650km, plus long fleuve selon certaines mesures","🌊 Amazone — Débit: 20% eau douce mondiale dans les mers","🌋 Vésuve — Pompeï 79 ap., toujours actif près de 3M habitants"]
export default async function geographie2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌍 *GEOGRAPHIE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}