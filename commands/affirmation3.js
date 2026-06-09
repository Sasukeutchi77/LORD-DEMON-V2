import { sendMessage } from '../lib/sendMessage.js'
const AFF = ['Je suis capable de réaliser ce que je veux.','Chaque jour je deviens une meilleure version de moi.','Ma force intérieure est plus grande que mes peurs.','Je mérite le succès et le bonheur.','Mes erreurs me font grandir, pas échouer.','Je suis le maître de ma destinée.','La persévérance est ma plus grande qualité.','Chaque obstacle est une opportunité déguisée.','Je rayonne de confiance et d\'énergie positive.','Mon potentiel est illimité.','Je choisis la paix intérieure chaque jour.','Mes actions d\'aujourd\'hui créent mon futur.','Je suis entouré de gens qui me soutiennent.','La réussite est inévitable quand je travaille dur.','Je transforme mes rêves en réalité.']
export default async function affirmation3(sock, sender, args, msg, ctx) {
  const aff = AFF[Math.floor(Math.random()*AFF.length)]
  const time = new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})
  await sendMessage(sock, sender,
    `☩━━━〔 ✨ *AFFIRMATION DU JOUR* 〕━━━☩\n☠\n⛧  📅 ${time}\n☠\n☩  💫 *"${aff}"*\n☠\n✝  _Répète-le 3 fois avec conviction!_\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
