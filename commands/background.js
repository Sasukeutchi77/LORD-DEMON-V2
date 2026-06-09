import { sendMessage } from '../lib/sendMessage.js'
const BACKGROUNDS = [
  { titre: "Mercenaire Déchu", histoire: "Ancien guerrier d'élite reconverti en aventurier solitaire", secret: "Trahi par son commandant lors d'une mission" },
  { titre: "Mage en Exil", histoire: "Archimage banni pour pratique de magie interdite", secret: "Cherche sa rédemption via l'élimination du mal" },
  { titre: "Guerrier Amnésique", histoire: "Combattant sans mémoire qui reconstruit son identité", secret: "Était autrefois le plus grand assassin du royaume" },
  { titre: "Orphelin des Assassins", histoire: "Élevé depuis l'enfance dans un ordre de tueurs silencieux", secret: "Son vrai père est le chef de l'ordre ennemi" },
  { titre: "Noble Déchu", histoire: "Héritier d'un empire qui a tout perdu en une nuit", secret: "La chute de sa maison était orchestrée par lui-même" },
  { titre: "Gardien Maudit", histoire: "Protecteur d'un secret millénaire qui ne peut jamais mourir", secret: "Cherche désespérément à être tué pour se libérer" },
]
export default async function background(sock, sender, args, msg, ctx = {}) {
  const b = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📜 *BACKGROUND RPG*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎭 *Archétype:* ${b.titre}\n` +
    `⛧  📖 *Histoire:* ${b.histoire}\n` +
    `✝  🔒 *Secret caché:* _${b.secret}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
