import { sendMessage } from '../lib/sendMessage.js'
const VITS = {'A':'Vision & peau — Carottes, foie, patate douce','B1':'Énergie & nerfs — Levure, céréales complètes','B2':'Croissance — Lait, amandes','B6':'Cerveau — Volaille, banane','B12':'Sang & nerfs — Viande, poisson, oeufs','C':'Immunité — Agrumes, kiwi, poivron','D':'Os — Soleil, poisson gras','E':'Antioxydant — Huiles, noix','K':'Coagulation — Légumes verts'}
export default async function vitamine(sock, sender, args, msg, ctx = {}) {
  try {
    const v = args[0]?.toUpperCase()
    if (!v || !VITS[v]) return await sendMessage(sock, sender, `☠ Usage: .vitamine <lettre>\nDisponibles: ${Object.keys(VITS).join(', ')}`)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  💊 *VITAMINE ${v}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${VITS[v]}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
