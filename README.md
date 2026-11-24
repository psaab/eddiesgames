# Arcade Blitz

Free games you can play right in your browser — on a phone, tablet or computer, with touch, mouse or keyboard. No downloads, no sign-ups. It also installs like an app: open the site on an iPad or phone and choose **Add to Home Screen**.

## Games

| Game | File | What it is |
| --- | --- | --- |
| Blitz Arena | `games/blitz-arena.html` | 3D arena shooter. Earn coins, buy guns, bows and blades, climb onto roofs. Free-for-All or Gun Game. |
| Cliff Dive | `games/cliff-dive.html` | Run off the cliff, flip and twist, and straighten out for a clean entry. Three judges score every dive. |
| Air Hockey | `games/air-hockey.html` | Play the computer (Easy, Medium, Hard) or a friend on the same screen. First to 7. |
| Tennis | `games/tennis.html` | Top-down tennis against the computer or a friend. Hit with the edge of the racket to aim. |
| Bubble Shooter | `games/bubble-shooter.html` | Bank shots off the walls and match 3 or more to pop them. |
| Hippo Baby Squeaky Double Sled | `games/hippo-sled.html` | Sled down a snowy mountain as Hippo Baby, Squeaky, or both on a double sled. Tap to jump, hold to flip. |

## How it's built

Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies to install. The 3D games load three.js from cdnjs.

```
index.html             the Arcade Blitz home page (opens each game inside the page)
games/                 one self-contained file per game
manifest.webmanifest   app name and icons (for Add to Home Screen)
sw.js                  service worker: offline play and installability
icons/                 app icons
vercel.json            Vercel settings (static site, no build)
```

Scores, coins and unlocked items are saved in each player's own browser (localStorage).

## Run it locally

Any static file server works, for example:

```
python3 -m http.server 8000
```

then open http://localhost:8000.

## Deploy on Vercel

The project is a static site, so Vercel serves the files as they are:

- **Framework Preset:** Other
- **Build Command:** none (leave empty)
- **Output Directory:** leave the default (the repository root)
- **Root Directory:** `./`

With the Vercel project connected to this GitHub repository, every push to `main` deploys automatically.

---
Made with Claude.
