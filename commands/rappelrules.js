import { sendMessage } from '../lib/sendMessage.js'
export default async function rappelrules(sock, sender, args, msg, ctx = {}) {
  try {
    const items = ['Option A ✅','Option B 🔥','Option C ⚡','Option D 💡']
    const item = items[Math.floor(Math.random()*items.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ✨ *RAPPELRULES*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${item}\n\n_LORD DEMON V2 — Commande active!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
