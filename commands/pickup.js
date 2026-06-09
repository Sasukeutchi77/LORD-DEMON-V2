import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["😍 \"Excuse-moi, tu as perdu quelque chose... mon souffle.\"","💕 \"Si t'étais une plante, tu serais une super orchidée.\"","😂 \"Ton wifi doit être fort car je capte partout où tu es.\"","🌹 \"Tu crois au coup de foudre? Là j'ai l'impression d'être touché.\"","😏 \"T'as une carte? Je me suis perdu dans tes yeux.\"","💫 \"Tu es comme la lune: tu illumines mes nuits sombres.\"","🎵 \"Si t'étais une chanson, tu serais en tête de mes écoutes.\"","🌟 \"T'as un feu? Parce que tu m'enflammes complètement.\"","😊 \"T'as un prénom ou je peux t'appeler Trésor?\"","💎 \"Je ne suis pas photographe, mais je t'imagine avec moi.\""]
export default async function pickup(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 😍 *PICKUP* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}