import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🦕 T-Rex — 12m, 9 tonnes, morsure 35 000N, vision mouvement","🦖 Diplodocus — 25m, 12t, mangeur de plantes, cou 8m","🦎 Vélociraptor — 1.8m, plumes, chasse en meute coopérative","🦕 Brachiosaure — 26m, 58t, cou de 9m, nourrit constamment","🐉 Ptérosaure — Envergure 12m, Quetzalcoatlus, pas vraiment dino","🦷 Triceratops — 3 cornes, crête de 1m, contre T-Rex 8 tonnes","🥚 Ankylosaure — Armure osseuse totale, queue-masse 45kg","⚔️ Stégosaure — Plaques dorsales thermiques, queue épines","🦎 Spinosaure — 18m, le plus long, semi-aquatique, Afrique N","🌍 Extinction — 66M ans, météorite + volcanisme, froid mondial"]
export default async function dinosaure2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🦕 *DINOSAURE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}