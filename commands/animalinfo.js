import { sendMessage } from '../lib/sendMessage.js'
const ANIMAUX = {'lion':{vie:'10-14 ans',regime:'Carnivore',poids:'120-250 kg',hab:'Savane africaine',stat:'Vulnérable'},'elephant':{vie:'60-70 ans',regime:'Herbivore',poids:'4000-6000 kg',hab:'Afrique/Asie',stat:'Menacé'},'tigre':{vie:'10-15 ans',regime:'Carnivore',poids:'100-300 kg',hab:'Forêts Asie',stat:'En danger'},'gorille':{vie:'35-40 ans',regime:'Herbivore',poids:'70-200 kg',hab:'Afrique centrale',stat:'En danger critique'},'dauphin':{vie:'15-50 ans',regime:'Carnivore poisson',poids:'150-650 kg',hab:'Tous les océans',stat:'Stable'},'panda':{vie:'15-20 ans',regime:'Bambou',poids:'70-130 kg',hab:'Montagnes Chine',stat:'Vulnérable'},'cheetah':{vie:'10-12 ans',regime:'Carnivore',poids:'35-65 kg',hab:'Savane africaine',stat:'Vulnérable'}}
export default async function animalinfo(sock, sender, args, msg, ctx = {}) {
  try {
    const a = args.join(' ').toLowerCase()
    if (!a || !ANIMAUX[a]) return await sendMessage(sock, sender, `☠ Usage: .animalinfo <animal>\nEx: .animalinfo lion\nDisponibles: ${Object.keys(ANIMAUX).join(', ')}`)
    const i = ANIMAUX[a]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🦁 *${a.toUpperCase()}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Espérance de vie : *${i.vie}*\n✝ Régime : *${i.regime}*\n☠ Poids : *${i.poids}*\n⛧ Habitat : *${i.hab}*\n☩ Statut : *${i.stat}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
