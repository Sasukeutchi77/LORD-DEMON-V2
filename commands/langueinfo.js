import { sendMessage } from '../lib/sendMessage.js'
const LANGS = {'francais':{loc:'300M+',fam:'Roman',pays:'France, Belgique, Suisse, Afrique francophone',phrase:'Bonjour le monde!'},'anglais':{loc:'1.5B+',fam:'Germanique',pays:'USA, UK, Australie, Canada',phrase:'Hello World!'},'espagnol':{loc:'500M+',fam:'Roman',pays:'Espagne, Mexique, Argentine',phrase:'¡Hola mundo!'},'arabe':{loc:'400M+',fam:'Sémitique',pays:'22 pays arabes',phrase:'مرحبا بالعالم'},'mandarin':{loc:'1.2B+',fam:'Sino-tibétaine',pays:'Chine, Taïwan, Singapour',phrase:'你好，世界！'},'portugais':{loc:'250M+',fam:'Roman',pays:'Brésil, Portugal, Angola',phrase:'Olá, mundo!'},'russe':{loc:'150M+',fam:'Slave',pays:'Russie, Ukraine, Belarus',phrase:'Привет, мир!'},'japonais':{loc:'130M',fam:'Japonique',pays:'Japon',phrase:'こんにちは世界！'}}
export default async function langueinfo(sock, sender, args, msg, ctx = {}) {
  try {
    const l = args.join(' ').toLowerCase()
    if (!l || !LANGS[l]) return await sendMessage(sock, sender, `☠ Usage: .langueinfo <langue>\nDisponibles: ${Object.keys(LANGS).join(', ')}`)
    const i = LANGS[l]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🗣️ *LANGUE: ${l.toUpperCase()}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Locuteurs : *${i.loc}*\n✝ Famille : *${i.fam}*\n☠ Pays : *${i.pays}*\n⛧ Bonjour : *${i.phrase}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
