import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🟥 INTJ — Architecte: Stratège froid, vision long terme (2%)","🟧 INTP — Logicien: Analyse pure, théories, solitaire brillant (3%)","🟨 ENTJ — Commandant: Né pour diriger, ambitieux (2%)","🟩 ENTP — Débatteur: Challenge tout, créatif, innovant (3%)","🔵 INFJ — Avocat: Idéaliste profond, rare, humaniste (1%)","🟣 INFP — Médiateur: Romantique, valeurs fortes (4%)","⚫ ENFJ — Protagoniste: Charismatique, inspirateur (2%)","🟤 ENFP — Campagnard: Enthousiaste, curieux (7%)","🔴 ISTJ — Logisticien: Fiable, responsable, factuel (13%)","🟠 ESTP — Entrepreneur: Action immédiate, risques (4%)"]
export default async function typepersonnalite(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🧠 *TYPEPERSONNALITE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}