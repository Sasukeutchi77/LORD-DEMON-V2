import { sendMessage } from '../lib/sendMessage.js'
const SIGNS = ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons']
const COMPAT = {'Bélier':['Sagittaire','Lion','Gémeaux'],'Taureau':['Vierge','Capricorne','Cancer'],'Gémeaux':['Balance','Verseau','Bélier'],'Cancer':['Scorpion','Poissons','Taureau'],'Lion':['Bélier','Sagittaire','Gémeaux'],'Vierge':['Taureau','Capricorne','Cancer'],'Balance':['Gémeaux','Verseau','Sagittaire'],'Scorpion':['Cancer','Poissons','Vierge'],'Sagittaire':['Bélier','Lion','Balance'],'Capricorne':['Taureau','Vierge','Scorpion'],'Verseau':['Gémeaux','Balance','Sagittaire'],'Poissons':['Cancer','Scorpion','Capricorne']}
export default async function astrolove(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const sign = args.join(' ').trim()
  const match = SIGNS.find(s=>sign.toLowerCase().includes(s.toLowerCase()))
  if (!match) return await sendMessage(sock, sender, `☩━━━〔 💕 *ASTRO AMOUR* 〕━━━☩\n☠\n⛧  ${prefix}astrolove <signe>\n☠  Signes: ${SIGNS.join(', ')}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const best = COMPAT[match]
  const random = SIGNS[Math.floor(Math.random()*SIGNS.length)]
  await sendMessage(sock, sender, `☩━━━〔 💕 *COMPATIBILITÉ ${match.toUpperCase()}* 〕━━━☩\n☠\n⛧  Meilleurs matchs:\n☠  ❤️ *${best[0]}* — Connexion forte\n✝  💕 *${best[1]}* — Très compatible\n☠  😊 *${best[2]}* — Bonne entente\n☠\n⛧  À éviter: *${random}* (parfois!)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}