# Urban Legend

A mobile-first, top-down shooter that runs in the browser. Pick a hero, drag to dodge the ghosts rising from the street, collect power-up orbs, and beat your own best score and survival time.

**Play it:** https://vince-walll.github.io/urban-legend/

<!-- Add screenshots here, for example: ![Battle screen](screenshots/battle.png) -->

## Features

- **Accounts:** create an account and log in. Each account saves its own highest points and longest time.
- **Home screen:** animated hero preview, your records, and a hero selector.
- **5 playable heroes**, each with different health, damage, and fire rate.
- **Auto-fire combat:** your hero shoots automatically, and you steer with a drag control.
- **Power-up orbs:** heal, damage boost, fire-rate boost, and a rare bomb orb.
- **Ultimate button:** clears every enemy on screen.
- **Enemy progression:** enemies get tougher as your kill count grows.
- **Sound:** looping background music, shooting sounds, and explosions.
- **Responsive:** plays full screen on a phone. On desktop it shows in a phone-sized frame, with the controls adjusted to match.
- **Hand-made SVG art** for the heroes, enemies, bullets, orbs, explosion, and backgrounds.

## How to play

1. Create an account, then log in.
2. On the home screen, tap **Heroes** to cycle through the heroes.
3. Tap **challenge** to start a run.
4. Press and drag on the control area to move your hero. The hero fires on its own.
5. Avoid the enemies. Each one that touches you costs 1 HP.
6. Collect orbs for bonuses. When your HP reaches 0 the run ends, your records are saved, and you return to the home screen.

### Heroes

| Hero   | Starting HP | Damage | Time between shots |
| ------ | ----------- | ------ | ------------------ |
| Cipher | 3           | 5      | 500 ms             |
| Crizel | 2           | 2      | 250 ms             |
| Nyx    | 1           | 10     | 500 ms             |
| Vesper | 3           | 5      | 500 ms             |
| Warden | 10          | 10     | 700 ms             |

Starting HP is the account's base HP (3) plus the hero's bonus or penalty.

### Orbs

| Orb         | Effect                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------ |
| Green heart | +1 HP                                                                                      |
| Red sword   | +2 damage                                                                                  |
| Yellow bolt | Faster shooting (once it can't go faster, it adds +2 damage instead)                       |
| Bomb (rare) | The next enemy to touch you triggers an explosion that clears the screen and awards points |

## Built with

- HTML, CSS, and vanilla JavaScript (no framework)
- [Tailwind CSS](https://tailwindcss.com/) via the Play CDN, mixed with a custom stylesheet
- Web Animations API and CSS keyframes for movement and effects
- Pointer Events for touch and mouse control
- `localStorage` for accounts and records
- SVG for all artwork

## Project structure

```
urban-legend/
├── index.html          # login, create account, home, and battle screens
├── style.css           # layout, animations, themes
├── declaration.js      # shared elements, game state, audio helpers
├── updator.js          # score/HP/time display, record saving, hero selector
├── script.js           # game loop: enemies, bullets, orbs, game over
├── done/
│   ├── logIn.js        # login and account creation
│   └── movement.js     # drag controls
├── images/             # SVG art (heroes, enemies, orbs, backgrounds)
└── sounds/             # background music and sound effects
```

Scripts share one global scope and load in the order listed in `index.html`: `declaration.js` first, because the others use what it declares.

## Run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Vince-Walll/urban-legend.git
   ```
2. Open the folder in VS Code and start it with the **Live Server** extension (or any local web server).
3. Open the page in a browser. On a phone, use your computer's local network address.

Sounds and some browser features need the page to be served over `http`, so opening `index.html` straight from the file system may not work fully.

## Known limitations

- **Accounts are not secure.** Names and passwords are stored in plain text in the browser's `localStorage` and checked in JavaScript. This is fine for a learning project, but a real login needs a server that hashes passwords.
- Accounts and records exist only in the browser and device where they were created.
- The Leader Boards and gold buttons are placeholders.

## Roadmap

- [ ] Leaderboard
- [ ] Gold, and unlocking heroes in a shop
- [ ] Separate boss waves and more enemy types
- [ ] Mute button and volume setting
- [ ] Real backend for accounts and scores
- [ ] Restore the login after a page refresh

## Credits

Game design and code by Vince. The SVG artwork and synthesized sound effects were created with AI assistance.
