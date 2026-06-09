import { sendMessage } from '../lib/sendMessage.js'
const COORDS = {
  'paris':[48.85,2.35],'new york':[40.71,-74.01],'tokyo':[35.68,139.65],'londres':[51.51,-0.13],
  'dubai':[25.20,55.27],'abidjan':[5.36,-4.01],'dakar':[14.72,-17.47],'lagos':[6.52,3.38],
  'nairobi':[1.29,36.82],'moscou':[55.76,37.62],'sydney':[-33.87,151.21],'beijing':[39.90,116.41],
  'kinshasa':[-4.32,15.32],'cairo':[30.04,31.24],'casablanca':[33.59,-7.62],'accra':[5.55,-0.20],
  'johannesburg':[-26.20,28.04],'bamako':[12.65,-8.00],'douala':[4.05,9.70],'yaounde':[3.86,11.52],
}
function haversine([a1,o1],[a2,o2]) {
  const R=6371,r=Math.PI/180
  const dA=(a2-a1)*r,dO=(o2-o1)*r
  const h=Math.sin(dA/2)**2+Math.cos(a1*r)*Math.cos(a2*r)*Math.sin(dO/2)**2
  return Math.round(2*R*Math.asin(Math.sqrt(h)))
}
export default async function distancevilles(sock, sender, args, msg, ctx = {}) {
  const parts = args.join(' ').split(/[,;|]/)
  if (parts.length < 2) {
    const villes = Object.keys(COORDS).join(', ')
    return sendMessage(sock, sender, `☠ Usage: .distancevilles <ville1>,<ville2>\n_Villes dispo:_ ${villes}`)
  }
  const v1 = parts[0].trim().toLowerCase()
  const v2 = parts[1].trim().toLowerCase()
  const c1 = COORDS[v1], c2 = COORDS[v2]
  if (!c1) return sendMessage(sock, sender, `☠ Ville inconnue: ${v1}`)
  if (!c2) return sendMessage(sock, sender, `☠ Ville inconnue: ${v2}`)
  const dist = haversine(c1, c2)
  const text =
    `☩━━━〔 🌍 *DISTANCE* 〕━━━☩\n\n` +
    `☠  📍 *${v1.toUpperCase()}* → *${v2.toUpperCase()}*\n\n` +
    `⛧  ✈️ *Distance:* ${dist.toLocaleString()} km\n` +
    `✝  ⏱️ *Vol ~:* ${Math.round(dist/850)}h${Math.round((dist/850%1)*60)}min\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
