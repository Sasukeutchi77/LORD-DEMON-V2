import { sendMessage } from '../lib/sendMessage.js'
const HABITS = {matin:['💧 Boire un verre d\'eau dès le réveil','🌅 5 min de silence / méditation','📝 Écrire 3 objectifs du jour','🏋️ 10 min d\'exercice physique','📖 15 min de lecture enrichissante'],soir:['📔 Journaling: 3 bonnes choses de la journée','📵 Couper les écrans 1h avant dormir','🛁 Douche relaxante','📚 Lecture 20 min','😴 Dormir à heure fixe'],productivite:['⏰ Technique Pomodoro (25min focus / 5min pause)','📋 Liste de 3 tâches prioritaires','🚫 Désactiver les notifications pendant le travail','💪 Commencer par la tâche la plus difficile','✅ Célébrer chaque petite victoire'],sante:['🥗 Manger 5 fruits/légumes par jour','💧 2L d\'eau minimum','🚶 10 000 pas (ou 30min marche)','😴 7-9h de sommeil','🧘 Gérer le stress quotidiennement']}
export default async function habitude(sock, sender, args, msg, ctx) {
  try {
  const cat = args[0]?.toLowerCase() || 'matin'
  const habits = HABITS[cat] || HABITS.matin
  const prefix = process.env.PREFIX || '.'
  let text = `☩━━━〔 ✅ *HABITUDES ${cat.toUpperCase()}* 〕━━━☩\n☠\n`
  habits.forEach((h,i) => { text += `⛧  ${i+1}. ${h}\n☠\n` })
  text += `✝  Catégories: matin | soir | productivite | sante\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}