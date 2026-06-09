import { sendMessage } from '../lib/sendMessage.js'
export default async function interet(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const [capital, taux, duree] = args.map(Number)
  const type = args[3]?.toLowerCase()||'simple'
  if (!capital||!taux||!duree) return await sendMessage(sock, sender, `☩━━━〔 📈 *INTÉRÊT* 〕━━━☩\n☠\n⛧  ${prefix}interet <capital> <taux%> <années> [simple|compose]\n☠  Ex: ${prefix}interet 100000 5 10 compose\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  let montant, interets
  if (type==='compose'||type==='compound') { montant=capital*Math.pow(1+taux/100,duree); interets=montant-capital }
  else { interets=capital*(taux/100)*duree; montant=capital+interets }
  await sendMessage(sock, sender, `☩━━━〔 📈 *INTÉRÊTS ${type.toUpperCase()}* 〕━━━☩\n☠\n⛧  💰 Capital: *${capital.toLocaleString()}*\n☠  📊 Taux: *${taux}%/an* | Durée: *${duree} ans*\n☠\n✝  💵 Final: *${Math.round(montant).toLocaleString()}*\n☠  📈 Intérêts: *+${Math.round(interets).toLocaleString()}*\n⛧  🔢 Gain: *${((interets/capital)*100).toFixed(1)}%*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}