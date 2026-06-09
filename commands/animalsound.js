import { sendMessage } from '../lib/sendMessage.js'
const SONS = [
  { animal: "Lion", son: "ROOAAARRR 🦁", desc: "Rugissement qui porte à 8km" },
  { animal: "Loup", son: "AOOOOUUUU 🐺", desc: "Hurlement à la lune — appel du clan" },
  { animal: "Aigle", son: "KYI-KYI-KYI 🦅", desc: "Cri perçant depuis les hauteurs" },
  { animal: "Serpent", son: "SSSSSSSSS 🐍", desc: "Sifflement d'avertissement mortel" },
  { animal: "Ours", son: "GRRROUUFFFF 🐻", desc: "Grognement de domination territoriale" },
  { animal: "Tigre", son: "PRRAOUUMM 🐯", desc: "Rugissement royal des forêts d'Asie" },
  { animal: "Corbeau", son: "KRAAA-KRAAA 🐦‍⬛", desc: "Croassement mystique — présage des anciens" },
  { animal: "Dragon ⛧", son: "RAAAAAHHHHH 🐉", desc: "Rugissement d'une puissance cosmique" },
]
export default async function animalsound(sock, sender, args, msg, ctx = {}) {
  const a = SONS[Math.floor(Math.random() * SONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔊 *CRI ANIMAL*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🐾 *Animal:* ${a.animal}\n` +
    `⛧  🔊 *Son:* _${a.son}_\n` +
    `✝  📖 ${a.desc}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
