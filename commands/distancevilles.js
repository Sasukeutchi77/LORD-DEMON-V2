import { sendMessage } from '../lib/sendMessage.js'
const COORDS = {'paris':[48.85,2.35],'new_york':[40.71,-74.01],'tokyo':[35.68,139.65],'londres':[51.51,-0.13],'dubai':[25.20,55.27],'abidjan':[5.36,-4.01],'dakar':[14.72,-17.47],'lagos':[6.52,3.38],'nairobi':[1.29,36.82],'moscou':[55.76,37.62],'sydney':[-33.87,151.21],'beijing':[39.90,116.41],'kinshasa':[-4.32,15.32],'cairo':[30.04,31.24]}
export default async function distancevilles(sock, sender, args, msg, ctx = {}) {
  try {
    const [v1, v2] = [args[0]?.toLowerCase(), args[1]?.toLowerCase()]
    if (!v1 || !v2) return await sendMessage(sock, sender, `☠ Usage: .distancevilles <ville1> <ville2>\nEx: .distancevilles paris tokyo\nVilles: ${Object.keys(COORDS).join(', ')}`)
    if (!COORDS[v1] || !COORDS[v2]) return await sendMessage(sock, sender, `☠ Villes disponibles: ${Object.keys(COORDS).join(', ')}`)
    const [lat1, lon1] = COORDS[v1], [lat2, lon2] = COORDS[v2]
    const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
    const dist = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)))
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  📍 *DISTANCE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ De : *${v1.toUpperCase()}*\n✝ Vers : *${v2.toUpperCase()}*\n☠ Distance : *${dist.toLocaleString('fr-FR')} km*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
