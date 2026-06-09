import { sendMessage } from '../lib/sendMessage.js'
const PAYS = {'france':{pop:'68M',sup:'551,695 km²',langue:'Français',monnaie:'Euro',cont:'Europe'},'senegal':{pop:'17M',sup:'196,722 km²',langue:'Français/Wolof',monnaie:'FCFA',cont:'Afrique'},'nigeria':{pop:'220M',sup:'923,768 km²',langue:'Anglais',monnaie:'Naira',cont:'Afrique'},'maroc':{pop:'37M',sup:'710,850 km²',langue:'Arabe/Français',monnaie:'Dirham',cont:'Afrique'},'japon':{pop:'125M',sup:'377,975 km²',langue:'Japonais',monnaie:'Yen',cont:'Asie'},'bresil':{pop:'215M',sup:'8.5M km²',langue:'Portugais',monnaie:'Real',cont:'Amérique'},'cameroun':{pop:'27M',sup:'475,442 km²',langue:'Français/Anglais',monnaie:'FCFA',cont:'Afrique'},'ghana':{pop:'32M',sup:'238,533 km²',langue:'Anglais',monnaie:'Cedi',cont:'Afrique'},'cote_divoire':{pop:'26M',sup:'322,463 km²',langue:'Français',monnaie:'FCFA',cont:'Afrique'},'mali':{pop:'22M',sup:'1,240,192 km²',langue:'Français',monnaie:'FCFA',cont:'Afrique'}}
export default async function paysinfo(sock, sender, args, msg, ctx = {}) {
  try {
    const p = args.join('_').toLowerCase()
    if (!p || !PAYS[p]) return await sendMessage(sock, sender, `☠ Usage: .paysinfo <pays>\nEx: .paysinfo senegal\nDisponibles: ${Object.keys(PAYS).join(', ')}`)
    const i = PAYS[p]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌍 *${p.replace(/_/g,' ').toUpperCase()}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Population : *${i.pop}*\n✝ Superficie : *${i.sup}*\n☠ Langue : *${i.langue}*\n⛧ Monnaie : *${i.monnaie}*\n☩ Continent : *${i.cont}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
