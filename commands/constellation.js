import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Orion — Le Chasseur, ceinture de 3 étoiles","Cassiopée — Forme de W, nord circumpolaire","Grande Ourse — La Casserole, 7 étoiles","Scorpion — Antares rouge géante supérieure","Croix du Sud — Guide navigation australe","Pléiades — Amas de 7 soeurs, 440 années-lumière","Persée — Héros grec, étoile Algol variable","Lyre — Vega, 5e plus brillante du ciel nocturne","Aigle — Altaïr tourne à 286 km/s","Cygne — Deneb, étoile variable hyper géante"]
export default async function constellation(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ⭐ *CONSTELLATION* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}