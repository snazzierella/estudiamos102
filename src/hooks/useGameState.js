import { useState, useEffect } from 'react';
import { TOTAL_STAGES, STAGES } from '../utils/difficultyMapper';
import vocabularyData from '../data/vocabulary.json';

export const getStageWords = (stageNum) => {
  const stage = STAGES[stageNum];
  if (!stage) return [];
  const subcats = new Set(stage.subcategories);
  return Array.from(new Set(
    vocabularyData
      .filter(item => subcats.has(item.subcategory))
      .map(item => item.spanish)
  ));
};

const INITIAL_STATE = {
  level: 1,
  xp: 0,
  hp: 100,
  gold: 20,
  streak: 0,
  lastActiveDate: "",
  hasCompletedPlacement: false,
  badges: [],
  hintlessLessonsCount: 0,
  inventory: {
    redPotion: 0,
    goldenElixir: 0,
    streakShield: 0,
    juicyBone: 0,
    funBall: 0,
  },
  fainted: false,
  completedAdventures: [],
  apiKeys: {
    gemini: "",
  },
  answersCorrect: 0,
  answersTotal: 0,
  excludeVosotros: true,
  _hasSetVosotros: false,
  questStage: 1,
  questLevel: 1,
  isReviewReady: false,
  stageFlashcardsSeen: getStageWords(1),
  wordsAnsweredCorrectly: [],
  equipped: {
    shield: null,
    weapon: null,
    amulet: null,
    head: null,
    ring: null,
    cloak: null,
  },
  ownedEquipment: [],
  mistakes: [],
  autoSpeak: true,
  dailyBounties: {
    date: "",
    questCount: 0,
    chatMessageCount: 0,
    perfectMiniGame: false,
    claimed: {
      quest: false,
      chat: false,
      minigame: false
    }
  },
  wordMastery: {},
  difficultyMode: "standard",
  ttsVoice: "",
  ttsRate: 0.95,
  useGeminiTts: false,
  completedLevels: [],
  levelRecords: {},
  translateInstructions: false
};

