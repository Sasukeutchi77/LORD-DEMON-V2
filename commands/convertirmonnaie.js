import { sendMessage } from '../lib/sendMessage.js'
const RATES = {'EUR':1,'USD':1.08,'GBP':0.86,'JPY':164,'CAD':1.46,'CHF':0.96,'XOF':655.96,'MAD':10.8,'NGN':1650,'GHS':16.5,'KES':140,'ZAR':20,'DZD':145,'TND':3.35}
export default async function convertirmonnaie(sock, sender, args, msg, ctx = {}) {
  try {
    const [montant, de, vers] = [parseFloat(args[0]), args[1]?.toUpperCase(), args[2]?.toUpperCase()]
    if (isNaN(montant) || !de || !vers) return await sendMessage(sock, sender, `☠ Usage: .convertirmonnaie <montant> <de> <vers>\nEx: .convertirmonnaie 100 EUR XOF\nDevises: ${Object.keys(RATES).join(', ')}`)
    if (!RATES[de] || !RATES[vers]) return await sendMessage(sock, sender, `☠ Devise inconnue. Disponibles: ${Object.keys(RATES).join(', ')}`)
    const result = (montant / RATES[de] * RATES[vers]).toFixed(2)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  💱 *CONVERSION MONNAIE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ ${montant} ${de}\n✝ = *${result} ${vers}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
