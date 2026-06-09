import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Thiéboudienne: riz tomate, poisson braisé, légumes","Mafé: bœuf en sauce arachide épaisse, riz","Yassa poulet: oignons caramélisés, citron, moutarde","Ndolé: feuilles amères, crevettes, cacahuètes","Egusi soup: graines de courge, épinards, viande","Suya: brochettes bœuf épicées, gingembre, yaji","Jollof rice: riz rouge tomates, poulet grillé","Fufu: igname ou manioc pilé, soupe egusi","Injera: galette teff fermentée, ragoûts épicés","Chermoula: marinade fraîche, poisson tagine"]
export default async function recette2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🍲 *RECETTE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}