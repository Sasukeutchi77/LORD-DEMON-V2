import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🙈 \"J'étais là mais en mode invisible.\"","😂 \"Mon chien a mangé mon téléphone... et mes excuses.\"","🤷 \"Il y avait 17 pigeons qui bloquaient la route.\"","😴 \"J'ai mis le réveil en snooze par erreur... 7 fois.\"","🌧️ \"Il pleuvait et je ne voulais pas ruiner ma tenue.\"","📱 \"Mon téléphone était en charge, je pouvais pas bouger.\"","😵 \"J'ai eu une crise existentielle de 3 heures.\"","🐌 \"J'ai pris le bus lent par erreur. Le très très lent.\"","🧠 \"J'ai oublié mais mon sous-conscient s'en souvient.\"","🎭 \"J'étais là en esprit. Mon corps avait d'autres plans.\""]
export default async function excuse(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🙈 *EXCUSE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}