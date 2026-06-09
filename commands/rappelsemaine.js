// commands/rappelsemaine.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function rappelsemaine(sock, sender, args) {
  const now = new Date()
  const joursSemaine = ['Dimanche ☀️', 'Lundi 😐', 'Mardi 💪', 'Mercredi 🌙', 'Jeudi ⚡', 'Vendredi 🎉', 'Samedi 🔥']
  const jour = joursSemaine[now.getDay()]
  const semaine = Math.ceil(now.getDate() / 7)
  const daysLeft = 7 - now.getDay()
  const text =
    `☩━━━〔 📅 *RAPPEL SEMAINE* 〕━━━☩\n\n` +
    `☠  📅 *Aujourd'hui:* ${jour}\n` +
    `⛧  🗓️ *Date:* ${now.toLocaleDateString('fr-FR', {weekday:'long', day:'2-digit', month:'long', year:'numeric'})}\n` +
    `✝  🔢 *Semaine:* ${semaine} du mois\n` +
    `☩  ⏳ *Jours avant weekend:* ${daysLeft}\n\n` +
    `☠  ${daysLeft <= 1 ? '🎉 Le weekend est là !' : daysLeft <= 3 ? '💪 Encore un effort !' : '☠ Longue semaine devant toi...'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
