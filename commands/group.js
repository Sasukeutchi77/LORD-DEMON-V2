import { sendMessage } from "../lib/sendMessage.js"

export default async function group(sock, sender, args, msg) {
  try {
    // Vérifier si c'est un groupe
    if (!sender.endsWith('@g.us')) {
      await sendMessage(sock, sender, "☠ Cette sort ne fonctionne que dans les cercles.")
      return
    }

    // Vérifier l'argument
    const action = args[0]?.toLowerCase()
    
    if (!action || (action !== 'open' && action !== 'close')) {
      await sendMessage(sock, sender, "☠ Indiquez 'open' ou 'close'.\n\nExemple:\n.group open - Ouvre le cercle\n.group close - Ferme le cercle")
      return
    }

    // Modifier les paramètres du groupe
    if (action === 'open') {
      await sock.groupSettingUpdate(sender, "not_announcement")
      await sendMessage(sock, sender, "🩸 Le cercle est maintenant **ouvert**.\n\nTout le monde peut écrire.")
    } else {
      await sock.groupSettingUpdate(sender, "announcement")
      await sendMessage(sock, sender, "🩸 Le cercle est maintenant **fermé**.\n\nSeuls les gardiens peuvent écrire.")
    }
    
    console.log(`✅ group ${action}`)
    
  } catch (e) {
    console.error("❌ Erreur group:", e)
    await sendMessage(sock, sender, "☠ rituel échoué. Vérifiez que je suis administrateur.")
  }
}
