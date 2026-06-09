import { sendMessage } from '../lib/sendMessage.js'
const SPORTS = {'football':{joueurs:11,terrain:'105×68m',duree:'90 min',orig:'Angleterre 1863',stars:'Messi, Ronaldo'},'basketball':{joueurs:5,terrain:'28×15m',duree:'4×12 min',orig:'USA 1891',stars:'LeBron James'},'tennis':{joueurs:'1 ou 2',terrain:'23.77×8.23m',duree:'Variable',orig:'France 1874',stars:'Federer, Djokovic'},'natation':{joueurs:1,terrain:'50m piscine',duree:'Variable',orig:'Antiquité',stars:'Michael Phelps'},'boxe':{joueurs:2,terrain:'Ring 6×6m',duree:'3 min/round',orig:'Grèce antique',stars:'Ali, Tyson'},'rugby':{joueurs:15,terrain:'100×70m',duree:'80 min',orig:'Angleterre 1823',stars:'Jonah Lomu'}}
export default async function sportinfo(sock, sender, args, msg, ctx = {}) {
  try {
    const s = args.join(' ').toLowerCase()
    if (!s || !SPORTS[s]) return await sendMessage(sock, sender, `☠ Usage: .sportinfo <sport>\nEx: .sportinfo football\nSports: ${Object.keys(SPORTS).join(', ')}`)
    const i = SPORTS[s]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚽ *${s.toUpperCase()}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Joueurs : *${i.joueurs}*\n✝ Terrain : *${i.terrain}*\n☠ Durée : *${i.duree}*\n⛧ Origine : *${i.orig}*\n☩ Stars : *${i.stars}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
