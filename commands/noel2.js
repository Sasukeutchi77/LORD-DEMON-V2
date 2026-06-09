import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🎄 25 décembre — Noël, naissance de Jésus selon tradition chrétienne","🎁 Saint Nicolas — Origine du Père Noël, évêque du 4e siècle","🌟 Épiphanie — 6 janvier, les Rois Mages, galette des rois","🕎 Hanoukka — Fête juive des lumières, 8 jours, dreidel","🌙 Aïd el-Fitr — Fin du ramadan, fête de la rupture du jeûne","🌙 Aïd el-Adha — Fête du sacrifice, mémoire d'Ibrahim","🎊 Nouvel An Chinois — Janvier-février, animal zodiacal, feux d'artifice","🎑 Diwali — Fête hindoue des lumières, 5 jours, lampes diya","🎆 31 décembre — Sylvestre, feux d'artifice, champagne, vœux","🌍 Kwanzaa — Fête afro-américaine, 26 déc-1 jan, 7 principes"]
export default async function noel2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎄 *NOEL2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}