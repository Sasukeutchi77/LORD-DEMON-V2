// commands/mythologie.js — MYTHOLOGIE DÉMONIAQUE
import { sendMessage } from '../lib/sendMessage.js'
const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const MYTHES = [
  { entite:'⚰️ AZRAEL',        origine:'Ancien Testament & Islam', rang:'Ange de la Mort',       pouvoir:'Récolter les âmes des mourants', domaine:'Mort & Transition', symbole:'Balance dorée & épée noire' },
  { entite:'👹 BAAL',          origine:'Phénicie antique',         rang:'Seigneur de l\'Enfer',   pouvoir:'Commande 66 légions de démons', domaine:'Pouvoir & Luxure',  symbole:'Taureau à tête d\'homme' },
  { entite:'🐍 LÉVIATHAN',     origine:'Hébraïque',                rang:'Prince des Eaux',        pouvoir:'Maître des mers et du chaos',   domaine:'Envie & Destruction',symbole:'Serpent de mer cosmique' },
  { entite:'🦂 ASMODÉE',       origine:'Avestique & Hébraïque',    rang:'Roi des Démons',         pouvoir:'Corruption du cœur humain',     domaine:'Colère & Luxure',   symbole:'Dragon à trois têtes' },
  { entite:'🦇 BELZÉBUTH',     origine:'Philistine',               rang:'Seigneur des Mouches',   pouvoir:'Commande toutes les plagues',   domaine:'Dégoût & Putréfaction',symbole:'Mouche dorée géante' },
  { entite:'💀 SAMAEL',        origine:'Kabbale juive',            rang:'Ange de la Mort',        pouvoir:'Empoisonner et détruire',       domaine:'Mort & Venin',      symbole:'Serpent ailé rouge' },
  { entite:'🌑 LILITH',        origine:'Mésopotamie & Hébraïque',  rang:'Première Femme / Démon', pouvoir:'Séduction et corruption des âmes',domaine:'Nuit & Liberté',   symbole:'Chouette noire & serpent' },
  { entite:'🔥 MOLOCH',        origine:'Cananéen',                 rang:'Dieu du Feu',            pouvoir:'Consumer et transformer',        domaine:'Sacrifice & Pouvoir',symbole:'Taureau de bronze ardent' },
]
export default async function mythologie(sock, sender, args, msg) {
  try {
    const m = rand(MYTHES)
    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   📚 *MYTHOLOGIE DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${m.entite}\n` +
      `📍 Origine : *${m.origine}*\n` +
      `👑 Rang : *${m.rang}*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⚡ *Pouvoir :* ${m.pouvoir}\n` +
      `🌀 *Domaine :* ${m.domaine}\n` +
      `🔮 *Symbole :* ${m.symbole}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Connaissance des Abysses ☠`)
  } catch(e){await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)}
}
