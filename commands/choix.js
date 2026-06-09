import { sendMessage } from '../lib/sendMessage.js'
export default async function choix(sock, sender, args, msg, ctx = {}) {
  if (args.length < 2) return sendMessage(sock, sender, `☠ Usage: .choix <option1> <option2> ...\nEx: .choix pizza tacos burger`)
  const selection = args[Math.floor(Math.random() * args.length)]
  const raison = [
    "C'est le meilleur choix objectivement.",
    "Les forces obscures ont décidé.",
    "L'oracle démoniaque a parlé.",
    "Le destin a tranché.",
    "Inévitable — c'était écrit.",
  ][Math.floor(Math.random() * 5)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎲 *ORACLE DES CHOIX*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📋 *Options:* ${args.join(', ')}\n\n` +
    `⛧  🎯 *Choix démoniaque: ${selection}*\n` +
    `✝  📖 _${raison}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
