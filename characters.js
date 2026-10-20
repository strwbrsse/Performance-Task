
/* ==========================================
   BEFORE YOU CLOSE YOUR EYES
   CHARACTERS.JS

   Character profiles and sprite expressions
========================================== */

window.CHARACTERS = {

  // ========================================
  // HARU
  // ========================================

  haru: {
    id: "haru",

    name: "Haru",

    role: "The boy who remembers",

    description:
      "Quietly observant and thoughtful, Haru writes down " +
      "the little things others overlook. When everyone " +
      "begins forgetting Ria, he becomes determined to " +
      "remember her, even if it means questioning his own memories.",

    personality:
      "Calm, caring, observant, loyal, and occasionally sarcastic.",

    color: "#9bc9f4",

    // Default expression
    defaultExpression: "neutral",

    // Character images
    sprites: {
      neutral: "assets/sprites/haru_neutral.png",
      happy: "assets/sprites/haru_happy.png",
      sad: "assets/sprites/haru_sad.png",
      shy: "assets/sprites/haru_shy.png",
      angry: "assets/sprites/haru_angry.png"
    }
  },

  // ========================================
  // RIA
  // ========================================

  ria: {
    id: "ria",

    name: "Ria",

    role: "The girl between dreams",

    description:
      "Witty, mysterious, and guarded, Ria hides her " +
      "loneliness behind teasing remarks and a confident smile. " +
      "As the world slowly forgets she exists, she finds " +
      "herself drawn to the one person who still remembers her.",

    personality:
      "Playful, intelligent, stubborn, sensitive, and secretly afraid.",

    color: "#f0add9",

    // Default expression
    defaultExpression: "neutral",

    // Character images
    sprites: {
      neutral: "assets/sprites/ria_neutral.png",
      happy: "assets/sprites/ria_happy.png",
      sad: "assets/sprites/ria_sad.png",
      shy: "assets/sprites/ria_shy.png",
      angry: "assets/sprites/ria_angry.png"
    }
  }

};

/* ==========================================
   CHARACTER HELPER FUNCTIONS
========================================== */

// Get character data by ID
window.getCharacter = function (characterId) {
  return window.CHARACTERS[characterId] || null;
};

// Get character name
window.getCharacterName = function (characterId) {
  const character = window.getCharacter(characterId);

  return character ? character.name : "Unknown";
};

// Get character sprite by expression
window.getCharacterSprite = function (
  characterId,
  expression = "neutral"
) {
  const character = window.getCharacter(characterId);

  if (!character) {
    return "";
  }

  // Prefer paths registered in assets.js
  const assetSprites =
    window.ASSETS?.sprites?.[characterId];

  if (assetSprites) {
    return (
      assetSprites[expression] ||
      assetSprites.neutral ||
      ""
    );
  }

  // Fallback to paths stored in characters.js
  return (
    character.sprites[expression] ||
    character.sprites.neutral ||
    ""
  );
};
