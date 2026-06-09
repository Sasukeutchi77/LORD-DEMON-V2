// commands/numerologie.js — NUMÉROLOGIE DÉMONIAQUE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const SIGNIFICATIONS = {
  1:{nom:'L\'Initiateur',    desc:'Force de volonté, leadership, départ nouveau. Les ténèbres voient un pionnier.',            demon:'Baal'},
  2:{nom:'Le Gardien',       desc:'Équilibre, dualité, mystère. Vous êtes le pont entre deux mondes.',                         demon:'Astaroth'},
  3:{nom:'Le Créateur',      desc:'Créativité démoniaque, expression, magie. Vos paroles ont un pouvoir réel.',                demon:'Asmodée'},
  4:{nom:'Le Bâtisseur',     desc:'Structure, discipline infernale, fondations solides pour l\'ascension.',                    demon:'Belzébuth'},
  5:{nom:'L\'Aventurier',    desc:'Liberté chaotique, changement, exploration des abysses.',                                   demon:'Méphistophélès'},
  6:{nom:'Le Protecteur',    desc:'Responsabilité, harmonie, gardien de la légion. Vos alliés vous font confiance.',           demon:'Mammon'},
  7:{nom:'Le Mystique',      desc:'Spiritualité sombre, intuition profonde, recherche des vérités cachées.',                   demon:'Léviathan'},
  8:{nom:'L\'Ambitieux',     desc:'Pouvoir, succès, abondance démoniaque. Le matériel est votre domaine.',                    demon:'Azazel'},
  9:{nom:'Le Sage des Abysses',desc:'Humanité universelle, compassion démoniaque, fin d\'un cycle et renaissance.',           demon:'Samael'},
}
function calculerNombre(texte) {
  const vals = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8}
  const sum = texte.toLowerCase().replace(/[^a-z]/g,'').split('').reduce((s,c)=>s+(vals[c]||0),0)
  let n=sum; while(n>9&&n!==11&&n!==22){const d=n.toString().split('');n=d.reduce((s,x)=>s+parseInt(x),0)} return n
}
export default async function numerologie(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const input = args.join(' ').trim() || msg?.pushName || 'LORD DEMON'
    const nombre = calculerNombre(input)
    const sig = SIGNIFICATIONS[Math.min(9,Math.max(1,nombre))]
    const dateNum = new Date().getDate()+new Date().getMonth()+1
    const numDestin = Math.floor(Math.random()*9)+1
    const compatibilite = numDestin===nombre?'☠ PARFAITE':Math.abs(numDestin-nombre)<=2?'⛧ ÉLEVÉE':'⚪ Neutre'
    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔢 *NUMÉROLOGIE DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `📝 Analyse de : *"${input}"*\n\n` +
      `🔢 *Nombre de Vie :* ${nombre}\n` +
      `👑 *Archétype :* ${sig.nom}\n` +
      `👹 *Démon Tutélaire :* ${sig.demon}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `📖 *Signification :*\n_${sig.desc}_\n\n` +
      `🎲 Nombre du Destin (aujourd\'hui) : *${numDestin}*\n` +
      `💫 Compatibilité : *${compatibilite}*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Science des Nombres ☠`)
  } catch(e){await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)}
}
