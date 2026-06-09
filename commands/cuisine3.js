import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["France — Gastronomie UNESCO, 1200+ fromages, sauces","Italie — Pasta, pizza, risotto, gelato, tiramisù","Japon — Sushi, ramen, tempura, wagyu, matcha","Mexique — Tacos, guacamole, mole negro, tamales","Inde — Curry, biryani, naan, dhal, masala chai","Sénégal — Thiéboudienne, yassa, mafé, dibi","Maroc — Couscous, tajine, pastilla, harira, msemen","Ghana — Jollof rice, fufu, kelewele, waakye","Éthiopie — Injera, doro wat, tibs, tej miel","Liban — Houmous, falafel, tabbouleh, shawarma"]
export default async function cuisine3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🍴 *CUISINE3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}