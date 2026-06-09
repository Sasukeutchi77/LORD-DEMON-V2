import { sendMessage } from '../lib/sendMessage.js'
const FOODS = [{name:'Avocat',emoji:'🥑',cals:160,prot:2,carbs:9,fat:15,benefits:'Bon gras, potassium, vitamines B, K, E'},{name:'Œuf',emoji:'🥚',cals:155,prot:13,carbs:1,fat:11,benefits:'Protéines complètes, choline, vitamine D'},{name:'Patate douce',emoji:'🍠',cals:86,prot:2,carbs:20,fat:0,benefits:'Bêta-carotène, fibres, vitamine A'},{name:'Quinoa',emoji:'🌾',cals:120,prot:4,carbs:21,fat:2,benefits:'Acides aminés essentiels, sans gluten'},{name:'Saumon',emoji:'🐟',cals:208,prot:20,carbs:0,fat:13,benefits:'Oméga-3, vitamine D, protéines'},{name:'Épinards',emoji:'🥬',cals:23,prot:3,carbs:4,fat:0,benefits:'Fer, magnésium, vitamines K et A'},{name:'Banane',emoji:'🍌',cals:89,prot:1,carbs:23,fat:0,benefits:'Potassium, magnésium, énergie rapide'},{name:'Amandes',emoji:'🥜',cals:576,prot:21,carbs:22,fat:49,benefits:'Vitamine E, calcium, bons acides gras'}]
export default async function nutrition2(sock, sender, args, msg, ctx) {
  const query = args.join(' ').toLowerCase()
  const food = query ? FOODS.find(f=>f.name.toLowerCase().includes(query)) : FOODS[Math.floor(Math.random()*FOODS.length)]
  if (!food) return await sendMessage(sock, sender, `☠ Aliment *${query}* non trouvé dans la base.`)
  await sendMessage(sock, sender,
    `☩━━━〔 🥗 *NUTRITION* 〕━━━☩\n☠\n⛧  ${food.emoji} *${food.name}* (100g)\n☠\n☩  🔥 Calories: *${food.cals} kcal*\n✝  💪 Protéines: *${food.prot}g*\n☠  🌾 Glucides: *${food.carbs}g*\n⛧  💧 Lipides: *${food.fat}g*\n☠\n☩  ✨ *Bienfaits:*\n✝  ${food.benefits}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
