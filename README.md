# Before You Close Your Eyes

A short, original, melancholic anime-inspired romance visual novel made with plain HTML, CSS and JavaScript. No build tools or libraries required.

## How to play

1. Keep the seven project files in the root folder, alongside your existing `assets/` directory.
2. Open `index.html` in a modern browser. If your browser restricts local files, serve the folder with `python -m http.server 8000` and visit `http://localhost:8000`.
3. Select **Start Story**, read, and choose responses. Reach both endings by playing again.

## Required existing image files

Backgrounds: `assets/backgrounds/classroom.gif`, `dream-shore.gif`, `rooftop.gif`, `station-sunset.gif`.

Sprites: `assets/sprites/haru_angry.png`, `haru_happy.png`, `haru_neutral.png`, `haru_sad.png`, `haru_shy.png`, `ria_angry.png`, `ria_happy.png`, `ria_neutral.png`, `ria_sad.png`, `ria_shy.png`.

**Note:** Images are not bundled in this download. Copy or retain your own image files at the paths above. The game remains navigable without them but the artwork will be missing.

## Files

- `index.html`: page and script imports.
- `style.css`: responsive visuals and dialogue UI.
- `assets.js`: artwork paths.
- `characters.js`: character details.
- `story.js`: chapters, scenes, branching choices and endings.
- `script.js`: visual novel engine, menus, settings and keyboard controls.
- `README.md`: this guide.

## Customize

Edit `STORY.scenes` in `story.js`. A scene can contain `background`, `speaker`, `expression`, `text`, and either `next`, `choices`, or `ending`/`endingKey`. The available backgrounds and expressions are defined in `assets.js`. Add a chapter entry to `STORY.chapters` if you want a new chapter shortcut.

Settings and unlocked ending counts use `localStorage` when available. Keyboard: Enter/Space advances dialogue; Escape returns to menu. Click Continue to skip a running typewriter effect.
