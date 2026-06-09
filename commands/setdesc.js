import { sendMessage } from "../lib/sendMessage.js"

export default async function setdesc(sock, sender, args, msg) {
  try {
    // Vérifier si c'est un groupe
    if (!sender.endsWith('@g.us')) {
      await sendMessage(sock, sender, "☠ Cette sort ne fonctionne que dans les cercles.")
      return
    }

    // Vérifier si une description est fournie
    const newDesc = args.join(' ')
    
    if (!newDesc) {
      await sendMessage(sock, sender, "☠ Indiquez une description.\n\nExemple: .setdesc Bienvenue dans notre cercle !")
      return
    }

    // Changer la description
    await sock.groupUpdateDescription(sender, newDesc)
    
    await sendMessage(sock, sender, `☩━━━〔 ⛧ *SETDESC* 〕━━━☩

🩸 Description mise à jour :\n\n${newDesc}

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
    
    console.log(`✅ setdesc | ${newDesc.substring(0, 30)}...`)
    
  } catch (e) {
    console.error("❌ Erreur setdesc:", e)
    await sendMessage(sock, sender, "☠ rituel échoué. Vérifiez que:\n• Je suis gardien\n• La description ne dépasse pas 500 caractères")
  }
}
