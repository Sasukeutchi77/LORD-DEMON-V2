import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["😄 Pourquoi les plongeurs plongent en arrière? Sinon ils tomberaient dans le bateau!","😂 Mon chien: silence total quand je demande ce que 2-2 fait.","🤣 Dans une bibliothèque: \"Un steak SVP!\" Bibliothécaire: \"C'est une biblio!\" Il murmure: \"Un steak SVP.\"","😄 Pourquoi les squelettes se battent jamais? Ils ont pas le cran!","😂 Mon chat me regarde à 3h du mat. Il sait exactement ce qu'il fait.","🤣 Un livre m'est tombé sur la tête. J'ai que moi à blâmer.","😄 C'est quoi un canif? Un petit fien!","😂 Chat dans peinture rouge = Chat-peint de Noël!"]
export default async function blague2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 😂 *BLAGUE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}