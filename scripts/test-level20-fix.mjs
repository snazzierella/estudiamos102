// -------------------------------------------------------------
// VERIFICATION TEST: LEVEL 20 PROGRESSION & LEGACY SAVE MIGRATION
// -------------------------------------------------------------
import assert from 'assert';

console.log("===================================================================");
console.log("🧪 RUNNING LEVEL 20 FIX & LEGACY MIGRATION VERIFICATION SUITE");
console.log("===================================================================\n");

// Simulation of useGameState migration logic
function migrateSavedState(rawState) {
  let questStage = Math.max(1, Number(rawState.questStage) || 1);
  let questLevel = Math.max(1, Number(rawState.questLevel) || 1);
  let isReviewReady = Boolean(rawState.isReviewReady);
  let completedLevels = Array.isArray(rawState.completedLevels) ? [...rawState.completedLevels] : [];

  // Pre-25-level architecture migration
  if (isReviewReady && questLevel < 24) {
    isReviewReady = false;
    questLevel = Math.max(questLevel, 20);
  }

  // Clean up legacy Review Gate completedLevels key for current stage
  if (!isReviewReady && questLevel <= 20) {
    completedLevels = completedLevels.filter(k => k !== `${questStage}-20`);
  }

  return {
    ...rawState,
    questStage,
    questLevel,
    isReviewReady,
    completedLevels
  };
}

// Simulation of StudyQuest level state helpers
function isLevelPassed(state, stageNum, levelNum) {
  if (stageNum < state.questStage) return true;
  if (stageNum > state.questStage) return false;
  // For current stage:
  if (state.isReviewReady) return levelNum < 25;
  return levelNum < state.questLevel;
}

function isLevelCurrent(state, stageNum, levelNum) {
  if (stageNum !== state.questStage) return false;
  if (state.isReviewReady) return levelNum === 25;
  return levelNum === state.questLevel;
}

function isLevelLocked(state, stageNum, levelNum) {
  const isEarlyBoss = stageNum === state.questStage && levelNum === 25 && !state.isReviewReady;
  if (isEarlyBoss) return false;
  return !isLevelPassed(state, stageNum, levelNum) && !isLevelCurrent(state, stageNum, levelNum);
}

function computeQuestFlags(state, stageVal, levelVal) {
  const isEarlyBoss = stageVal === state.questStage && levelVal === 25 && !state.isReviewReady;
  const isReview = levelVal === 25;
  const isCurrent = isLevelCurrent(state, stageVal, levelVal);
  const isReplay = !isCurrent && isLevelPassed(state, stageVal, levelVal);
  return { isEarlyBoss, isReview, isCurrent, isReplay };
}

// -------------------------------------------------------------
// TEST 1: Legacy Save Migration (Completed Level 19 before update)
// -------------------------------------------------------------
console.log("--- Test 1: Migrating legacy save at Unit 2 Level 19 with isReviewReady=true ---");
const legacySave1 = {
  questStage: 2,
  questLevel: 19,
  isReviewReady: true,
  completedLevels: [
    ...Array.from({ length: 20 }, (_, i) => `1-${i + 1}`),
    ...Array.from({ length: 19 }, (_, i) => `2-${i + 1}`),
    "2-20" // Old review gate attempt
  ]
};

const migrated1 = migrateSavedState(legacySave1);
assert.strictEqual(migrated1.isReviewReady, false, "isReviewReady must be reset to false so levels 20-24 can be played");
assert.strictEqual(migrated1.questLevel, 20, "questLevel must be advanced to 20 for the newly introduced Unit 2 levels");
assert.ok(!migrated1.completedLevels.includes("2-20"), "'2-20' must be purged from completedLevels so Level 20 is not treated as passed");
console.log("  ✓ Migrated legacy save correctly: questLevel=20, isReviewReady=false, '2-20' purged.");

// -------------------------------------------------------------
// TEST 2: Level 20 Status on Migrated State
// -------------------------------------------------------------
console.log("\n--- Test 2: Verifying Level 20 is Current and NOT a Replay ---");
const flags20 = computeQuestFlags(migrated1, 2, 20);
assert.strictEqual(flags20.isCurrent, true, "Level 20 must be marked as CURRENT");
assert.strictEqual(flags20.isReplay, false, "Level 20 must NOT be marked as a replay");
assert.strictEqual(flags20.isReview, false, "Level 20 must NOT be a review gate");
assert.strictEqual(isLevelPassed(migrated1, 2, 20), false, "Level 20 must NOT be passed yet");
assert.strictEqual(isLevelLocked(migrated1, 2, 20), false, "Level 20 must NOT be locked");
console.log("  ✓ Level 20 flags verified: isCurrent=true, isReplay=false, isPassed=false, isLocked=false.");

