// commands/numerologie.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const signifs = {
  1: "Leader né, indépendant et ambitieux ♾️",
  2: "Diplomate sensible, recherche l'harmonie 🌙",
  3: "Créatif expressif, plein de joie 🎭",
  4: "Travailleur discipliné, très stable 🏛️",
  5: "Aventurier libre, aime le changement 🌍",
  6: "Protecteur aimant, très responsable 💖",
  7: "Mystique analytique, cherche la vérité 🔮",
  8: "Ambitieux puissant, succès matériel 👑",
  9: "Humaniste sage, grande compassion 🌟"
}

export default async function numerologie(sock, sender, args) {
  try {
  if (!args.length) return await sendMessage(sock, sender, `☩━━━〔 🔢 *NUMÉROLOGIE* 〕━━━☩\n\n✝  Usage: *.numerologie <votre prénom>*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const nom = args.join(' ').toUpperCase()
  const valeurs = { A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8 }
  let somme = 0
  for (const c of nom) if (valeurs[c]) somme += valeurs[c]
  while (somme > 9) { somme = String(somme).split('').reduce((a,b) => a + parseInt(b), 0) }
  const signif = signifs[somme] || "Être unique hors des normes ✨"
  const text =
    `☩━━━〔 🔢 *NUMÉROLOGIE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  👤 *Prénom:* ${nom}\n` +
    `⛧  🔢 *Nombre de vie:* ${somme}\n` +
    `✝  📖 *Signification:*\n` +
    `☩  _${signif}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}