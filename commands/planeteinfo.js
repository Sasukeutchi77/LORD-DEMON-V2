import { sendMessage } from '../lib/sendMessage.js'
const PLANETES = {'mercure':{dist:'57.9M km',diam:'4,879 km',lune:0,an:'88 jours',temp:'-180°C à 430°C'},'venus':{dist:'108.2M km',diam:'12,104 km',lune:0,an:'225 jours',temp:'465°C'},'terre':{dist:'149.6M km',diam:'12,742 km',lune:1,an:'365 jours',temp:'-88°C à 58°C'},'mars':{dist:'227.9M km',diam:'6,779 km',lune:2,an:'687 jours',temp:'-140°C à 20°C'},'jupiter':{dist:'778.5M km',diam:'139,820 km',lune:95,an:'12 ans',temp:'-110°C'},'saturne':{dist:'1.43B km',diam:'116,460 km',lune:146,an:'29 ans',temp:'-140°C'},'uranus':{dist:'2.87B km',diam:'50,724 km',lune:28,an:'84 ans',temp:'-195°C'},'neptune':{dist:'4.50B km',diam:'49,244 km',lune:16,an:'165 ans',temp:'-200°C'}}
export default async function planeteinfo(sock, sender, args, msg, ctx = {}) {
  try {
    const p = args.join(' ').toLowerCase()
    if (!p || !PLANETES[p]) return await sendMessage(sock, sender, `☠ Usage: .planeteinfo <planète>\nDisponibles: ${Object.keys(PLANETES).join(', ')}`)
    const i = PLANETES[p]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🪐 *${p.toUpperCase()}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Distance du Soleil : *${i.dist}*\n✝ Diamètre : *${i.diam}*\n☠ Lunes : *${i.lune}*\n⛧ Révolution : *${i.an}*\n☩ Température : *${i.temp}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
