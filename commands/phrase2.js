import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["✍️ \"La vie n'est pas mesurée par le nombre de respirations que tu prends, mais par les moments qui t'en coupent le souffle.\"","📖 \"Seul ceux qui osent échouer grandement peuvent jamais réussir grandement.\" — Robert F. Kennedy","💡 \"L'imagination est plus importante que le savoir.\" — Einstein","🌍 \"Soyez le changement que vous souhaitez voir dans le monde.\" — Gandhi","🦁 \"La vie appartient à ceux qui croient en la beauté de leurs rêves.\" — Eleanor Roosevelt","⚡ \"Le succès c'est d'aller d'échec en échec sans perdre son enthousiasme.\" — Churchill","🌟 \"Ce qui ne te tue pas te rend plus fort.\" — Nietzsche","🎯 \"Je n'ai pas échoué, j'ai trouvé 10 000 façons qui ne fonctionnent pas.\" — Edison","🌱 \"La seule honte est de n'avoir pas essayé.\" — Proverbe français","🔥 \"Le moment présent a toujours été, sera toujours, et c'est tout ce que tu peux contrôler.\""]
export default async function phrase2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ✍️ *PHRASE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}