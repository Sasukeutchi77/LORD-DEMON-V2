import { sendMessage } from '../lib/sendMessage.js'
const PAYS = {
  france:'Paris 🇫🇷',allemagne:'Berlin 🇩🇪',japon:'Tokyo 🇯🇵',bresil:'Brasília 🇧🇷',
  inde:'New Delhi 🇮🇳',chine:'Pékin 🇨🇳',russie:'Moscou 🇷🇺',usa:'Washington D.C. 🇺🇸',
  canada:'Ottawa 🇨🇦',australie:'Canberra 🇦🇺',mexique:'Mexico City 🇲🇽',egypte:'Le Caire 🇪🇬',
  nigeria:'Abuja 🇳🇬',senegal:'Dakar 🇸🇳',ghana:'Accra 🇬🇭',cameroun:'Yaoundé 🇨🇲',
  mali:'Bamako 🇲🇱',maroc:'Rabat 🇲🇦',algerie:'Alger 🇩🇿',tunisie:'Tunis 🇹🇳',
  kenya:'Nairobi 🇰🇪',espagne:'Madrid 🇪🇸',italie:'Rome 🇮🇹',portugal:'Lisbonne 🇵🇹',
  belgique:'Bruxelles 🇧🇪',suisse:'Berne 🇨🇭',
}
export default async function capital(sock, sender, args, msg, ctx = {}) {
  const p = args.join(' ').toLowerCase().replace(/\s/g,'_')
  if (!p) return sendMessage(sock, sender, `☠ Usage: .capital <pays>\nEx: .capital france\nDisponibles: ${Object.keys(PAYS).join(', ')}`)
  const cap = PAYS[p]
  if (!cap) return sendMessage(sock, sender, `☠ Pays inconnu: "${p}"\nDisponibles: ${Object.keys(PAYS).join(', ')}`)
  const text =
    `☩━━━〔 🌍 *CAPITALE* 〕━━━☩\n\n` +
    `☠  🌍 *Pays:* ${p.charAt(0).toUpperCase()+p.slice(1).replace(/_/g,' ')}\n` +
    `⛧  🏙️ *Capitale:* ${cap}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
