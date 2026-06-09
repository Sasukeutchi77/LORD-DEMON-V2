import { sendMessage } from '../lib/sendMessage.js'
const ELEMENTS = [
  {n:1,s:'H',name:'Hydrogène',masse:'1.008',cat:'Non-métal'},
  {n:2,s:'He',name:'Hélium',masse:'4.003',cat:'Gaz noble'},
  {n:6,s:'C',name:'Carbone',masse:'12.011',cat:'Non-métal'},
  {n:8,s:'O',name:'Oxygène',masse:'15.999',cat:'Non-métal'},
  {n:11,s:'Na',name:'Sodium',masse:'22.990',cat:'Métal alcalin'},
  {n:26,s:'Fe',name:'Fer',masse:'55.845',cat:'Métal de transition'},
  {n:29,s:'Cu',name:'Cuivre',masse:'63.546',cat:'Métal de transition'},
  {n:47,s:'Ag',name:'Argent',masse:'107.868',cat:'Métal de transition'},
  {n:79,s:'Au',name:'Or',masse:'196.967',cat:'Métal de transition'},
  {n:92,s:'U',name:'Uranium',masse:'238.029',cat:'Actinide'},
  {n:78,s:'Pt',name:'Platine',masse:'195.084',cat:'Métal de transition'},
  {n:80,s:'Hg',name:'Mercure',masse:'200.592',cat:'Métal de transition'},
  {n:7,s:'N',name:'Azote',masse:'14.007',cat:'Non-métal'},
  {n:16,s:'S',name:'Soufre',masse:'32.065',cat:'Non-métal'},
  {n:17,s:'Cl',name:'Chlore',masse:'35.453',cat:'Halogène'},
]
export default async function elementaire(sock, sender, args, msg, ctx = {}) {
  const q = args.join(' ').toLowerCase()
  const el = q
    ? ELEMENTS.find(e => e.name.toLowerCase().includes(q) || e.s.toLowerCase()===q || String(e.n)===q)
    : ELEMENTS[Math.floor(Math.random()*ELEMENTS.length)]
  if (!el) return sendMessage(sock, sender, `☠ Élément non trouvé. Ex: .elementaire or`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚗️ *TABLEAU PÉRIODIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔬 *${el.s}* — ${el.name}\n` +
    `⛧  🔢 *Numéro atomique:* ${el.n}\n` +
    `✝  ⚖️ *Masse atomique:* ${el.masse} u\n` +
    `☩  🏷️ *Catégorie:* ${el.cat}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
