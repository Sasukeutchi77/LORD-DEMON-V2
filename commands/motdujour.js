import { sendMessage } from '../lib/sendMessage.js'
const MOTS = [{m:'Ephémère',d:'Qui ne dure que très peu de temps',e:'La beauté est éphémère.'},{m:'Sérendipité',d:'Trouver par hasard ce qu\'on ne cherchait pas',e:'La sérendipité l\'a conduit à cette découverte.'},{m:'Ubiquité',d:'Présence en plusieurs endroits simultanément',e:'Il avait un don d\'ubiquité.'},{m:'Pérenne',d:'Qui dure toujours, durable',e:'Une amitié pérenne.'},{m:'Quintessence',d:'Ce qu\'il y a de plus pur, d\'essentiel',e:'La quintessence de l\'art.'},{m:'Volupté',d:'Plaisir des sens raffiné',e:'La volupté de ce moment.'},{m:'Méandre',d:'Sinuosité d\'un cours d\'eau',e:'Les méandres du fleuve.'}]
export default async function motdujour(sock, sender, args, msg, ctx = {}) {
  try {
    const today = MOTS[new Date().getDate() % MOTS.length]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  📚 *MOT DU JOUR*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Mot : *${today.m}*\n✝ Définition : ${today.d}\n☠ Exemple : _${today.e}_\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
