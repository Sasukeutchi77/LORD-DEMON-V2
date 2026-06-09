import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DEFIS = [
  { defi: "Fais 20 pompes maintenant ! 💪", niv: "EXTRÊME", pts: 300 },
  { defi: "Envoie un message gênant à quelqu'un de ta liste 📱", niv: "COURAGEUX", pts: 250 },
  { defi: "Chante une chanson en note vocale maintenant 🎵", niv: "DRÔLE", pts: 200 },
  { defi: "Danse pendant 30 secondes et filme-toi 💃", niv: "FUN", pts: 220 },
  { defi: "Imite quelqu'un du groupe parfaitement 🎭", niv: "CRÉATIF", pts: 180 },
  { defi: "Mange quelque chose d'inhabituel 🍽️", niv: "BIZARRE", pts: 160 },
  { defi: "Appelle quelqu'un au hasard dans tes contacts 📞", niv: "AUDACIEUX", pts: 350 },
  { defi: "Fais rire tout le groupe avec une blague originale 😂", niv: "COMIQUE", pts: 200 },
  { defi: "Écris une poésie en 2 minutes top chrono ✍️", niv: "ARTISTIQUE", pts: 240 },
  { defi: "Raconte une histoire captivante de 5 minutes 📖", niv: "NARRATEUR", pts: 280 },
]
export default async function defi3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const d = DEFIS[Math.floor(Math.random() * DEFIS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔥 *DÉFI ULTIME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🎯 _${d.defi}_\n\n` +
    `✝  ⚡ *Niveau:* ${d.niv}\n` +
    `☩  🏆 *Récompense:* ${d.pts} pts\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
