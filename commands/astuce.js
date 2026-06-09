import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["💡 Bois un verre d'eau avant chaque repas pour contrôler ta faim.","📱 Active le mode sombre pour économiser batterie et préserver les yeux.","🧠 Apprendre une nouvelle langue booste les connexions neuronales.","💰 Règle du 24h: Attends 24h avant tout achat non essentiel.","🌱 Une plante au bureau améliore la concentration de 15%.","😴 Garde le même horaire de sommeil 7j/7 pour mieux dormir.","🚶 10 min de marche après repas aide la digestion et glycémie.","📚 Lire 20 min/jour = 12 livres par an.","🧘 3 respirations profondes calment le système nerveux instantanément.","✍️ Écrire ses objectifs les rend 42% plus susceptibles d'être atteints."]
export default async function astuce(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💡 *ASTUCE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}