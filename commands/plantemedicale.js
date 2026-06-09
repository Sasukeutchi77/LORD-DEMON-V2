import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🌿 Aloe Vera — Brûlures, cicatrisation, anti-inflammatoire","🌱 Gingembre — Nausées, digestion, anti-inflammatoire puissant","🍃 Menthe — Maux de tête, digestion, analgésique naturel","🌻 Camomille — Anxiété, sommeil, anti-spasmodique","🌿 Lavande — Stress, insomnie, antiseptique léger","🍀 Curcuma — Anti-inflammatoire, cancer, curcumine active","🌸 Hibiscus — Tension artérielle, antioxydants, vitamine C","🌰 Ginkgo Biloba — Mémoire, circulation cerveau, 270M ans","🍵 Thé vert (Camellia) — Catéchines, antioxydants, métabolisme","🌾 Valériane — Anxiété, insomnie, sans dépendance chimique"]
export default async function plantemedicale(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌿 *PLANTEMEDICALE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}