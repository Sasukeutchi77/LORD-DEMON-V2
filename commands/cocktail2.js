import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Mojito: rhum blanc, menthe, citron vert, sucre, soda","Piña Colada: rhum, crème noix de coco, ananas frais","Tequila Sunrise: tequila, jus orange, grenadine","Cosmopolitan: vodka, triple sec, jus canneberge, citron","Aperol Spritz: Aperol, prosecco, eau gazeuse, orange","Gin Tonic: gin London Dry, tonic premium, citron vert","Margarita: tequila blanco, Cointreau, jus citron vert","Negroni: gin, vermouth rosso, Campari 1:1:1","Dark & Stormy: rhum noir Goslings, ginger beer","Daiquiri: rhum blanc, jus citron vert, sucre de canne"]
export default async function cocktail2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🍹 *COCKTAIL2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}