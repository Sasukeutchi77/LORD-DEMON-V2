import { sendMessage } from '../lib/sendMessage.js'
const PAYS = {'france':'Paris','allemagne':'Berlin','japon':'Tokyo','bresil':'Brasília','inde':'New Delhi','chine':'Pékin','russie':'Moscou','usa':'Washington D.C.','canada':'Ottawa','australie':'Canberra','mexique':'Mexico','egypte':'Le Caire','nigeria':'Abuja','senegal':'Dakar','cote_divoire':'Yamoussoukro','ghana':'Accra','cameroun':'Yaoundé','mali':'Bamako','guinee':'Conakry','togo':'Lomé','benin':'Porto-Novo','maroc':'Rabat','algerie':'Alger','tunisie':'Tunis','kenya':'Nairobi','angola':'Luanda','espagne':'Madrid','italie':'Rome','portugal':'Lisbonne','belgique':'Bruxelles','suisse':'Berne'}
export default async function capital(sock, sender, args, msg, ctx = {}) {
  try {
    const p = args.join('_').toLowerCase()
    if (!p) return await sendMessage(sock, sender, '☠ Usage: .capital <pays>\nEx: .capital france')
    const cap = PAYS[p]
    if (!cap) return await sendMessage(sock, sender, `☠ Pays inconnu. Exemples: france, senegal, nigeria, japon`)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌍 *CAPITALE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Pays : *${p.replace(/_/g, ' ').toUpperCase()}*\n✝ Capitale : *${cap}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
