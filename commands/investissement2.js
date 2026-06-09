import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["📈 Bourse — Actions, dividendes, diversifier 15-20 titres minimum","🏠 Immobilier — Location, 4-8% rendement brut, patrimoine tangible","💰 ETF — Fonds indiciels, frais < 0.5%, diversification automatique","🪙 Crypto — Bitcoin/Ethereum, haute volatilité, max 5-10% portefeuille","💎 Or — Valeur refuge, inflation hedge, 5-10% allocation max","📊 Dollar Cost Averaging — Investir régulièrement, pas de timing","🌱 Investissement ESG — Environnement/Social/Gouvernance, éthique","💼 Startup — Haut risque, haut potentiel, diversifier 10 entreprises","🔄 Rebalancement — Rééquilibrer portefeuille chaque trimestre","⏱️ Temps — Compound interest: 100F à 8%/an = 1000F en 30 ans"]
export default async function investissement2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 📈 *INVESTISSEMENT2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}