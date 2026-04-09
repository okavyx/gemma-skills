# Gemma Skills

Skills for Google AI Edge Gallery's Gemma on-device models. Each skill is in its own subdirectory.

## Adding to AI Edge Gallery

1. Go to the Agent Skills use case with Gemma
2. Tap the **Skills** chip → **(+)**
3. Select **Load skill from URL**
4. Enter `https://okavyx.github.io/gemma-skills/web-fetch/` (or the skill's URL)
5. The skill will be added to your device

## Skills

### web-fetch
Fetches live content from any URL. Use when Gemma needs up-to-date information beyond its training cutoff.

**URL:** `https://okavyx.github.io/gemma-skills/web-fetch/`

## Adding new skills

Each skill is self-contained in its own directory:

```
gemma-skills/
├── web-fetch/
│   ├── SKILL.md
│   └── scripts/
│       └── index.html
├── another-skill/
│   ├── SKILL.md
│   └── scripts/
│       └── index.html
└── README.md
```

**Requirements for a skill:**
- `SKILL.md` in the root of the skill directory
- `scripts/index.html` with `window['ai_edge_gallery_get_result']` defined
- `.nojekyll` in the repo root (prevents GitHub Pages from converting `.md` to `.html`)

## Hosting

This repo is deployed via GitHub Pages. The site URL is:
`https://okavyx.github.io/gemma-skills/`