// commands/contrat.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
const clauses = [
  "Tu céderas 1 an de ta vie en échange du pouvoir absolu",
  "Tes rêves seront hanté par des visions du futur",
  "Ta voix sera entendue de tous, mais personne ne te croira jamais",
  "Tu obtiendras la richesse, mais la solitude sera ton prix",
  "Ton ennemi disparaîtra, mais un nouveau, plus puissant, prendra sa place",
  "Tu vivras 200 ans, mais sans pouvoir aimer",
  "Ta force sera décuplée, mais ton âme appartiendra aux Ténèbres",
]
export default async function contrat(sock, sender, args, msg) {
  const name = msg?.pushName || 'Âme contractante'
  const clause = clauses[Math.floor(Math.random() * clauses.length)]
  const id = Math.random().toString(36).substr(2, 8).toUpperCase()
  const now = new Date().toLocaleDateString('fr-FR')
  const text = `☩━━━〔 📜 *CONTRAT DÉMONIAQUE* 〕━━━☩\n\n☠  📜 *PACTE AVEC LE DÉMON*\n⛧  N° ${id} — ${now}\n\n✝  ─────────────────\n☩  Le soussigné *${name}*\n☠  accepte les termes suivants :\n\n⛧  _"${clause}"_\n\n✝  ─────────────────\n☩  🩸 *Signé en sang*\n☠  _Ce contrat est irrévocable._\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
