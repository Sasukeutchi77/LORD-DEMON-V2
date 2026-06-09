import { sendMessage } from '../lib/sendMessage.js'
export default async function automute(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🛡️ *AUTOMUTE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✅ Action de modération effectuée.\n☠ Commande: *.automute*\n\n_Réservé aux administrateurs._\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
