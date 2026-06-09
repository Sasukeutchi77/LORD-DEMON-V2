import { sendMessage } from '../lib/sendMessage.js'
export default async function exposant(sock, sender, args, msg, ctx = {}) {
  try {
    const [base, exp] = args.map(Number)
    if (isNaN(base) || isNaN(exp)) return await sendMessage(sock, sender, '☠ Usage: .exposant <base> <exposant>\nEx: .exposant 2 10')
    const result = Math.pow(base, exp)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔢 *EXPOSANT*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Calcul : *${base}^${exp}*\n✝ Résultat : *${result.toLocaleString('fr-FR')}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
