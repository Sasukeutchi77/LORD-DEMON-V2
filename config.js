// ╔══════════════════════════════════════════════════╗
// ║  CONFIG — LORD DEMON                            ║
// ║                                                  ║
// ║  SOURCE DE VÉRITÉ OWNER : fichier .env UNIQUEMENT║
// ║  Le bot ne démarre PAS si OWNER_NUMBER manque    ║
// ╚══════════════════════════════════════════════════╝

// dotenv est chargé ICI en premier pour que process.env
// soit disponible quelle que soit la façon de lancer le bot
import dotenv from 'dotenv'
dotenv.config()

// ═══════════════════════════════════════════════════════
// ── OWNER — LU EXCLUSIVEMENT DEPUIS .env ───────────────
// ═══════════════════════════════════════════════════════
//
//  Variables à définir dans votre fichier .env :
//    OWNER_NUMBER  → votre numéro (indicatif + numéro, sans +)
//    OWNER_NUMBERS → owners supplémentaires séparés par virgule (optionnel)
//    OWNER_LID     → LID WhatsApp de l'owner (optionnel, auto-détecté)
//
//  ⚠️  AUCUNE valeur par défaut n'est définie ici.
//      Si OWNER_NUMBER est absent → le bot REFUSE de démarrer.
// ═══════════════════════════════════════════════════════

const primaryOwnerRaw = process.env.OWNER_NUMBER || process.env.OWNER || ""
const extraOwnersRaw  = process.env.OWNER_NUMBERS || ""
const ownerLidRaw     = process.env.OWNER_LID     || ""

// Arrêt immédiat si OWNER_NUMBER est absent ou vide dans .env
if (!primaryOwnerRaw || !primaryOwnerRaw.replace(/\D/g, "")) {
  console.error("")
  console.error("╔══════════════════════════════════════════════════════╗")
  console.error("║  ❌  ERREUR CRITIQUE : OWNER_NUMBER manquant !       ║")
  console.error("║                                                      ║")
  console.error("║  Le bot ne peut PAS démarrer sans propriétaire.      ║")
  console.error("║                                                      ║")
  console.error("║  → Ouvrez votre fichier .env                         ║")
  console.error("║  → Ajoutez ou corrigez la ligne :                    ║")
  console.error("║      OWNER_NUMBER=votre_numero_sans_plus             ║")
  console.error("║  Exemple : OWNER_NUMBER=22653718750                  ║")
  console.error("╚══════════════════════════════════════════════════════╝")
  console.error("")
  process.exit(1)
}

// ── SUDO pré-configurés depuis .env ──────────────────────
const sudoRaw = process.env.SUDO || process.env.SUDO_NUMBERS || ""

export const config = {
  // ── Owner (lu exclusivement depuis .env) ──────────────
  ownerNumber:       primaryOwnerRaw.replace(/\D/g, ""),
  extraOwnerNumbers: extraOwnersRaw
    ? extraOwnersRaw.split(",").map(n => n.replace(/\D/g, "")).filter(Boolean)
    : [],
  ownerLid: ownerLidRaw.replace(/\D/g, ""),

  // ── Bot (rempli automatiquement à la connexion) ───────
  botNumber: "",
  botLid:    "",

  // ── Paramètres généraux ──────────────────────────────
  prefix:  process.env.PREFIX   || ".",
  botName: process.env.BOT_NAME || "𝐋𝐎𝐑𝐃 ✘ 𝐃𝐄𝐌𝐎𝐍",
  mode:    process.env.MODE     || "public",

  // ── Sudo pré-configurés depuis .env ──────────────────
  sudo: sudoRaw
    ? sudoRaw.split(",").map(n => n.replace(/\D/g, "")).filter(Boolean)
    : [],

  // ── Modération ───────────────────────────────────────
  maxWarns:    parseInt(process.env.MAX_WARNS    || "3"),
  cooldownMs:  parseInt(process.env.COOLDOWN_MS  || "2000"),
  floodMax:    parseInt(process.env.FLOOD_MAX    || "5"),
  floodWindow: parseInt(process.env.FLOOD_WINDOW || "5000"),

  // ── Comportement du bot ──────────────────────────────
  settings: {
    autoRead:      process.env.AUTO_READ   !== "false",
    autoTyping:    process.env.AUTO_TYPING !== "false",
    autoRecording: false,
    antiDelete:    false
  }
}
