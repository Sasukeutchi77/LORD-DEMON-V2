import { sendMessage } from '../lib/sendMessage.js'
export default async function poidsmasse(sock, sender, args, msg, ctx = {}) {
  try {
    const val = args.join(' ') || '42'
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔧 *POIDSMASSE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Entrée : *${val}*\n✝ Résultat : *${Math.floor(Math.random()*1000)}*\n☠ Type : *Calcul LORD DEMON*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
