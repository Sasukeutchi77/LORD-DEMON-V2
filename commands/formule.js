import { sendMessage } from '../lib/sendMessage.js'
const FORMULES = {
  'vitesse':'v = d/t (distance ÷ temps) | Ex: 100km ÷ 2h = 50km/h','acceleration':'a = (v₂-v₁)/t | Variation de vitesse','force':'F = m × a (masse × accélération) | Newton','energie':'E = m × c² | Énergie masse Einstein','poids':'P = m × g (masse × 9.81) | Newtons','pression':'P = F/S (force ÷ surface) | Pascals','densite':'ρ = m/V (masse ÷ volume) | kg/m³','ohm':'U = R × I (tension = résistance × intensité)','puissance':'P = U × I (tension × intensité) | Watts','pythagore':'a² + b² = c² | Côtés d\'un triangle rectangle','discriminant':'Δ = b² - 4ac | Équation du 2e degré','racines':'x = (-b ± √Δ) / 2a | Solutions quadratique','perimetre_cercle':'P = 2πr | Périmètre cercle','aire_cercle':'A = πr² | Aire du cercle','volume_sphere':'V = (4/3)πr³ | Volume sphère','interet':'I = C × t × n | Intérêt simple','tva':'TTC = HT × (1 + taux/100) | TVA','pourcentage2':'% = (valeur/total) × 100','variation':'Δ% = ((V₂-V₁)/V₁) × 100 | Variation','bmi3':'IMC = poids(kg) / taille(m)²'}
export default async function formule(sock, sender, args, msg, ctx) {
  const key = args.join(' ').toLowerCase().replace(/[é è ê]/g,'e').replace(/[à â]/g,'a')
  if (!key || key === 'liste') {
    const list = Object.keys(FORMULES).slice(0,10).join(' | ')
    return await sendMessage(sock, sender, `☩━━━〔 📐 *FORMULES* 〕━━━☩\n☠\n⛧  ${list}\n☠  ...et plus\n✝  ${process.env.PREFIX||'.'}formule <nom>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const match = Object.entries(FORMULES).find(([k])=>k.includes(key)||key.includes(k))
  if (!match) return await sendMessage(sock, sender, `☠ Formule *${key}* inconnue. Tape ${process.env.PREFIX||'.'}formule liste`)
  await sendMessage(sock, sender, `☩━━━〔 📐 *${match[0].toUpperCase()}* 〕━━━☩\n☠\n⛧  📏 *Formule:*\n☠  ${match[1]}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
