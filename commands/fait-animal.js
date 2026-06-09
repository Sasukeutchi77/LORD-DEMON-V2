// commands/fait-animal.js
import { sendMessage } from '../lib/sendMessage.js'

const FACTS = ["🐙 Les pieuvres ont 3 cœurs et du sang bleu.","🦒 Les girafes ont le même nombre de vertèbres cervicales que les humains : 7.","🐺 Les loups peuvent courir jusqu'à 65 km/h.","🐘 Les éléphants sont les seuls animaux qui ne peuvent pas sauter.","🦈 Les requins ont existé avant les arbres (450 millions d'années).","🐦 Les faucons pèlerins piquent à 320 km/h.","🦋 Les papillons goûtent avec leurs pattes.","🐝 Les abeilles peuvent reconnaître les visages humains.","🐬 Les dauphins ont des noms individuels entre eux.","🦁 Les lions mâles dorment 20h par jour."]

export default async function fait_animal(sock, sender, args, msg) {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🦁 FAIT ANIMAL   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${fact}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
