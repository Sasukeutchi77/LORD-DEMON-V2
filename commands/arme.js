import { sendMessage } from '../lib/sendMessage.js'
const ADJ = ['Maudite', 'Légendaire', 'Ancienne', 'Démonique', 'Sacrée', 'Corrompue', 'Spectrale', 'Infernale']
const TYPE = ['Épée', 'Lance', 'Arc', 'Hache', 'Dague', 'Marteau', 'Faux', 'Bâton magique']
const NOM = ['Crépuscule', 'Ténèbres', 'Inferno', 'Azrael', 'Nemesis', 'Requiem', 'Chaos', 'Abyssal']
const STATS = [
  { atk: 350, special: "Draine 10% PV à chaque frappe" },
  { atk: 500, special: "Critique garanti tous les 5 coups" },
  { atk: 280, special: "Empoisonne la cible 3 tours" },
  { atk: 650, special: "Ignoré l'armure de l'ennemi" },
  { atk: 420, special: "Peut briser les boucliers magiques" },
]
export default async function arme(sock, sender, args, msg, ctx = {}) {
  const nom = `${TYPE[Math.floor(Math.random()*TYPE.length)]} ${ADJ[Math.floor(Math.random()*ADJ.length)]} de ${NOM[Math.floor(Math.random()*NOM.length)]}`
  const s = STATS[Math.floor(Math.random() * STATS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *ARME LÉGENDAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚔️ *Nom:* ${nom}\n` +
    `⛧  💥 *ATK:* +${s.atk}\n` +
    `✝  ⭐ *Capacité:* ${s.special}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
