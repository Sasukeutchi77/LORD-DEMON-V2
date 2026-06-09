import { sendMessage } from '../lib/sendMessage.js'
const MYTHOS = {'zeus':{orig:'Grec',role:'Roi des dieux',sym:'Foudre ⚡',fon:'Ciel, tonnerre, justice'},'odin':{orig:'Nordique',role:'Roi des Aesir',sym:'Gungnir 🔱',fon:'Guerre, sagesse, mort'},'ra':{orig:'Égyptien',role:'Dieu solaire',sym:'Disque solaire ☀️',fon:'Soleil, création, rois'},'shiva':{orig:'Hindou',role:'Dieu destructeur',sym:'Trident 🔱',fon:'Destruction, transformation'},'thor':{orig:'Nordique',role:'Dieu du tonnerre',sym:'Mjolnir 🔨',fon:'Tonnerre, force, protection'},'anubis':{orig:'Égyptien',role:'Dieu des morts',sym:'Crosse & fléau',fon:'Mort, embaumement, jugement'},'ares':{orig:'Grec',role:'Dieu de la guerre',sym:'Lance & bouclier ⚔️',fon:'Guerre, violence, courage'},'thot':{orig:'Égyptien',role:'Dieu de la sagesse',sym:'Plume d\'ibis 🪶',fon:'Écriture, magie, lune'}}
export default async function mythologie(sock, sender, args, msg, ctx = {}) {
  try {
    const d = args.join(' ').toLowerCase()
    if (!d || !MYTHOS[d]) return await sendMessage(sock, sender, `☠ Usage: .mythologie <dieu>\nEx: .mythologie zeus\nDieux: ${Object.keys(MYTHOS).join(', ')}`)
    const i = MYTHOS[d]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🏛️ *${d.toUpperCase()}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Origine : *${i.orig}*\n✝ Rôle : *${i.role}*\n☠ Symbole : *${i.sym}*\n⛧ Fonction : *${i.fon}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
