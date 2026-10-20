
/* ==========================================
   BEFORE YOU CLOSE YOUR EYES
   SCRIPT.JS

   Complete Visual Novel Engine

   FEATURES:
   - Main Menu
   - Five Chapters
   - Cinematic Chapter Transitions
   - Character Sprites and Expressions
   - Animated Dialogue
   - Player Choices
   - Two Endings
   - Background Music
   - One Shared Ending Soundtrack
   - Sound Effects
   - Audio Settings
   - Keyboard Controls
   - Saved Settings and Ending Progress
========================================== */

(() => {
  "use strict";

  /* ========================================
     GAME DATA
  ======================================== */

  const app = document.getElementById("app");

  const ASSETS = window.ASSETS || {};
  const CHARACTERS = window.CHARACTERS || {};
  const STORY = window.STORY;

  if (
    !app ||
    !STORY ||
    !STORY.scenes ||
    !Array.isArray(STORY.chapters)
  ) {
    console.error(
      "Game initialization failed. Check index.html and story.js."
    );

    if (app) {
      app.textContent =
        "Unable to load the game. Please check your JavaScript files.";
    }

    return;
  }

  /* ========================================
     LOCAL STORAGE
  ======================================== */

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key);

      return value === null
        ? fallback
        : JSON.parse(value);

    } catch (error) {
      console.warn(
        "Could not load saved data:",
        error
      );

      return fallback;
    }
  }

  function save() {
    try {
      localStorage.setItem(
        "bgs_settings",
        JSON.stringify(settings)
      );

      localStorage.setItem(
        "bgs_endings",
        JSON.stringify([...discovered])
      );

    } catch (error) {
      console.warn(
        "Could not save game data:",
        error
      );
    }
  }

  /* ========================================
     DEFAULT SETTINGS
  ======================================== */

  const defaultSettings = {
    fontSize: 19,
    typewriter: true,
    hints: true,
    musicEnabled: true,
    sfxEnabled: true,
    volume: 35
  };

  const savedSettings = load(
    "bgs_settings",
    {}
  );

  const settings = {
    ...defaultSettings,

    ...(
      savedSettings &&
      typeof savedSettings === "object" &&
      !Array.isArray(savedSettings)
        ? savedSettings
        : {}
    )
  };

  settings.fontSize = Math.max(
    15,
    Math.min(
      27,
      Number(settings.fontSize) || 19
    )
  );

  settings.volume = Math.max(
    0,
    Math.min(
      100,
      Number(settings.volume) || 0
    )
  );

  settings.typewriter =
    Boolean(settings.typewriter);

  settings.hints =
    Boolean(settings.hints);

  settings.musicEnabled =
    Boolean(settings.musicEnabled);

  settings.sfxEnabled =
    Boolean(settings.sfxEnabled);

  /* ========================================
     DISCOVERED ENDINGS
  ======================================== */

  const savedEndings = load(
    "bgs_endings",
    []
  );

  const discovered = new Set(
    Array.isArray(savedEndings)
      ? savedEndings
      : []
  );

  /* ========================================
     GAME STATE
  ======================================== */

  let currentScene = STORY.start;

  let currentChapter =
    STORY.chapters[0]?.title ||
    "Chapter 1";

  let screen = "menu-screen";

  let fullText = "";

  let finishedTyping = true;

  let typingTimer = null;

  let chapterTimer = null;

  let pendingChapterScene = null;

  /* ========================================
     AUDIO SYSTEM
  ======================================== */

  const music = new Audio();

  music.loop = true;
  music.preload = "none";

  let currentMusicTrack = "";

  let audioUnlocked = false;

  const soundEffects = {};

  // Keep compatibility with assets.js
  // even if some audio files are missing.

  function getAudioPath(name) {
    // Shared soundtrack for both endings.
    if (name === "ending") {
      return (
        ASSETS.audio?.ending ||
        "assets/audio/ending.mp3"
      );
    }

    return ASSETS.audio?.[name] || "";
  }

  function updateAudioVolume() {
    const volume = settings.volume / 100;

    music.volume = volume;

    Object.values(soundEffects).forEach(
      sound => {
        sound.volume = Math.min(
          1,
          volume * 0.8
        );
      }
    );
  }

  function safelyPlay(audio) {
    if (!audio || !audio.src) {
      return;
    }

    const promise = audio.play();

    if (
      promise &&
      typeof promise.catch === "function"
    ) {
      promise.catch(error => {
        if (
          error.name !== "NotAllowedError" &&
          error.name !== "AbortError"
        ) {
          console.warn(
            "Audio playback failed:",
            error
          );
        }
      });
    }
  }

  function playMusic(track) {
    const path = getAudioPath(track);

    if (!path) {
      music.pause();
      currentMusicTrack = "";
      return;
    }

    // Prevent restarting music on every
    // dialogue scene within the same chapter.

    if (currentMusicTrack !== track) {
      music.pause();

      currentMusicTrack = track;

      music.src = path;

      music.load();
    }

    updateAudioVolume();

    if (
      settings.musicEnabled &&
      audioUnlocked
    ) {
      safelyPlay(music);
    } else {
      music.pause();
    }
  }

  function stopMusic() {
    music.pause();

    try {
      music.currentTime = 0;
    } catch {
      // Ignore when audio is not ready.
    }

    currentMusicTrack = "";
  }

  function playSound(name) {
    if (
      !settings.sfxEnabled ||
      !audioUnlocked
    ) {
      return;
    }

    const path = getAudioPath(name);

    if (!path) {
      return;
    }

    if (!soundEffects[name]) {
      soundEffects[name] = new Audio(path);

      soundEffects[name].preload = "none";
    }

    const sound = soundEffects[name];

    sound.volume = Math.min(
      1,
      (settings.volume / 100) * 0.8
    );

    try {
      sound.pause();
      sound.currentTime = 0;
    } catch {
      // Ignore if sound hasn't loaded yet.
    }

    safelyPlay(sound);
  }

  // Browsers require a user gesture
  // before audio can begin playing.

  function unlockAudio() {
    if (audioUnlocked) {
      return;
    }

    audioUnlocked = true;

    if (
      settings.musicEnabled &&
      currentMusicTrack
    ) {
      safelyPlay(music);
    }
  }

  function toggleMusic(enabled) {
    settings.musicEnabled = enabled;

    if (enabled) {
      unlockAudio();

      if (currentMusicTrack) {
        updateAudioVolume();
        safelyPlay(music);
      }

    } else {
      music.pause();
    }

    save();
  }

  /* ========================================
     MUSIC FOR EACH CHAPTER AND ENDING
  ======================================== */

  function musicForScene(sceneId) {

    // IMPORTANT:
    // Both endings use the SAME ending.mp3.

    if (
      sceneId.startsWith("hope_") ||
      sceneId.startsWith("bittersweet_")
    ) {
      return "ending";
    }

    // Chapter 1
    if (sceneId.startsWith("ch1_")) {
      return "romance";
    }

    // Chapter 2
    if (sceneId.startsWith("ch2_")) {
      return "sad";
    }

    // Chapter 3
    if (sceneId.startsWith("ch3_")) {
      return "romance";
    }

    // Chapter 4
    if (sceneId.startsWith("ch4_")) {
      return "dream";
    }

    // Chapter 5
    if (sceneId.startsWith("ch5_")) {
      return "sad";
    }

    return "romance";
  }

  /* ========================================
     HTML HELPERS
  ======================================== */

  function escapeHTML(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,

      character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
    );
  }

  function btn(
    label,
    action,
    className = ""
  ) {
    return `
      <button
        type="button"
        class="btn ${escapeHTML(className)}"
        data-action="${escapeHTML(action)}"
      >
        ${escapeHTML(label)}
      </button>
    `;
  }

  function stopTyping() {
    if (typingTimer !== null) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }

  function stopChapterTimer() {
    if (chapterTimer !== null) {
      clearTimeout(chapterTimer);
      chapterTimer = null;
    }
  }

  function render(
    html,
    screenName = ""
  ) {
    stopTyping();
    stopChapterTimer();

    screen = screenName;

    app.innerHTML = `
      <div class="screen ${escapeHTML(screenName)}">
        ${html}
      </div>
    `;
  }

  /* ========================================
     IMAGE HELPERS
  ======================================== */

  function getBackground(name) {
    return (
      ASSETS.backgrounds?.[name] ||
      ASSETS.backgrounds?.rooftop ||
      ""
    );
  }

  function getSprite(
    characterId,
    expression = "neutral"
  ) {
    const sprites =
      ASSETS.sprites?.[characterId] ||
      CHARACTERS[characterId]?.sprites;

    return (
      sprites?.[expression] ||
      sprites?.neutral ||
      ""
    );
  }

  function setBackground(
    elementId,
    path
  ) {
    const element =
      document.getElementById(elementId);

    if (element && path) {
      element.style.backgroundImage =
        `url("${path}")`;
    }
  }

  /* ========================================
     MAIN MENU
  ======================================== */

  function menu() {
    pendingChapterScene = null;

    playMusic("menu");

    render(`
      <div class="menu">

        <div class="eyebrow">
          An Original Anime Romance Visual Novel
        </div>

        <h1>
          ${escapeHTML(STORY.title)}
        </h1>

        <p class="subtitle">
          ${escapeHTML(STORY.subtitle)}
        </p>

        <div class="panel">

          <div class="actions">

            ${btn(
              "Start Story",
              "start",
              "primary"
            )}

            ${btn(
              "Chapters",
              "chapters"
            )}

            ${btn(
              "Characters",
              "characters"
            )}

            ${btn(
              "Settings",
              "settings"
            )}

          </div>

          <p class="footer-note">
            Five Chapters · Two Endings ·
            One Unforgettable Promise
          </p>

        </div>

      </div>
    `, "menu-screen");
  }

  /* ========================================
     CHAPTER SELECTION
  ======================================== */

  function chapters() {
    const chapterButtons =
      STORY.chapters.map(
        (chapter, index) => `
          <button
            type="button"
            class="btn chapter"
            data-chapter="${index}"
          >
            <strong>
              ${escapeHTML(chapter.title)}
            </strong>

            <span>
              ${escapeHTML(
                chapter.description || ""
              )}
            </span>
          </button>
        `
      ).join("");

    render(`
      <section class="panel">

        ${btn(
          "← Back",
          "menu",
          "small back"
        )}

        <div class="eyebrow">
          Select a Memory
        </div>

        <h2>Chapters</h2>

        <p class="hint">
          Each chapter begins with a
          cinematic transition and music.
        </p>

        <div class="list">
          ${chapterButtons}
        </div>

        <p class="footer-note">
          Endings Discovered:
          ${discovered.size} / 2
        </p>

      </section>
    `, "chapters-screen");
  }

  /* ========================================
     CHARACTER SCREEN
  ======================================== */

  function characters() {
    const profiles =
      Object.entries(CHARACTERS)
        .map(([id, character]) => {

          const sprite =
            getSprite(id, "neutral");

          return `
            <article class="profile">

              ${sprite ? `
                <img
                  src="${escapeHTML(sprite)}"
                  alt="${escapeHTML(character.name)}"
                  loading="lazy"
                >
              ` : ""}

              <h3>
                ${escapeHTML(character.name)}
              </h3>

              <div class="eyebrow">
                ${escapeHTML(character.role || "")}
              </div>

              <p>
                ${escapeHTML(
                  character.description || ""
                )}
              </p>

            </article>
          `;
        }).join("");

    render(`
      <section class="panel">

        ${btn(
          "← Back",
          "menu",
          "small back"
        )}

        <div class="eyebrow">
          The People We Remember
        </div>

        <h2>Characters</h2>

        <div class="profile-grid">
          ${profiles}
        </div>

      </section>
    `, "characters-screen");
  }

  /* ========================================
     SETTINGS SCREEN
  ======================================== */

  function settingsScreen() {
    render(`
      <section class="panel">

        ${btn(
          "← Back",
          "menu",
          "small back"
        )}

        <div class="eyebrow">
          Make the Night Your Own
        </div>

        <h2>Settings</h2>

        <div class="setting">

          <label for="fontSize">
            Dialogue Text Size

            <span id="fontValue">
              ${settings.fontSize}px
            </span>
          </label>

          <input
            id="fontSize"
            type="range"
            min="15"
            max="27"
            value="${settings.fontSize}"
          >

        </div>

        <div class="setting">

          <label for="typewriter">
            Typewriter Effect
          </label>

          <input
            id="typewriter"
            type="checkbox"
            ${settings.typewriter
              ? "checked"
              : ""}
          >

        </div>

        <div class="setting">

          <label for="hints">
            Keyboard Hints
          </label>

          <input
            id="hints"
            type="checkbox"
            ${settings.hints
              ? "checked"
              : ""}
          >

        </div>

        <hr class="settings-divider">

        <div class="eyebrow">
          Audio Settings
        </div>

        <div class="setting">

          <label for="musicEnabled">
            Background Music
          </label>

          <input
            id="musicEnabled"
            type="checkbox"
            ${settings.musicEnabled
              ? "checked"
              : ""}
          >

        </div>

        <div class="setting">

          <label for="sfxEnabled">
            Sound Effects
          </label>

          <input
            id="sfxEnabled"
            type="checkbox"
            ${settings.sfxEnabled
              ? "checked"
              : ""}
          >

        </div>

        <div class="setting">

          <label for="volume">
            Volume

            <span id="volumeValue">
              ${settings.volume}%
            </span>
          </label>

          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            step="5"
            value="${settings.volume}"
          >

        </div>

        <p class="hint">
          Audio begins after interacting
          with the game. Settings are
          saved automatically.
        </p>

      </section>
    `, "settings-screen");
  }

  /* ========================================
     CINEMATIC CHAPTER TRANSITIONS
  ======================================== */

  function showChapterTransition(sceneId) {
    const scene = STORY.scenes[sceneId];

    if (!scene) {
      menu();
      return;
    }

    pendingChapterScene = sceneId;

    const chapterIndex =
      STORY.chapters.findIndex(
        chapter => chapter.scene === sceneId
      );

    const chapterNumber =
      chapterIndex >= 0
        ? chapterIndex + 1
        : 1;

    const chapterTitle =
      scene.chapter ||
      STORY.chapters[chapterIndex]?.title ||
      "A New Chapter";

    const cleanTitle =
      chapterTitle.replace(
        /^Chapter\s+\d+\s*[—–:-]\s*/i,
        ""
      );

    // Change music for the new chapter.
    playMusic(
      musicForScene(sceneId)
    );

    // Play the chapter intro sound.
    playSound("chapter");

    render(`
      <div
        class="chapter-transition-backdrop"
        id="chapterTransitionBackdrop"
      ></div>

      <div class="chapter-transition-content">

        <div class="chapter-transition-line">
        </div>

        <p class="chapter-transition-eyebrow">
          Chapter ${String(chapterNumber)
            .padStart(2, "0")}
        </p>

        <h1 class="chapter-transition-title">
          ${escapeHTML(cleanTitle)}
        </h1>

        <p class="chapter-transition-subtitle">
          ${escapeHTML(
            scene.introSubtitle || ""
          )}
        </p>

        <div class="chapter-transition-line">
        </div>

        <div class="chapter-transition-bottom">
          ${btn(
            "Skip Intro →",
            "skip-intro",
            "small"
          )}
        </div>

      </div>
    `, "chapter-transition-screen");

    setBackground(
      "chapterTransitionBackdrop",
      getBackground(scene.background)
    );

    chapterTimer = setTimeout(() => {
      chapterTimer = null;

      if (
        screen === "chapter-transition-screen" &&
        pendingChapterScene === sceneId
      ) {
        enterChapter();
      }

    }, 2600);
  }

  function enterChapter() {
    if (!pendingChapterScene) {
      return;
    }

    const sceneId =
      pendingChapterScene;

    pendingChapterScene = null;

    showScene(sceneId, true);
  }

  /* ========================================
     DISPLAY STORY SCENE
  ======================================== */

  function showScene(
    sceneId,
    skipIntro = false
  ) {
    const scene =
      STORY.scenes[sceneId];

    if (!scene) {
      console.error(
        "Unknown story scene:",
        sceneId
      );

      menu();
      return;
    }

    if (scene.chapter) {
      currentChapter =
        scene.chapter;
    }

    // Chapter transition
    if (
      scene.chapterIntro &&
      !skipIntro
    ) {
      showChapterTransition(sceneId);
      return;
    }

    currentScene = sceneId;

    fullText = String(
      scene.text || ""
    );

    finishedTyping =
      !settings.typewriter;

    // Play chapter music or shared ending music.
    playMusic(
      musicForScene(sceneId)
    );

    const characterId =
      scene.speaker || "";

    const characterName =
      CHARACTERS[characterId]?.name ||
      characterId;

    const sprite =
      getSprite(
        characterId,
        scene.expression || "neutral"
      );

    render(`
      <div
        class="backdrop"
        id="sceneBackdrop"
      ></div>

      ${sprite ? `
        <img
          class="character-sprite"
          src="${escapeHTML(sprite)}"
          alt="${escapeHTML(characterName)}"
        >
      ` : ""}

      <div class="story-ui">

        <div class="story-top">

          <span class="chapter-label">
            ${escapeHTML(currentChapter)}
          </span>

          <div class="actions">

            ${btn(
              "Restart",
              "restart",
              "small"
            )}

            ${btn(
              "Menu",
              "menu",
              "small"
            )}

          </div>

        </div>

        <section
          class="dialogue"
          aria-label="Story Dialogue"
        >

          <div class="speaker">
            ${escapeHTML(characterName)}
          </div>

          <div
            class="dialogue-text"
            id="dialogueText"
          ></div>

          <div id="sceneControls">
          </div>

        </section>

      </div>
    `, "story-screen");

    setBackground(
      "sceneBackdrop",
      getBackground(scene.background)
    );

    document.documentElement.style.setProperty(
      "--size",
      `${settings.fontSize}px`
    );

    // Typewriter dialogue animation
    if (
      settings.typewriter &&
      fullText.length > 0
    ) {
      let index = 0;

      const output =
        document.getElementById(
          "dialogueText"
        );

      typingTimer = setInterval(() => {

        index = Math.min(
          fullText.length,
          index + 2
        );

        if (output) {
          output.textContent =
            fullText.slice(0, index);
        }

        if (
          index >= fullText.length
        ) {
          finishText();
        }

      }, 24);

    } else {
      finishText();
    }
  }

  /* ========================================
     FINISH DIALOGUE
  ======================================== */

  function finishText() {
    stopTyping();

    finishedTyping = true;

    const textElement =
      document.getElementById(
        "dialogueText"
      );

    if (textElement) {
      textElement.textContent =
        fullText;
    }

    const scene =
      STORY.scenes[currentScene];

    const controls =
      document.getElementById(
        "sceneControls"
      );

    if (
      !scene ||
      !controls
    ) {
      return;
    }

    // =====================================
    // PLAYER CHOICES
    // =====================================

    if (
      Array.isArray(scene.choices) &&
      scene.choices.length > 0
    ) {
      controls.innerHTML = `
        <div class="choices">

          ${scene.choices.map(
            (choice, index) => `
              <button
                type="button"
                class="btn"
                data-choice="${index}"
              >
                ${escapeHTML(choice.text)}
              </button>
            `
          ).join("")}

        </div>
      `;

      return;
    }

    // =====================================
    // ENDING SCREEN
    // =====================================

    if (scene.ending) {

      if (scene.endingKey) {
        discovered.add(
          scene.endingKey
        );

        save();
      }

      controls.innerHTML = `
        <div class="ending-title">
          Ending · ${escapeHTML(scene.ending)}
        </div>

        <div class="dialogue-footer">

          <span class="next-hint">
            ${discovered.size}
            of 2 endings discovered
          </span>

          <div class="actions">

            ${btn(
              "Play Again",
              "restart",
              "primary small"
            )}

            ${btn(
              "Main Menu",
              "menu",
              "small"
            )}

          </div>

        </div>
      `;

      return;
    }

    // =====================================
    // CONTINUE BUTTON
    // =====================================

    if (scene.next) {
      controls.innerHTML = `
        <div class="dialogue-footer">

          <span class="next-hint">
            ${
              settings.hints
                ? "Enter / Space to continue"
                : ""
            }
          </span>

          ${btn(
            "Continue →",
            "next",
            "primary small"
          )}

        </div>
      `;

    } else {
      controls.innerHTML = `
        <div class="dialogue-footer">
          ${btn(
            "Main Menu",
            "menu",
            "small"
          )}
        </div>
      `;
    }
  }

  /* ========================================
     ADVANCE STORY
  ======================================== */

  function advance() {
    if (
      screen !== "story-screen"
    ) {
      return;
    }

    if (!finishedTyping) {
      finishText();
      return;
    }

    const scene =
      STORY.scenes[currentScene];

    if (
      !scene ||
      scene.choices ||
      scene.ending
    ) {
      return;
    }

    if (scene.next) {
      showScene(
        scene.next
      );
    }
  }

  /* ========================================
     RESTART STORY
  ======================================== */

  function restart() {
    currentChapter =
      STORY.chapters[0]?.title ||
      "Chapter 1";

    showScene(
      STORY.start
    );
  }

  /* ========================================
     CLICK EVENTS
  ======================================== */

  app.addEventListener(
    "click",
    event => {

      const target =
        event.target;

      if (
        !(target instanceof Element)
      ) {
        return;
      }

      const choiceButton =
        target.closest(
          "[data-choice]"
        );

      const chapterButton =
        target.closest(
          "[data-chapter]"
        );

      const actionButton =
        target.closest(
          "[data-action]"
        );

      if (
        !choiceButton &&
        !chapterButton &&
        !actionButton
      ) {
        return;
      }

      unlockAudio();

      playSound("click");

      // ====================================
      // STORY CHOICES
      // ====================================

      if (choiceButton) {
        if (!finishedTyping) {
          finishText();
          return;
        }

        const scene =
          STORY.scenes[currentScene];

        const choiceIndex =
          Number(
            choiceButton.dataset.choice
          );

        const nextScene =
          scene?.choices?.[choiceIndex]?.next;

        if (nextScene) {
          showScene(nextScene);
        }

        return;
      }

      // ====================================
      // CHAPTER SELECTION
      // ====================================

      if (chapterButton) {
        const chapterIndex =
          Number(
            chapterButton.dataset.chapter
          );

        const chapter =
          STORY.chapters[chapterIndex];

        if (chapter) {
          currentChapter =
            chapter.title;

          showScene(
            chapter.scene
          );
        }

        return;
      }

      // ====================================
      // MAIN BUTTON ACTIONS
      // ====================================

      const action =
        actionButton?.dataset.action;

      switch (action) {

        case "start":
          restart();
          break;

        case "restart":
          restart();
          break;

        case "menu":
          menu();
          break;

        case "chapters":
          chapters();
          break;

        case "characters":
          characters();
          break;

        case "settings":
          settingsScreen();
          break;

        case "next":
          advance();
          break;

        case "skip-intro":
          enterChapter();
          break;

        default:
          break;
      }
    }
  );

  /* ========================================
     SETTINGS SLIDERS
  ======================================== */

  app.addEventListener(
    "input",
    event => {

      const target =
        event.target;

      if (
        !(target instanceof HTMLInputElement)
      ) {
        return;
      }

      // Dialogue Font Size
      if (
        target.id === "fontSize"
      ) {
        settings.fontSize =
          Number(target.value);

        const label =
          document.getElementById(
            "fontValue"
          );

        if (label) {
          label.textContent =
            `${settings.fontSize}px`;
        }

        document.documentElement.style.setProperty(
          "--size",
          `${settings.fontSize}px`
        );

        save();
      }

      // Audio Volume
      if (
        target.id === "volume"
      ) {
        settings.volume =
          Number(target.value);

        const label =
          document.getElementById(
            "volumeValue"
          );

        if (label) {
          label.textContent =
            `${settings.volume}%`;
        }

        updateAudioVolume();

        save();
      }
    }
  );

  /* ========================================
     SETTINGS CHECKBOXES
  ======================================== */

  app.addEventListener(
    "change",
    event => {

      const target =
        event.target;

      if (
        !(target instanceof HTMLInputElement)
      ) {
        return;
      }

      // Background Music
      if (
        target.id === "musicEnabled"
      ) {
        toggleMusic(
          target.checked
        );

        return;
      }

      // Sound Effects
      if (
        target.id === "sfxEnabled"
      ) {
        settings.sfxEnabled =
          target.checked;

        if (
          !settings.sfxEnabled
        ) {
          Object.values(
            soundEffects
          ).forEach(
            sound => sound.pause()
          );
        }

        save();
        return;
      }

      // Other Settings
      if (
        target.id === "typewriter" ||
        target.id === "hints"
      ) {
        settings[target.id] =
          target.checked;

        save();
      }
    }
  );

  /* ========================================
     KEYBOARD CONTROLS
  ======================================== */

  document.addEventListener(
    "keydown",
    event => {

      const activeTag =
        document.activeElement?.tagName;

      // ESCAPE - Return to Menu
      if (
        event.key === "Escape"
      ) {
        if (
          screen === "story-screen" ||
          screen === "chapter-transition-screen"
        ) {
          event.preventDefault();

          menu();
        }

        return;
      }

      const advanceKey =
        event.key === "Enter" ||
        event.key === " ";

      if (!advanceKey) {
        return;
      }

      if (
        [
          "BUTTON",
          "INPUT",
          "TEXTAREA",
          "SELECT"
        ].includes(activeTag)
      ) {
        return;
      }

      // Skip Chapter Intro
      if (
        screen === "chapter-transition-screen"
      ) {
        event.preventDefault();

        unlockAudio();

        enterChapter();
        return;
      }

      // Continue Dialogue
      if (
        screen === "story-screen"
      ) {
        event.preventDefault();

        unlockAudio();

        advance();
      }
    }
  );

  /* ========================================
     MISSING IMAGE HANDLING
  ======================================== */

  app.addEventListener(
    "error",
    event => {

      if (
        event.target instanceof HTMLImageElement
      ) {
        console.warn(
          "Missing character image:",
          event.target.src
        );

        event.target.classList.add(
          "missing"
        );
      }
    },
    true
  );

  /* ========================================
     START GAME
  ======================================== */

  document.documentElement.style.setProperty(
    "--size",
    `${settings.fontSize}px`
  );

  menu();

})();
