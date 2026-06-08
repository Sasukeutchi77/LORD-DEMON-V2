import { sendMessage } from "../lib/sendMessage.js"

export default async function tagall(sock, sender, args, msg) {
  try {
    // Vérifier si c'est un groupe
    if (!sender.endsWith('@g.us')) {
      await sendMessage(sock, sender, "☠ Cette sort ne fonctionne que dans les cercles.")
      return
    }

    // Récupérer les infos du groupe
    const groupMetadata = await sock.groupMetadata(sender)
    const participants = groupMetadata.participants
    
    // Créer la liste des mentions
    const mentions = participants.map(p => p.id)
    
    // Message personnalisé ou message par défaut
    const customMessage = args.join(' ') || "👋 Attention tout le monde !"
    
    // Envoyer le message avec mentions
    const text = `
☩━━━〔 *TAG ALL* 〕━━━☩
☠
⛧ 📢 ${customMessage}
☠
☩ 👻 ${participants.length} âmes tagués
☠
⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    await sock.sendMessage(sender, { 
      text: text,
      mentions: mentions
    })
    
    console.log(`✅ tagall | ${participants.length} membres`)
    
  } catch (e) {
    console.error("❌ Erreur tagall:", e)
    await sendMessage(sock, sender, "☠ rituel échoué. Vérifiez que je suis gardien du cercle.")
  }
}
