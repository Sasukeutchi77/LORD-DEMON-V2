import { sendMessage } from '../lib/sendMessage.js'
export default async function fraction(sock, sender, args, msg, ctx = {}) {
  try {
    const val = parseFloat(args[0]) || 0
    const result = Math.round(val * 100) / 100
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔧 *FRACTION*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Valeur : *${val}*\n✝ Résultat : *${result}*\n\n_Tapez .help pour plus d\'infos_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
