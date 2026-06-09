import { sendMessage } from '../lib/sendMessage.js'
const CARDS = [
  {name:'Le Fou',emoji:'🃏',upright:'Liberté, nouveau départ, aventure',reversed:'Imprudence, folie, manque de direction'},
  {name:'Le Magicien',emoji:'✨',upright:'Volonté, talent, créativité',reversed:'Tromperie, manipulation, talents gâchés'},
  {name:'La Papesse',emoji:'📚',upright:'Intuition, sagesse, mystère',reversed:'Secrets, ignorance, manque de discernement'},
  {name:'L\'Impératrice',emoji:'🌺',upright:'Fertilité, abondance, nature',reversed:'Dépendance, stagnation, excès'},
  {name:'L\'Empereur',emoji:'👑',upright:'Autorité, structure, protection',reversed:'Domination, rigidité, tyrannie'},
  {name:'Le Pape',emoji:'⛪',upright:'Tradition, spiritualité, conseils',reversed:'Dogme, conformisme, désinformation'},
  {name:'L\'Amoureux',emoji:'💕',upright:'Amour, choix, harmonie',reversed:'Déséquilibre, mauvais choix, infidélité'},
  {name:'Le Chariot',emoji:'🏆',upright:'Succès, maîtrise, volonté',reversed:'Agression, manque de contrôle, défaite'},
  {name:'La Force',emoji:'🦁',upright:'Courage, patience, compassion',reversed:'Doute, faiblesse, lâcheté'},
  {name:'L\'Hermite',emoji:'🕯️',upright:'Introspection, guidance, solitude',reversed:'Isolement, paranoïa, solitude excessive'},
  {name:'La Roue de Fortune',emoji:'🎡',upright:'Chance, cycles, destin',reversed:'Malchance, résistance au changement'},
  {name:'La Justice',emoji:'⚖️',upright:'Équilibre, vérité, cause et effet',reversed:'Injustice, manque d\'honnêteté'},
  {name:'Le Pendu',emoji:'🔄',upright:'Suspension, sacrifice, attente',reversed:'Stagnation, désintérêt, résistance'},
  {name:'La Mort',emoji:'💀',upright:'Transformation, fin, renouveau',reversed:'Résistance au changement, stagnation'},
  {name:'La Tempérance',emoji:'⚗️',upright:'Équilibre, modération, patience',reversed:'Excès, manque d\'harmonie'},
  {name:'Le Diable',emoji:'😈',upright:'Attachement, ambition, ombre',reversed:'Libération, indépendance'},
  {name:'La Tour',emoji:'⚡',upright:'Chaos, révélation, disruption',reversed:'Évitement de catastrophe'},
  {name:'L\'Étoile',emoji:'⭐',upright:'Espoir, inspiration, sérénité',reversed:'Désespoir, manque de foi'},
  {name:'La Lune',emoji:'🌙',upright:'Illusion, intuition, subconscient',reversed:'Confusion, peur, distorsion'},
  {name:'Le Soleil',emoji:'☀️',upright:'Joie, succès, vitalité',reversed:'Pessimisme, dépression'},
  {name:'Le Jugement',emoji:'📯',upright:'Réveil, rédemption, absolution',reversed:'Doute, auto-critique sévère'},
  {name:'Le Monde',emoji:'🌍',upright:'Accomplissement, intégration, voyage',reversed:'Quête inachevée, stagnation'},
]
export default async function tarot(sock, sender, args, msg, ctx) {
  const num = Math.min(3, Math.max(1, parseInt(args[0]) || 1))
  const drawn = []
  const deck = [...CARDS]
  for (let i = 0; i < num; i++) {
    const idx = Math.floor(Math.random()*deck.length)
    const card = deck.splice(idx,1)[0]
    const reversed = Math.random() > 0.7
    drawn.push({ ...card, reversed })
  }
  let text = `☩━━━〔 🎴 *TIRAGE TAROT* 〕━━━☩\n☠\n`
  const positions = ['Passé','Présent','Futur']
  drawn.forEach((c,i) => {
    text += `⛧  ${num>1?`*${positions[i]}* — `:''}${c.emoji} *${c.name}* ${c.reversed?'(inversé)':''}\n`
    text += `☩  ${c.reversed ? c.reversed : c.upright}\n☠\n`
  })
  text += `✝  _(Tirage aléatoire — divertissement uniquement)_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