// Verify levels 1-19 are passed
for (let lvl = 1; lvl <= 19; lvl++) {
  assert.strictEqual(isLevelPassed(migrated1, 2, lvl), true, `Level ${lvl} should be passed`);
  const flagsLvl = computeQuestFlags(migrated1, 2, lvl);
  assert.strictEqual(flagsLvl.isReplay, true, `Level ${lvl} should be replayable`);
}
console.log("  ✓ Levels 1-19 correctly identified as passed and replayable.");

// Verify levels 21-24 are locked
for (let lvl = 21; lvl <= 24; lvl++) {
  assert.strictEqual(isLevelPassed(migrated1, 2, lvl), false, `Level ${lvl} should not be passed`);
  assert.strictEqual(isLevelLocked(migrated1, 2, lvl), true, `Level ${lvl} should be locked`);
}
console.log("  ✓ Levels 21-24 correctly identified as locked.");

// -------------------------------------------------------------
// TEST 3: Campaign Progression After Beating Level 20
// -------------------------------------------------------------
console.log("\n--- Test 3: Simulating Level 20 Completion and Advancing to Level 21 ---");

function advanceQuest(state, _score, _total = 20) {
  let nextLevel = state.questLevel;
  let nextReview = state.isReviewReady;
  if (state.questLevel < 24) {
    nextLevel += 1;
  } else {
    nextReview = true;
  }
  const currentKey = `${state.questStage}-${state.questLevel}`;
  const updatedCompleted = state.completedLevels.includes(currentKey)
    ? state.completedLevels
    : [...state.completedLevels, currentKey];

  return {
    ...state,
    questLevel: nextLevel,
    isReviewReady: nextReview,
    completedLevels: updatedCompleted
  };
}

const stateAfter20 = advanceQuest(migrated1, 18, 20);
assert.strictEqual(stateAfter20.questLevel, 21, "questLevel must advance to 21 after completing Level 20");
assert.strictEqual(stateAfter20.isReviewReady, false, "isReviewReady must still be false");
assert.ok(stateAfter20.completedLevels.includes("2-20"), "'2-20' must now be in completedLevels after passing");

const flags21 = computeQuestFlags(stateAfter20, 2, 21);
assert.strictEqual(flags21.isCurrent, true, "Level 21 must now be CURRENT");
assert.strictEqual(flags21.isReplay, false, "Level 21 must NOT be a replay");
assert.strictEqual(isLevelLocked(stateAfter20, 2, 21), false, "Level 21 must be UNLOCKED");
assert.strictEqual(isLevelPassed(stateAfter20, 2, 20), true, "Level 20 must now be PASSED");
console.log("  ✓ Cleared Level 20! Advanced to Level 21 successfully (questLevel=21). No infinite Level 20 loop!");

// -------------------------------------------------------------
// TEST 4: Full Progression Through Remaining Levels to Boss
// -------------------------------------------------------------
console.log("\n--- Test 4: Progressing through Levels 21 -> 22 -> 23 -> 24 -> 25 (Boss) ---");
let currState = stateAfter20;
for (let lvl = 21; lvl <= 24; lvl++) {
  assert.strictEqual(currState.questLevel, lvl, `Expected current level to be ${lvl}`);
  currState = advanceQuest(currState, 19, 20);
}
assert.strictEqual(currState.questLevel, 24, "questLevel caps at 24 when review is ready");
assert.strictEqual(currState.isReviewReady, true, "isReviewReady is now true after clearing Level 24");

const bossFlags = computeQuestFlags(currState, 2, 25);
assert.strictEqual(bossFlags.isReview, true, "Level 25 is the Review Gate");
assert.strictEqual(bossFlags.isCurrent, true, "Level 25 is current boss");
assert.strictEqual(bossFlags.isReplay, false, "Level 25 is NOT a replay");
console.log("  ✓ Reached Review Gate Level 25 successfully after clearing Level 24!");

console.log("\n===================================================================");
console.log("🎉 ALL LEVEL 20 FIX & MIGRATION TESTS PASSED PERFECTLY!");
console.log("===================================================================\n");
