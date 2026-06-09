import { sendMessage } from '../lib/sendMessage.js'
const CARDS = [{n:'Le Mat',s:'Liberté, commencement, aventure',i:'Imprudence, manque de direction'},{n:'Le Bateleur',s:'Habileté, diplomatie, désir',i:'Tromperie, manipulation'},{n:'La Papesse',s:'Sagesse, intuition, secret',i:'Ignorance, superficialité'},{n:'L\'Impératrice',s:'Fertilité, beauté, abondance',i:'Stagnation, excès'},{n:'L\'Empereur',s:'Autorité, structure, solidité',i:'Tyrannie, rigidité'},{n:'La Justice',s:'Équité, vérité, loi',i:'Injustice, déséquilibre'},{n:'La Force',s:'Courage, énergie, influence',i:'Faiblesse, doute'},{n:'L\'Étoile',s:'Espoir, foi, inspiration',i:'Désespoir, manque de foi'},{n:'Le Soleil',s:'Joie, succès, enthousiasme',i:'Blocage, manque de clarté'},{n:'Le Monde',s:'Accomplissement, plénitude',i:'Fermeture, inachèvement'}]
export default async function tarotcard(sock, sender, args, msg, ctx = {}) {
  try {
    const c = CARDS[Math.floor(Math.random() * CARDS.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🃏 *TAROT DU JOUR*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Carte : *${c.n}*\n\n✝ En lumière:\n_${c.s}_\n\n☠ En ombre:\n_${c.i}_\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
