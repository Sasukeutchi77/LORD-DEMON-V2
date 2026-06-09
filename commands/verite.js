import { sendMessage } from '../lib/sendMessage.js'
const VERITES = ['Quelle est ta plus grande peur secrète?','Quel est le mensonge le plus gros que tu aies dit?','Pour qui as-tu eu le béguin dans ce groupe?','Quelle est la chose la plus embarrassante que tu aies faite?','Quel est ton plus grand regret?','Quelle habitude secrète as-tu que personne ne connaît?','Quelle est la chose la plus folle que tu aies faite?','As-tu déjà triché? Comment?','Quel est ton point faible?']
export default async function verite(sock, sender, args, msg, ctx = {}) {
  try {
    const v = VERITES[Math.floor(Math.random() * VERITES.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚡ *VÉRITÉ OU DÉFI — VÉRITÉ*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ ${v}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
