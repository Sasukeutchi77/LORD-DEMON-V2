// commands/galaxie.js — EXPLORATEUR DE GALAXIES DÉMONIAQUES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const GALAXIES = [
  { nom:'Nébuleuse du Sang Infernal',   type:'Spirale Maudite',   etoiles:'17 milliards',  dist:'42 000 années-lumière',  danger:'☠ EXTRÊME' },
  { nom:'Amas des Ténèbres Primordiales',type:'Elliptique Noire',  etoiles:'340 milliards', dist:'120 000 années-lumière', danger:'🔴 CRITIQUE' },
  { nom:'Voie des Abysses',             type:'Spirale Barrée',    etoiles:'85 milliards',  dist:'65 000 années-lumière',  danger:'🟠 ÉLEVÉ' },
  { nom:'Constellation du Démon Ancien',type:'Irrégulière Chaos', etoiles:'5 milliards',   dist:'8 000 années-lumière',   danger:'🟡 MODÉRÉ' },
  { nom:'Cosmos du Voile Brisé',        type:'Annulaire Spectrale',etoiles:'200 milliards', dist:'500 000 années-lumière', danger:'👑 LÉGENDAIRE' },
]
const PHENOMENES = [
  'Un trou noir démoniaque avale les étoiles environnantes',
  'Une supernova de sang illumine l\'horizon cosmique',
  'Des portails interdimensionnels s\'ouvrent à intervalles réguliers',
  'La matière noire y prend une forme consciente et malveillante',
  'Des entités anciennes y habitent depuis la naissance de l\'univers',
]
const RESSOURCES = ['Cristaux d\'Antimatière','Minerai de Vide Quantique','Gaz Plasma Infernal','Énergie du Chaos Pur','Fragments de Réalité Brisée']

export default async function galaxie(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const g = rand(GALAXIES)
    const ph = rand(PHENOMENES)
    const res = rand(RESSOURCES)
    const coords = `X:${Math.floor(Math.random()*9999)}-Y:${Math.floor(Math.random()*9999)}-Z:${Math.floor(Math.random()*9999)}`
    const temp = Math.floor(Math.random()*50000+5000).toLocaleString()

    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🌌 *EXPLORATION GALACTIQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🌌 *${g.nom}*\n` +
      `🔭 Type : *${g.type}*\n` +
      `⭐ Étoiles : *${g.etoiles}*\n` +
      `📡 Distance : *${g.dist}*\n` +
      `☠ Danger : ${g.danger}\n` +
      `📍 Coordonnées : \`${coords}\`\n` +
      `🌡️ Temp. moyenne : *${temp} K*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🌀 *Phénomène détecté :*\n_${ph}_\n\n` +
      `💎 *Ressources disponibles :*\n• ${res}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Explorateur des Cosmos ☠`)
  } catch(e) {
    await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)
  }
}
