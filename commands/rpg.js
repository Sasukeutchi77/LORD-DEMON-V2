// commands/rpg.js — RPG TEXTUEL COMPLET ⚔️
import { sendMessage } from '../lib/sendMessage.js'
import { rpgDb, RPG_CLASSES, ENEMIES, DUNGEONS, calculateDamage, getCritChance, getXpForLevel, getLevelFromXp } from '../lib/rpgSystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

function hpBar(hp, maxHp, len = 10) {
  const filled = Math.round((hp / maxHp) * len)
  return '█'.repeat(Math.max(0, filled)) + '░'.repeat(Math.max(0, len - filled))
}

export default async function rpg(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()

  // ─── CRÉER UN HÉROS ───
  if (!sub || sub === 'creer' || sub === 'create') {
    const hero = rpgDb.getHero(jid)
    if (hero) {
      const cls = RPG_CLASSES[hero.class]
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `${cls.emoji}   ⚔️ *TON HÉROS RPG*              ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `🏷️ Nom: *${hero.name}*\n` +
        `${cls.emoji} Classe: *${cls.name}*\n` +
        `⭐ Niveau: *${hero.level}* (${hero.xp} XP)\n\n` +
        `❤️ HP: ${hpBar(hero.hp, hero.max_hp)} ${hero.hp}/${hero.max_hp}\n` +
        `⚔️ ATK: *${hero.attack}* | 🛡️ DEF: *${hero.defense}*\n` +
        `💫 Mana: *${hero.mana}/${hero.max_mana}*\n` +
        `💰 Or: *${hero.gold} 💰*\n\n` +
        `🏆 Donjons: ${hero.dungeons} | ☠ Kills: ${hero.kills}\n\n` +
        `💡 \`.rpg donjon\` | \`.rpg combat\` | \`.rpg classement\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const classes = Object.entries(RPG_CLASSES).map(([id, c]) =>
      `${c.emoji} \`${id}\` — *${c.name}*: ${c.desc}`
    ).join('\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ⚔️ *CRÉER TON HÉROS RPG*       ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `Choisis ta classe :\n\n${classes}\n\n` +
      `📝 \`.rpg creer <nom> <classe>\`\n` +
      `Ex: \`.rpg creer Zoro guerrier\`\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'creer' || sub === 'create') {
    const name = args[1]
    const heroClass = args[2]?.toLowerCase()
    if (!name || !heroClass) return sendMessage(sock, sender, `☠ Usage: \`.rpg creer <nom> <classe>\``)
    if (!RPG_CLASSES[heroClass]) return sendMessage(sock, sender, `☠ Classe inconnue ! Choisissez: ${Object.keys(RPG_CLASSES).join(', ')}`)
    if (rpgDb.getHero(jid)) return sendMessage(sock, sender, `☠ Vous avez déjà un héros !`)
    rpgDb.createHero(jid, name, heroClass)
    const cls = RPG_CLASSES[heroClass]
    return sendMessage(sock, sender,
      `✅ *Héros créé !*\n${cls.emoji} *${name}* le ${cls.name} est prêt au combat !\n💡 \`.rpg donjon\` pour commencer l'aventure !`
    )
  }

  const hero = rpgDb.getHero(jid)
  if (!hero) return sendMessage(sock, sender, `☠ Pas encore de héros ! Tapez \`.rpg\` pour en créer un.`)

  // ─── DONJON ───
  if (sub === 'donjon' || sub === 'dungeon') {
    const available = DUNGEONS.filter(d => hero.level >= d.minLevel)
    if (!available.length) return sendMessage(sock, sender, `☠ Aucun donjon accessible à niveau ${hero.level}.`)
    const lines = DUNGEONS.map(d =>
      `${hero.level >= d.minLevel ? '✅' : '🔒'} \`${d.id}\` ${d.name} (niv. ${d.minLevel}+)`
    ).join('\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🏚️ *DONJONS*                   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines}\n\n` +
      `💡 \`.rpg explorer <id>\` pour entrer\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ─── EXPLORER UN DONJON ───
  if (sub === 'explorer' || sub === 'explore') {
    if (rpgDb.getBattle(jid)) return sendMessage(sock, sender, `⚔️ Vous êtes déjà en combat ! \`.rpg attaquer\` ou \`.rpg fuir\``)
    const dungeonId = parseInt(args[1])
    const dungeon = DUNGEONS.find(d => d.id === dungeonId)
    if (!dungeon) return sendMessage(sock, sender, `☠ Donjon invalide. Voir \`.rpg donjon\``)
    if (hero.level < dungeon.minLevel) return sendMessage(sock, sender, `☠ Niveau ${dungeon.minLevel} requis !`)
    if (hero.hp <= 0) return sendMessage(sock, sender, `☠ Vous êtes mort ! Utilisez \`.rpg soigner\``)
    const enemyPool = dungeon.enemies
    const enemyKey = enemyPool[Math.floor(Math.random() * enemyPool.length)]
    const enemy = ENEMIES[enemyKey]
    rpgDb.startBattle(jid, enemyKey)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ⚔️ *COMBAT !*                  ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${dungeon.name}\n\n` +
      `👹 *${enemy.name}* apparaît !\n` +
      `❤️ ${hpBar(enemy.hp, enemy.hp)} ${enemy.hp}/${enemy.hp} HP\n` +
      `⚔️ ATK: ${enemy.atk} | 🛡️ DEF: ${enemy.def}\n\n` +
      `Ton héros: ❤️ ${hero.hp}/${hero.max_hp}\n\n` +
      `⚔️ \`.rpg attaquer\`   — Attaque normale\n` +
      `💫 \`.rpg sort\`       — Sort magique\n` +
      `🏃 \`.rpg fuir\`       — Fuir le combat\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ─── ATTAQUER ───
  if (sub === 'attaquer' || sub === 'attack' || sub === 'att') {
    const battle = rpgDb.getBattle(jid)
    if (!battle) return sendMessage(sock, sender, `☠ Pas de combat en cours. \`.rpg donjon\` pour explorer.`)
    const enemy = ENEMIES[battle.enemy]
    const isCrit = Math.random() < getCritChance(hero.class)
    const heroDmg = calculateDamage(hero, { defense: enemy.def }, isCrit)
    const newEnemyHp = Math.max(0, battle.enemy_hp - heroDmg)

    if (newEnemyHp <= 0) {
      rpgDb.endBattle(jid)
      const xpGain = enemy.xp
      const goldGain = Math.floor(enemy.gold * (0.8 + Math.random() * 0.4))
      const result = rpgDb.addXp(jid, xpGain)
      rpgDb.updateHero(jid, { gold: hero.gold + goldGain, kills: hero.kills + 1, dungeons: hero.dungeons + 1 })
      let levelUpMsg = ''
      if (result?.leveledUp) levelUpMsg = `\n🎉 *LEVEL UP !* Niveau ${result.newLevel} atteint !`
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `🏆   ⚔️ *VICTOIRE !*               ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `${isCrit ? '💥 *COUP CRITIQUE !* ' : ''}Vous infligez *${heroDmg} dégâts*\n` +
        `☠ *${enemy.name}* est vaincu !\n\n` +
        `✨ +${xpGain} XP | 💰 +${goldGain} or\n` +
        `${levelUpMsg}\n\n` +
        `❤️ HP restants: ${rpgDb.getHero(jid).hp}/${hero.max_hp}\n` +
        `💡 \`.rpg explorer\` pour continuer\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // Contre-attaque ennemie
    const enemyDmg = Math.max(1, enemy.atk - Math.floor(hero.defense / 2) + Math.floor(Math.random() * 5) - 2)
    const newHeroHp = Math.max(0, hero.hp - enemyDmg)
    rpgDb.updateHero(jid, { hp: newHeroHp })
    rpgDb.updateBattle(jid, { enemy_hp: newEnemyHp, turn: battle.turn + 1 })

    if (newHeroHp <= 0) {
      rpgDb.endBattle(jid)
      rpgDb.updateHero(jid, { deaths: hero.deaths + 1, hp: Math.floor(hero.max_hp * 0.3) })
      return sendMessage(sock, sender,
        `☠━━━〔 💀 *VOUS ÊTES MORT !* 〕━━━☠\n` +
        `⛧ ${enemy.name} vous a défait !\n` +
        `✝ HP restaurés à 30%. Utilisez \`.rpg soigner\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    return sendMessage(sock, sender,
      `⚔️ *Tour ${battle.turn + 1}*\n\n` +
      `🗡️ Vous: ${isCrit ? '💥CRITIQUE! ' : ''}*-${heroDmg}* à ${enemy.name}\n` +
      `👹 ${enemy.name}: *-${enemyDmg}* à vous\n\n` +
      `${enemy.name}: ${hpBar(newEnemyHp, battle.enemy_max_hp)} ${newEnemyHp}/${battle.enemy_max_hp}\n` +
      `Vous: ${hpBar(newHeroHp, hero.max_hp)} ${newHeroHp}/${hero.max_hp}\n\n` +
      `⚔️ \`.rpg attaquer\` | 🏃 \`.rpg fuir\``
    )
  }

  // ─── FUIR ───
  if (sub === 'fuir' || sub === 'flee') {
    if (!rpgDb.getBattle(jid)) return sendMessage(sock, sender, `☠ Pas de combat en cours.`)
    if (Math.random() < 0.6) {
      rpgDb.endBattle(jid)
      return sendMessage(sock, sender, `🏃 *Vous fuyez avec succès !*\nVous perdez le butin mais sauvez votre peau.`)
    }
    const enemy = ENEMIES[rpgDb.getBattle(jid).enemy]
    const dmg = Math.floor(enemy.atk * 0.5)
    const newHp = Math.max(1, hero.hp - dmg)
    rpgDb.updateHero(jid, { hp: newHp })
    return sendMessage(sock, sender, `☠ *Fuite échouée !* ${enemy.name} vous frappe pour *${dmg} dégâts*.\n❤️ HP: ${newHp}/${hero.max_hp}`)
  }

  // ─── SOIGNER ───
  if (sub === 'soigner' || sub === 'heal') {
    const cost = 100
    if ((hero.gold || 0) < cost) return sendMessage(sock, sender, `☠ 100 💰 or requis pour se soigner.`)
    rpgDb.updateHero(jid, { hp: hero.max_hp, gold: hero.gold - cost })
    return sendMessage(sock, sender, `✅ *Soigné !* HP restaurés à ${hero.max_hp}/${hero.max_hp}\n💸 -${cost} 💰 or`)
  }

  // ─── CLASSEMENT ───
  if (sub === 'classement' || sub === 'top' || sub === 'rank') {
    const top = rpgDb.leaderboard(10)
    const lines = top.map((h, i) => {
      const cls = RPG_CLASSES[h.class] || { emoji: '⚔️' }
      return `${i + 1}. ${cls.emoji} *${h.name}* — Niv.${h.level} — ${h.kills} kills`
    }).join('\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🏆 *TOP HÉROS RPG*             ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines || 'Aucun héros encore.'}\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *GUIDE RPG*                 ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `\`.rpg\`               — Voir votre héros\n` +
    `\`.rpg creer N classe\` — Créer un héros\n` +
    `\`.rpg donjon\`        — Liste des donjons\n` +
    `\`.rpg explorer <id>\` — Entrer dans un donjon\n` +
    `\`.rpg attaquer\`      — Attaquer l'ennemi\n` +
    `\`.rpg fuir\`          — Fuir le combat\n` +
    `\`.rpg soigner\`       — Soigner (100💰)\n` +
    `\`.rpg classement\`    — Top héros\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}