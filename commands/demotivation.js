import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["😈 Pourquoi réussir quand tu peux rater avec style?","💀 Le travail c'est la santé. Alors repose-toi, tu es malade.","🛋️ Mieux vaut être assis qu'allongé. Ou le contraire.","😴 Le meilleur moment pour faire quelque chose, c'est demain.","🤷 Pourquoi être le meilleur quand être moyen est si confortable?","😂 Les gens qui disent impossible n'est pas français n'ont pas essayé.","🐌 Lent mais constant... finit après tout le monde quand même.","💤 Le rêve c'est d'abord de dormir pour en avoir un.","😏 Ma motivation est inversement proportionnelle à la distance du lit.","🎯 Si au début tu rates... c'est peut-être un signe."]
export default async function demotivation(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 😈 *DEMOTIVATION* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}