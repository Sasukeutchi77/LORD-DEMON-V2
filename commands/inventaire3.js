import { sendMessage } from '../lib/sendMessage.js'
export default async function inventaire3(sock, sender, args, msg, ctx = {}) {
  try {
    const val = parseFloat(args[0]) || 0
    const result = Math.round(val * 100) / 100
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔧 *INVENTAIRE3*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Valeur : *${val}*\n✝ Résultat : *${result}*\n\n_Tapez .help pour plus d\'infos_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
