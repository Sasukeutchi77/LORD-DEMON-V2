import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Dollar US (USD) — 60% réserves mondiales, Bretton Woods","Euro (EUR) — 20 pays, 2e devise mondiale, BCE","Yen (JPY) — Japon, valeur refuge en crise mondiale","Franc CFA (XOF/XAF) — 14 pays Afrique, depuis 1945","Livre Sterling (GBP) — UK, 1700 ans histoire","Yuan (CNY) — Chine, digitalisation e-CNY en cours","Bitcoin (BTC) — 2009 Satoshi, décentralisé, 21M max","Rand (ZAR) — Afrique du Sud, or et platine","Naira (NGN) — Nigeria, pétrole, economie $440Mrd","Shilling (KES) — Kenya, révolution M-Pesa mobile money"]
export default async function monnaie3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💰 *MONNAIE3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}