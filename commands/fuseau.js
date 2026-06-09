import { sendMessage } from '../lib/sendMessage.js'
const ZONES = {'paris':'Europe/Paris','new_york':'America/New_York','tokyo':'Asia/Tokyo','londres':'Europe/London','dubai':'Asia/Dubai','abidjan':'Africa/Abidjan','dakar':'Africa/Dakar','kinshasa':'Africa/Kinshasa','nairobi':'Africa/Nairobi','sydney':'Australia/Sydney','moscou':'Europe/Moscow','lagos':'Africa/Lagos','accra':'Africa/Accra','bamako':'Africa/Bamako','douala':'Africa/Douala'}
export default async function fuseau(sock, sender, args, msg, ctx = {}) {
  try {
    const city = args.join('_').toLowerCase()
    if (!city || !ZONES[city]) return await sendMessage(sock, sender, `☠ Usage: .fuseau <ville>\nEx: .fuseau paris\nVilles: ${Object.keys(ZONES).join(', ')}`)
    const now = new Date().toLocaleString('fr-FR', {timeZone: ZONES[city], dateStyle: 'full', timeStyle: 'long'})
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌍 *FUSEAU HORAIRE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Ville : *${city.toUpperCase()}*\n✝ Heure locale : *${now}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
