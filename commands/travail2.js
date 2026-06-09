import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["💼 CV — Photo pro, 1 page max, chiffrer réalisations, sans fautes","🤝 Entretien — Arriver 10min tôt, STAR (Situation Tâche Action Résultat)","📧 Email pro — Objet clair, salutations, signature complète","🌐 LinkedIn — Photo + bannière pro, résumé 3 phrases, 500+ contacts","💡 Freelance — Portfolio, tarif horaire = fixe x2.5, contrat écrit","🏢 Entreprise — Business plan, étude marché, registre RCCM Afrique","📊 Présentation — Règle 10/20/30: 10 slides, 20min, 30pt police min","🎯 Productivité — Méthode Eisenhower: Urgent/Important 2x2","💰 Négocier — Recherche salaire marché, silence = puissant outil","🌱 Formation continue — Coursera, edX, YouTube gratuit, 30min/jour"]
export default async function travail2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💼 *TRAVAIL2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}