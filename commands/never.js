// commands/never.js — NEVER HAVE I EVER
import { sendMessage } from '../lib/sendMessage.js'

const Q = ["Menti à ses parents 😅","Triché à un examen 📝","Mangé debout au frigo 🍔","Supprimé un message 😬","Regardé une série en entier en 1 jour 📺","Chanté sous la douche 🎶","Fait semblant de ne pas voir quelqu'un 👀","Pris des décisions émotionnelles 😤","Ri seul en regardant son téléphone 😂","Googler son propre nom 🔍"]

export default async function never(sock, sender, args, msg) {
  try {
  const q = Q[Math.floor(Math.random()*Q.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🍻 NEVER HAVE I EVER   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🤚 *Je n'ai jamais...*\n\n${q}\n\n💬 Réagissez si vous l'avez fait !\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}