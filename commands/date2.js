import { sendMessage } from '../lib/sendMessage.js'
export default async function date2(sock, sender, args, msg, ctx = {}) {
  const now = new Date()
  const jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
  const mois = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  const jour = jours[now.getDay()]
  const date = `${now.getDate()} ${mois[now.getMonth()]} ${now.getFullYear()}`
  const heure = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const semaine = Math.ceil(now.getDate() / 7)
  const jourAnne = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📅 *DATE & HEURE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📅 *Date:* ${jour} ${date}\n` +
    `⛧  ⏰ *Heure:* ${heure}\n` +
    `✝  📆 *Semaine:* ${semaine} du mois\n` +
    `☩  🗓️ *Jour de l'année:* ${jourAnne}/365\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
