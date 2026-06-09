import { sendMessage } from '../lib/sendMessage.js'
const BACKSTORIES = [
  { evenement: "A perdu sa famille dans une guerre oubliée", consequence: "Ne fait confiance à personne, combat seul", motivation: "Vengeance contre ceux qui ont ordonné l'attaque" },
  { evenement: "Trahi par son meilleur ami au pire moment", consequence: "Maîtrise parfaite de la dissimulation", motivation: "Prouver que la loyauté existe encore" },
  { evenement: "A vendu son âme au démon pour la puissance", consequence: "Pouvoirs immenses mais âme rongée", motivation: "Trouver comment rompre le pacte" },
  { evenement: "Choisi par une entité inconnue à sa naissance", consequence: "Destiné à un rôle qu'il n'a pas choisi", motivation: "Définir lui-même son propre destin" },
  { evenement: "Seul survivant d'un massacre de sa faction", consequence: "Syndrome du survivant, combat acharné", motivation: "Honorer la mémoire de ses compagnons" },
]
export default async function backstory(sock, sender, args, msg, ctx = {}) {
  const b = BACKSTORIES[Math.floor(Math.random() * BACKSTORIES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚰️ *TON BACKSTORY*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💥 *Événement fondateur:* ${b.evenement}\n` +
    `⛧  🔄 *Conséquence:* ${b.consequence}\n` +
    `✝  🎯 *Motivation:* ${b.motivation}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
