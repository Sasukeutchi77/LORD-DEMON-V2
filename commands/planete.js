// commands/planete.js — PLANÈTES DÉMONIAQUES
import { sendMessage } from '../lib/sendMessage.js'
const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const PLANETES = [
  { nom:'🌑 Erebus — Planète des Ombres',         gravite:'3.7×Terre', atmo:'Gaz chaotique & ténèbres',  temp:'-180°C / +1200°C', pop:'Esprits errants & Ombres', ressource:'Cristaux d\'Obscurité' },
  { nom:'🔴 Abaddon — Planète du Chaos',           gravite:'5.2×Terre', atmo:'Flammes & poussière de cendre',temp:'+800°C',           pop:'Démons de Rang I-V',      ressource:'Minerai Infernal' },
  { nom:'💀 Morthis — Planète des Morts',          gravite:'0.8×Terre', atmo:'Néant absolu & silence',   temp:'0°C constant',       pop:'Liche & Nécromanciens',    ressource:'Âmes Prisonnières' },
  { nom:'⛧ Daemonium — Capitale Infernale',        gravite:'9.8×Terre', atmo:'Soufre & brume démonique', temp:'+300°C',             pop:'Archidémons & Seigneurs',  ressource:'Cœurs Démoniques' },
  { nom:'🌀 Vortex — Planète du Voile',            gravite:'Variable',  atmo:'Portails & distorsions',   temp:'Instable',           pop:'Voyageurs dimensionnels',   ressource:'Fragments de Réalité' },
  { nom:'🩸 Sanguis — Planète du Sang Éternel',   gravite:'2.4×Terre', atmo:'Brume rouge & sang',       temp:'+40°C permanent',    pop:'Vampires Anciens',          ressource:'Sang Primordial' },
]
const PHENOMENES = [
  'Tempête de ténèbres couvrant 60% de la surface','Éruption de portails dimensionnels','Pluie de cendres d\'âmes','Éclipses permanentes liées au Voile'
]
export default async function planete(sock, sender, args, msg) {
  try {
    const p = rand(PLANETES)
    const ph = rand(PHENOMENES)
    const dist = Math.floor(Math.random()*9000+100)
    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🪐 *EXPLORATION PLANÉTAIRE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🪐 *${p.nom}*\n` +
      `📍 Distance : *${dist} UA de l\'Enfer*\n\n` +
      `⚖️ Gravité : *${p.gravite}*\n` +
      `💨 Atmosphère : *${p.atmo}*\n` +
      `🌡️ Température : *${p.temp}*\n` +
      `👹 Population : *${p.pop}*\n` +
      `💎 Ressource principale : *${p.ressource}*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🌀 *Phénomène actuel :*\n_${ph}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Astronome Démoniaque ☠`)
  } catch(e){await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)}
}