export function useGameState() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('estudiamos_102_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        const excludeVosotros = parsed._hasSetVosotros ? parsed.excludeVosotros : true;

        const unit1Words = getStageWords(1);
        let stageFlashcardsSeen = [...new Set([...(parsed.stageFlashcardsSeen || []), ...unit1Words])];
        let wordsAnsweredCorrectly = parsed.wordsAnsweredCorrectly || [];
        if (parsed.questStage > 1) {
          wordsAnsweredCorrectly = [...new Set([...wordsAnsweredCorrectly, ...unit1Words])];
        }

        return {
          ...INITIAL_STATE,
          ...parsed,
          excludeVosotros,
          stageFlashcardsSeen,
          wordsAnsweredCorrectly,
          completedLevels: parsed.completedLevels || [],
          levelRecords: parsed.levelRecords || {},
          hintlessLessonsCount: parsed.hintlessLessonsCount || 0,
          translateInstructions: Boolean(parsed.translateInstructions)
        };
      }
    } catch (e) {
      console.error("Error loading state from localStorage", e);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('estudiamos_102_state', JSON.stringify(state));
  }, [state]);

  const addXp = (amount) => {
    setState(prev => {
      let finalAmount = amount;
      if (prev.equipped && prev.equipped.weapon === "wisdomSword") {
        finalAmount = Math.ceil(amount * 1.2);
      }
      // Difficulty multiplier
      if (prev.difficultyMode === "relaxed") {
        finalAmount = Math.ceil(finalAmount * 0.5);
      } else if (prev.difficultyMode === "hardcore") {
        finalAmount = Math.ceil(finalAmount * 2.0);
      }

      let newXp = prev.xp + finalAmount;
      let newLevel = prev.level;
      let newHp = prev.hp;
      let newGold = prev.gold;
      let isLevelUp = false;
      const leveledBadges = [...prev.badges];

      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;

      while (newXp >= newLevel * 100) {
        newXp -= newLevel * 100;
        newLevel += 1;
        newGold += 25;
        newHp = maxHp;
        isLevelUp = true;
      }

      if (newLevel >= 5 && !leveledBadges.includes("level_5")) {
        leveledBadges.push("level_5");
      }
      if (newLevel >= 10 && !leveledBadges.includes("level_10")) {
        leveledBadges.push("level_10");
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        hp: newHp,
        gold: newGold,
        badges: leveledBadges,
        _levelUpFlag: isLevelUp ? Date.now() : prev._levelUpFlag
      };
    });
  };

  const addGold = (amount) => {
    setState(prev => {
      let finalAmount = amount;
      if (prev.equipped && prev.equipped.amulet === "goldenAmulet") {
        finalAmount = Math.ceil(amount * 1.2);
      }
      // Difficulty multiplier
      if (prev.difficultyMode === "relaxed") {
        finalAmount = Math.ceil(finalAmount * 0.5);
      } else if (prev.difficultyMode === "hardcore") {
        finalAmount = Math.ceil(finalAmount * 2.0);
      }
      return {
        ...prev,
        gold: prev.gold + finalAmount
      };
    });
  };

  const takeDamage = (amount) => {
    setState(prev => {
      if (prev.difficultyMode === "relaxed") return prev;

      // Cloak of Stealth: 15% dodge chance
      if (prev.equipped?.cloak === "cloakOfStealth" && Math.random() <= 0.15) {
        return prev;
      }

      let dmgBase = prev.difficultyMode === "hardcore" ? 30 : amount;
      if (prev.equipped?.shield === "woodenShield") {
        dmgBase = Math.max(1, dmgBase - 5);
      }
      
      let newHp = Math.max(0, prev.hp - dmgBase);
      let newFainted = prev.fainted;
      const newBadges = [...prev.badges];

      if (newHp <= 0) {
        newHp = 0;
        newFainted = true;
        if (!newBadges.includes("survivor")) {
          newBadges.push("survivor");
        }
      }

      let newQuestLevel = prev.questLevel;
      if (newHp <= 0 && prev.difficultyMode === "hardcore") {
        newQuestLevel = 1; // Fainting in hardcore resets questLevel to 1
      }

      return {
        ...prev,
        hp: newHp,
        fainted: newFainted,
        questLevel: newQuestLevel,
        badges: newBadges
      };
    });
  };

  const heal = (amount) => {
    setState(prev => {
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      return {
        ...prev,
        hp: Math.min(maxHp, prev.hp + amount)
      };
    });
  };

  const revive = (hpAmount = 100) => {
    setState(prev => {
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      return {
        ...prev,
        hp: hpAmount === 100 ? maxHp : Math.min(maxHp, hpAmount),
        fainted: false
      };
    });
  };

  const recordQuizPerformance = (correct, total) => {
    setState(prev => {
      const newCorrect = prev.answersCorrect + correct;
      const newTotal = prev.answersTotal + total;
      const newBadges = [...prev.badges];

      if (newCorrect >= 10 && !newBadges.includes("warrior_10")) {
        newBadges.push("warrior_10");
      }
      if (newCorrect >= 50 && !newBadges.includes("warrior_50")) {
        newBadges.push("warrior_50");
      }
      if (newCorrect >= 150 && !newBadges.includes("warrior_150")) {
        newBadges.push("warrior_150");
      }

      return {
        ...prev,
        answersCorrect: newCorrect,
        answersTotal: newTotal,
        badges: newBadges
      };
    });
  };

  const buyItem = (itemKey, cost) => {
    if (state.gold < cost) return false;
    setState(prev => {
      const newInventory = { ...prev.inventory };
      newInventory[itemKey] = (newInventory[itemKey] || 0) + 1;
      const newBadges = [...prev.badges];
      
      if (prev.gold - cost >= 100 && !newBadges.includes("rich_learner")) {
        newBadges.push("rich_learner");
      }

      return {
        ...prev,
        gold: prev.gold - cost,
        inventory: newInventory
      };
    });
    return true;
  };

  const consumeItem = (itemKey) => {
    if ((state.inventory[itemKey] || 0) <= 0) return false;

    let success = false;
    setState(prev => {
      const newInventory = { ...prev.inventory };
      let newHp = prev.hp;
      let newFainted = prev.fainted;

      if (itemKey === "redPotion") {
        if (prev.fainted || prev.hp < 100) {
          newHp = Math.min(100, prev.hp + 50);
          newFainted = false;
          newInventory.redPotion -= 1;
          success = true;
        }
      } else if (itemKey === "goldenElixir") {
        if (prev.fainted || prev.hp < 100) {
          newHp = 100;
          newFainted = false;
          newInventory.goldenElixir -= 1;
          success = true;
        }
      }

      if (success) {
        return {
          ...prev,
          hp: newHp,
          fainted: newFainted,
          inventory: newInventory
        };
      }
      return prev;
    });

    return success;
  };

  const addBadge = (badgeId) => {
    setState(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badgeId]
      };
    });
  };

  const completeAdventure = (adventureId) => {
    setState(prev => {
      const updatedAdventures = prev.completedAdventures.includes(adventureId)
        ? prev.completedAdventures
        : [...prev.completedAdventures, adventureId];
      
      const newBadges = [...prev.badges];
      if (adventureId === "market" && !newBadges.includes("market_master")) {
        newBadges.push("market_master");
      }
      if (adventureId === "nat" && !newBadges.includes("social_butterfly")) {
        newBadges.push("social_butterfly");
      }
      if (adventureId === "narfy" && !newBadges.includes("dog_trainer")) {
        newBadges.push("dog_trainer");
      }
      if (adventureId === "clinic" && !newBadges.includes("triage_master")) {
        newBadges.push("triage_master");
      }
      if (adventureId === "routine" && !newBadges.includes("routine_champion")) {
        newBadges.push("routine_champion");
      }
      if (adventureId === "partner" && !newBadges.includes("storyteller")) {
        newBadges.push("storyteller");
      }
      if (adventureId === "narfy102" && !newBadges.includes("narfy_best_friend")) {
        newBadges.push("narfy_best_friend");
      }

      return {
        ...prev,
        completedAdventures: updatedAdventures,
        badges: newBadges
      };
    });
  };

  const recordWordAnsweredCorrectly = (spanishWord) => {
    setState(prev => {
      const list = prev.wordsAnsweredCorrectly || [];
      if (list.includes(spanishWord)) return prev;
      return {
        ...prev,
        wordsAnsweredCorrectly: [...list, spanishWord]
      };
    });
  };

  const setApiKey = (key) => {
    setState(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        gemini: key
      }
    }));
  };

  const completePlacement = (score, startingStage = 1) => {
    setState(prev => {
      const startingGoldBonus = score * 10;
      const startingXpBonus = score * 40;
      
      let finalXp = prev.xp + startingXpBonus;
      let finalLevel = prev.level;
      let finalGold = prev.gold + startingGoldBonus;
      
      while (finalXp >= finalLevel * 100) {
        finalXp -= finalLevel * 100;
        finalLevel += 1;
      }

      const newBadges = [...prev.badges];
      if (!newBadges.includes("placement_done")) {
        newBadges.push("placement_done");
      }

      let bonusSeen = [...(prev.stageFlashcardsSeen || [])];
      let bonusAnswered = [...(prev.wordsAnsweredCorrectly || [])];
      if (startingStage > 1) {
        for (let s = 1; s < startingStage; s++) {
          const sWords = getStageWords(s);
          bonusSeen.push(...sWords);
          bonusAnswered.push(...sWords);
        }
        bonusSeen = [...new Set(bonusSeen)];
        bonusAnswered = [...new Set(bonusAnswered)];
      }

      return {
        ...prev,
        hasCompletedPlacement: true,
        level: finalLevel,
        xp: finalXp,
        gold: finalGold,
        badges: newBadges,
        questStage: startingStage,
        questLevel: 1,
        isReviewReady: false,
        stageFlashcardsSeen: bonusSeen,
        wordsAnsweredCorrectly: bonusAnswered
      };
    });
  };

  const checkAndUpdateStreak = () => {
    setState(prev => {
      const today = new Date().toISOString().split('T')[0];
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      const isNewDay = prev.lastActiveDate && prev.lastActiveDate !== today;
      let newHp = isNewDay ? maxHp : prev.hp;
      let newFainted = isNewDay ? false : prev.fainted;
      
      let newDailyBounties = prev.dailyBounties || {
        date: today,
        questCount: 0,
        chatMessageCount: 0,
        perfectMiniGame: false,
        claimed: { quest: false, chat: false, minigame: false }
      };

      if (isNewDay || !newDailyBounties.date || newDailyBounties.date !== today) {
        newDailyBounties = {
          date: today,
          questCount: 0,
          chatMessageCount: 0,
          perfectMiniGame: false,
          claimed: { quest: false, chat: false, minigame: false }
        };
      }

      if (!prev.lastActiveDate) {
        return {
          ...prev,
          lastActiveDate: today,
          streak: 1,
          hp: maxHp,
          fainted: false,
          dailyBounties: newDailyBounties
        };
      }

      if (prev.lastActiveDate === today) {
        return {
          ...prev,
          dailyBounties: newDailyBounties
        };
      }

      const lastDateObj = new Date(prev.lastActiveDate);
      const todayObj = new Date(today);
      const diffTime = Math.abs(todayObj - lastDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = prev.streak;
      let newInventory = { ...prev.inventory };
      const newBadges = [...prev.badges];

      if (diffDays === 1) {
        newStreak += 1;
      } else {
        if (prev.inventory.streakShield > 0) {
          newInventory.streakShield -= 1;
        } else {
          newStreak = 1;
        }
      }

      if (newStreak >= 3 && !newBadges.includes("streak_3")) {
        newBadges.push("streak_3");
      }
      if (newStreak >= 7 && !newBadges.includes("streak_7")) {
        newBadges.push("streak_7");
      }

      return {
        ...prev,
        lastActiveDate: today,
        streak: newStreak,
        inventory: newInventory,
        badges: newBadges,
        hp: newHp,
        fainted: newFainted,
        dailyBounties: newDailyBounties
      };
    });
  };

  const advanceQuest = (score, totalQuizzes = 20, usedHints = false) => {
    const requiredScore = Math.ceil(totalQuizzes * 0.6); // 60% pass threshold (missing 40% or more fails)
    if (score < requiredScore) return false;
    
    setState(prev => {
      let nextLevel = prev.questLevel;
      let nextReview = prev.isReviewReady;
      
      if (prev.questLevel < 19) {
        nextLevel += 1;
      } else {
        nextReview = true;
      }

      let goldReward = 12;
      let xpReward = 60;
      if (prev.equipped && prev.equipped.amulet === "goldenAmulet") {
        goldReward = Math.ceil(goldReward * 1.2);
      }
      if (prev.equipped && prev.equipped.weapon === "wisdomSword") {
        xpReward = Math.ceil(xpReward * 1.2);
      }

      // Difficulty multiplier
      if (prev.difficultyMode === "relaxed") {
        goldReward = Math.ceil(goldReward * 0.5);
        xpReward = Math.ceil(xpReward * 0.5);
      } else if (prev.difficultyMode === "hardcore") {
        goldReward = Math.ceil(goldReward * 2.0);
        xpReward = Math.ceil(xpReward * 2.0);
      }

      let newXp = prev.xp + xpReward;
      let newLevel = prev.level;
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      let newHp = prev.hp;
      let newGold = prev.gold + goldReward;
      let isLevelUp = false;
      const leveledBadges = [...prev.badges];

      while (newXp >= newLevel * 100) {
        newXp -= newLevel * 100;
        newLevel += 1;
        newGold += 25;
        newHp = maxHp;
        isLevelUp = true;
      }

      if (newLevel >= 5 && !leveledBadges.includes("level_5")) {
        leveledBadges.push("level_5");
      }
      if (newLevel >= 10 && !leveledBadges.includes("level_10")) {
        leveledBadges.push("level_10");
      }

      // Check hintless lesson achievements
      let nextHintlessCount = prev.hintlessLessonsCount || 0;
      if (!usedHints) {
        nextHintlessCount += 1;
        if (!leveledBadges.includes("hintless_scholar")) {
          leveledBadges.push("hintless_scholar");
        }
        if (nextHintlessCount >= 5 && !leveledBadges.includes("hintless_master")) {
          leveledBadges.push("hintless_master");
        }
      }

      // Increment daily bounty for completing a campaign level
      let newDailyBounties = { ...prev.dailyBounties };
      newDailyBounties.questCount = (newDailyBounties.questCount || 0) + 1;

      const currentLevelKey = `${prev.questStage}-${prev.questLevel}`;
      const updatedCompleted = prev.completedLevels?.includes(currentLevelKey)
        ? prev.completedLevels
        : [...(prev.completedLevels || []), currentLevelKey];
      const existingRecord = prev.levelRecords?.[currentLevelKey];
      const bestScore = Math.max(existingRecord?.bestScore || 0, score);
      const updatedRecords = {
        ...(prev.levelRecords || {}),
        [currentLevelKey]: {
          bestScore,
          total: totalQuizzes,
          completedAt: Date.now()
        }
      };

      return {
        ...prev,
        questLevel: nextLevel,
        isReviewReady: nextReview,
        gold: newGold,
        xp: newXp,
        level: newLevel,
        hp: newHp,
        badges: leveledBadges,
        hintlessLessonsCount: nextHintlessCount,
        dailyBounties: newDailyBounties,
        completedLevels: updatedCompleted,
        levelRecords: updatedRecords,
        _levelUpFlag: isLevelUp ? Date.now() : prev._levelUpFlag
      };
    });
    return true;
  };

  const passStageReview = (score, totalQuizzes = 20, usedHints = false, isEarlySkip = false) => {
    // If early skip: 100% accuracy required (0 mistakes allowed)
    if (isEarlySkip && score < totalQuizzes) return false;
    // 80% pass threshold for standard stage reviews (Boss battles)
    const requiredScore = Math.ceil(totalQuizzes * 0.8);
    if (score < requiredScore) return false;

    setState(prev => {
      const nextStage = Math.min(TOTAL_STAGES, prev.questStage + 1);
      const isGameBeaten = prev.questStage === TOTAL_STAGES;
      const newBadges = [...prev.badges];
      
      if (isGameBeaten && !newBadges.includes("game_beaten")) {
        newBadges.push("game_beaten");
      }

      if (isEarlySkip && !newBadges.includes("unit_skip_master")) {
        newBadges.push("unit_skip_master");
      }

      let goldReward = isEarlySkip ? 100 : 50;
      let xpReward = isEarlySkip ? 400 : 200;
      if (prev.equipped && prev.equipped.amulet === "goldenAmulet") {
        goldReward = Math.ceil(goldReward * 1.2);
      }
      if (prev.equipped && prev.equipped.weapon === "wisdomSword") {
        xpReward = Math.ceil(xpReward * 1.2);
      }

      // Difficulty multiplier
      if (prev.difficultyMode === "relaxed") {
        goldReward = Math.ceil(goldReward * 0.5);
        xpReward = Math.ceil(xpReward * 0.5);
      } else if (prev.difficultyMode === "hardcore") {
        goldReward = Math.ceil(goldReward * 2.0);
        xpReward = Math.ceil(xpReward * 2.0);
      }

      let newXp = prev.xp + xpReward;
      let newLevel = prev.level;
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      let newHp = prev.hp;
      let newGold = prev.gold + goldReward;
      let isLevelUp = false;

      while (newXp >= newLevel * 100) {
        newXp -= newLevel * 100;
        newLevel += 1;
        newGold += 25;
        newHp = maxHp;
        isLevelUp = true;
      }

      if (newLevel >= 5 && !newBadges.includes("level_5")) {
        newBadges.push("level_5");
      }
      if (newLevel >= 10 && !newBadges.includes("level_10")) {
        newBadges.push("level_10");
      }

      // Check hintless lesson achievements
      let nextHintlessCount = prev.hintlessLessonsCount || 0;
      if (!usedHints) {
        nextHintlessCount += 1;
        if (!newBadges.includes("hintless_scholar")) {
          newBadges.push("hintless_scholar");
        }
        if (nextHintlessCount >= 5 && !newBadges.includes("hintless_master")) {
          newBadges.push("hintless_master");
        }
        if (!newBadges.includes("hintless_boss")) {
          newBadges.push("hintless_boss");
        }
      }

      // Increment daily bounty
      let newDailyBounties = { ...prev.dailyBounties };
      newDailyBounties.questCount = (newDailyBounties.questCount || 0) + 1;

      // Mark all words from the passed stage as seen and answered
      const passedStageWords = getStageWords(prev.questStage);
      const updatedSeen = [...new Set([...(prev.stageFlashcardsSeen || []), ...passedStageWords])];
      const updatedAnswered = [...new Set([...(prev.wordsAnsweredCorrectly || []), ...passedStageWords])];

      const reviewLevelKey = `${prev.questStage}-20`;
      const stageLevelKeys = Array.from({ length: 20 }, (_, i) => `${prev.questStage}-${i + 1}`);
      const updatedCompleted = [...new Set([
        ...(prev.completedLevels || []),
        reviewLevelKey,
        ...(isEarlySkip ? stageLevelKeys : [])
      ])];
      const existingRecord = prev.levelRecords?.[reviewLevelKey];
      const bestScore = Math.max(existingRecord?.bestScore || 0, score);
      const updatedRecords = {
        ...(prev.levelRecords || {}),
        [reviewLevelKey]: {
          bestScore,
          total: totalQuizzes,
          completedAt: Date.now()
        }
      };

      return {
        ...prev,
        questStage: nextStage,
        questLevel: 1,
        isReviewReady: false,
        gold: newGold,
        xp: newXp,
        level: newLevel,
        hp: newHp,
        badges: newBadges,
        hintlessLessonsCount: nextHintlessCount,
        stageFlashcardsSeen: updatedSeen,
        wordsAnsweredCorrectly: updatedAnswered,
        dailyBounties: newDailyBounties,
        completedLevels: updatedCompleted,
        levelRecords: updatedRecords,
        _levelUpFlag: isLevelUp ? Date.now() : prev._levelUpFlag
      };
    });
    return true;
  };

  const recordLevelCompletion = (stage, level, score, total, usedHints = false) => {
    setState(prev => {
      const levelKey = `${stage}-${level}`;
      const existingRecord = prev.levelRecords?.[levelKey];
      const bestScore = Math.max(existingRecord?.bestScore || 0, score);
      const updatedRecords = {
        ...(prev.levelRecords || {}),
        [levelKey]: {
          bestScore,
          total,
          completedAt: Date.now()
        }
      };
      const updatedCompleted = prev.completedLevels?.includes(levelKey)
        ? prev.completedLevels
        : [...(prev.completedLevels || []), levelKey];

      let nextHintlessCount = prev.hintlessLessonsCount || 0;
      const leveledBadges = [...prev.badges];
      if (!usedHints) {
        nextHintlessCount += 1;
        if (!leveledBadges.includes("hintless_scholar")) {
          leveledBadges.push("hintless_scholar");
        }
        if (nextHintlessCount >= 5 && !leveledBadges.includes("hintless_master")) {
          leveledBadges.push("hintless_master");
        }
        if (level === 20 && !leveledBadges.includes("hintless_boss")) {
          leveledBadges.push("hintless_boss");
        }
      }

      return {
        ...prev,
        levelRecords: updatedRecords,
        completedLevels: updatedCompleted,
        hintlessLessonsCount: nextHintlessCount,
        badges: leveledBadges
      };
    });
  };

  const buyEquipment = (itemKey, cost, slot) => {
    if (state.gold < cost) return false;
    setState(prev => {
      const owned = prev.ownedEquipment || [];
      if (owned.includes(itemKey)) return prev;
      const newOwned = [...owned, itemKey];
      const newEquipped = { ...prev.equipped };
      newEquipped[slot] = itemKey;

      return {
        ...prev,
        gold: prev.gold - cost,
        ownedEquipment: newOwned,
        equipped: newEquipped
      };
    });
    return true;
  };

  const equipItem = (itemKey, slot) => {
    setState(prev => {
      const owned = prev.ownedEquipment || [];
      if (itemKey !== null && !owned.includes(itemKey)) return prev;

      const newEquipped = { ...prev.equipped };
      newEquipped[slot] = itemKey;

      return {
        ...prev,
        equipped: newEquipped
      };
    });
  };

  const addMistake = (spanishWord) => {
    setState(prev => {
      const list = prev.mistakes || [];
      if (list.includes(spanishWord)) return prev;
      return {
        ...prev,
        mistakes: [...list, spanishWord]
      };
    });
  };

  const removeMistake = (spanishWord) => {
    setState(prev => {
      const list = prev.mistakes || [];
      return {
        ...prev,
        mistakes: list.filter(w => w !== spanishWord)
      };
    });
  };

  const toggleAutoSpeak = () => {
    setState(prev => ({
      ...prev,
      autoSpeak: !prev.autoSpeak
    }));
  };

  const toggleTranslateInstructions = () => {
    setState(prev => ({
      ...prev,
      translateInstructions: !prev.translateInstructions
    }));
  };

  const setTranslateInstructions = (val) => {
    setState(prev => ({
      ...prev,
      translateInstructions: Boolean(val)
    }));
  };

  const claimBounty = (bountyType) => {
    setState(prev => {
      const bounties = prev.dailyBounties || {};
      const claimed = bounties.claimed || {};
      if (claimed[bountyType]) return prev;

      let eligible = false;
      if (bountyType === "quest" && (bounties.questCount || 0) >= 2) {
        eligible = true;
      } else if (bountyType === "chat" && (bounties.chatMessageCount || 0) >= 3) {
        eligible = true;
      } else if (bountyType === "minigame" && bounties.perfectMiniGame) {
        eligible = true;
      }

      if (!eligible) return prev;

      const newClaimed = { ...claimed, [bountyType]: true };
      const newDaily = { ...bounties, claimed: newClaimed };

      return {
        ...prev,
        gold: prev.gold + 50,
        dailyBounties: newDaily
      };
    });
  };

  const incrementBountyCount = (bountyType) => {
    setState(prev => {
      const daily = prev.dailyBounties || {};
      if (bountyType === "quest") {
        return {
          ...prev,
          dailyBounties: {
            ...daily,
            questCount: (daily.questCount || 0) + 1
          }
        };
      } else if (bountyType === "chat") {
        return {
          ...prev,
          dailyBounties: {
            ...daily,
            chatMessageCount: (daily.chatMessageCount || 0) + 1
          }
        };
      } else if (bountyType === "minigame") {
        return {
          ...prev,
          dailyBounties: {
            ...daily,
            perfectMiniGame: true
          }
        };
      }
      return prev;
    });
  };

  const feedNarfy = () => {
    if ((state.inventory?.juicyBone || 0) <= 0) return false;
    setState(prev => {
      const newInv = { ...prev.inventory };
      newInv.juicyBone -= 1;
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      const newHp = Math.min(maxHp, prev.hp + 20);
      return {
        ...prev,
        hp: newHp,
        inventory: newInv
      };
    });
    return true;
  };

  const playWithNarfy = () => {
    if ((state.inventory?.funBall || 0) <= 0) return false;
    setState(prev => {
      const newInv = { ...prev.inventory };
      newInv.funBall -= 1;

      // Add 100 XP with multipliers directly
      let xpBonus = 100;
      if (prev.equipped && prev.equipped.weapon === "wisdomSword") {
        xpBonus = Math.ceil(xpBonus * 1.2);
      }
      if (prev.difficultyMode === "relaxed") {
        xpBonus = Math.ceil(xpBonus * 0.5);
      } else if (prev.difficultyMode === "hardcore") {
        xpBonus = Math.ceil(xpBonus * 2.0);
      }

      let newXp = prev.xp + xpBonus;
      let newLevel = prev.level;
      const maxHp = prev.equipped?.ring === "ringOfLife" ? 150 : 100;
      let newHp = prev.hp;
      let newGold = prev.gold;
      let isLevelUp = false;
      const leveledBadges = [...prev.badges];

      while (newXp >= newLevel * 100) {
        newXp -= newLevel * 100;
        newLevel += 1;
        newGold += 25;
        newHp = maxHp;
        isLevelUp = true;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        hp: newHp,
        gold: newGold,
        inventory: newInv,
        badges: leveledBadges,
        _levelUpFlag: isLevelUp ? Date.now() : prev._levelUpFlag
      };
    });
    return true;
  };

  const updateWordMastery = (word, success) => {
    setState(prev => {
      const mastery = { ...prev.wordMastery };
      const currentRating = mastery[word] !== undefined ? mastery[word] : 2;
      let newRating = success ? currentRating + 1 : currentRating - 1;
      newRating = Math.max(0, Math.min(5, newRating));
      mastery[word] = newRating;
      return {
        ...prev,
        wordMastery: mastery
      };
    });
  };

  const setDifficultyMode = (mode) => {
    setState(prev => ({
      ...prev,
      difficultyMode: mode
    }));
  };

  const resetAllProgress = () => {
    setState(INITIAL_STATE);
  };

  const setExcludeVosotros = (val) => {
    setState(prev => ({
      ...prev,
      excludeVosotros: val,
      _hasSetVosotros: true
    }));
  };

  const markFlashcardsSeen = (words) => {
    setState(prev => {
      const nextSeen = [...new Set([...(prev.stageFlashcardsSeen || []), ...words])];
      return {
        ...prev,
        stageFlashcardsSeen: nextSeen
      };
    });
  };

  const setTtsVoice = (voiceName) => {
    setState(prev => ({ ...prev, ttsVoice: voiceName }));
  };

  const setTtsRate = (rate) => {
    setState(prev => ({ ...prev, ttsRate: rate }));
  };

  const setUseGeminiTts = (val) => {
    setState(prev => ({ ...prev, useGeminiTts: val }));
  };

  const exportSaveData = () => {
    return {
      app: 'estudiamos_102',
      version: 1,
      exportedAt: new Date().toISOString(),
      summary: {
        level: state.level,
        xp: state.xp,
        gold: state.gold,
        streak: state.streak,
        stage: state.questStage,
        completedLevels: state.completedLevels?.length || 0,
        badges: state.badges?.length || 0
      },
      data: state
    };
  };

  const importSaveData = (importedData) => {
    try {
      let rawState = importedData;
      if (typeof importedData === 'string') {
        rawState = JSON.parse(importedData);
      }
      if (rawState && rawState.data && typeof rawState.data === 'object') {
        rawState = rawState.data;
      }

      if (!rawState || typeof rawState !== 'object') {
        return { success: false, error: 'Formato de archivo inválido. (Invalid save format)' };
      }

      if (
        typeof rawState.level !== 'number' &&
        typeof rawState.questStage !== 'number' &&
        typeof rawState.hasCompletedPlacement !== 'boolean'
      ) {
        return { success: false, error: 'El archivo no parece ser un guardado válido de Estudiamos 102. (Unrecognized save file)' };
      }

      const unit1Words = getStageWords(1);
      let stageFlashcardsSeen = [...new Set([...(rawState.stageFlashcardsSeen || []), ...unit1Words])];
      let wordsAnsweredCorrectly = Array.isArray(rawState.wordsAnsweredCorrectly) ? rawState.wordsAnsweredCorrectly : [];
      const questStage = Number(rawState.questStage) || 1;
      if (questStage > 1) {
        wordsAnsweredCorrectly = [...new Set([...wordsAnsweredCorrectly, ...unit1Words])];
      }

      const level = Math.max(1, Number(rawState.level) || 1);
      const gold = Math.max(0, Number(rawState.gold) || 0);

      const merged = {
        ...INITIAL_STATE,
        ...rawState,
        level,
        xp: Math.max(0, Number(rawState.xp) || 0),
        hp: Math.min(100, Math.max(0, typeof rawState.hp === 'number' ? rawState.hp : 100)),
        gold,
        streak: Math.max(0, Number(rawState.streak) || 0),
        questStage,
        questLevel: Math.max(1, Number(rawState.questLevel) || 1),
        stageFlashcardsSeen,
        wordsAnsweredCorrectly,
        completedLevels: Array.isArray(rawState.completedLevels) ? rawState.completedLevels : [],
        levelRecords: (rawState.levelRecords && typeof rawState.levelRecords === 'object') ? rawState.levelRecords : {},
        inventory: {
          ...INITIAL_STATE.inventory,
          ...(rawState.inventory || {})
        },
        equipped: {
          ...INITIAL_STATE.equipped,
          ...(rawState.equipped || {})
        },
        dailyBounties: {
          ...INITIAL_STATE.dailyBounties,
          ...(rawState.dailyBounties || {})
        },
        apiKeys: {
          ...INITIAL_STATE.apiKeys,
          ...(rawState.apiKeys || {})
        },
        badges: Array.isArray(rawState.badges) ? rawState.badges : [],
        mistakes: Array.isArray(rawState.mistakes) ? rawState.mistakes : [],
        wordMastery: (rawState.wordMastery && typeof rawState.wordMastery === 'object') ? rawState.wordMastery : {},
        hasCompletedPlacement: Boolean(rawState.hasCompletedPlacement),
        excludeVosotros: rawState._hasSetVosotros ? Boolean(rawState.excludeVosotros) : true,
        translateInstructions: Boolean(rawState.translateInstructions)
      };

      setState(merged);
      localStorage.setItem('estudiamos_102_state', JSON.stringify(merged));
      return {
        success: true,
        level,
        message: `¡Partida restaurada con éxito! Nivel ${level}, ${gold} Oro, Etapa ${questStage}.`
      };
    } catch (err) {
      console.error("Error importing save data:", err);
      return { success: false, error: err.message || "Error al procesar el archivo de guardado." };
    }
  };

  return {
    state,
    addXp,
    addGold,
    takeDamage,
    heal,
    revive,
    recordQuizPerformance,
    buyItem,
    consumeItem,
    addBadge,
    completeAdventure,
    setApiKey,
    completePlacement,
    checkAndUpdateStreak,
    advanceQuest,
    passStageReview,
    recordLevelCompletion,
    resetAllProgress,
    setExcludeVosotros,
    markFlashcardsSeen,
    recordWordAnsweredCorrectly,
    buyEquipment,
    equipItem,
    addMistake,
    removeMistake,
    toggleAutoSpeak,
    claimBounty,
    incrementBountyCount,
    feedNarfy,
    playWithNarfy,
    updateWordMastery,
    setDifficultyMode,
    setTtsVoice,
    setTtsRate,
    setUseGeminiTts,
    toggleTranslateInstructions,
    setTranslateInstructions,
    exportSaveData,
    importSaveData,
  };
}
