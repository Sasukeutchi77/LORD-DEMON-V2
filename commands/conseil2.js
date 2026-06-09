import { sendMessage } from '../lib/sendMessage.js'
const CONSEILS = ['💡 Bois 8 verres d\'eau par jour — ton corps te remerciera','📚 Lis 10 pages par jour — dans 1 an tu auras lu 15+ livres','🏃 Marche 30 min par jour — réduit le stress de 40%','😴 Dors 7-8h — le manque de sommeil affecte 100% de tes capacités','🤝 Dis merci plus souvent — ça transforme les relations','📱 Moins de réseaux sociaux — plus de productivité réelle','💪 Un objectif + une action quotidienne = succès garanti','🧘 5 min de méditation = cerveau plus calme toute la journée','✍️ Écris tes objectifs — 42% plus de chances de les atteindre','🌅 Lève-toi plus tôt — les 2 premières heures sont les plus productives']
export default async function conseil2(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌟 *CONSEIL DU JOUR*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${CONSEILS[Math.floor(Math.random() * CONSEILS.length)]}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
