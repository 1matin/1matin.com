## Project Overview

Single-file Python static site generator (`build.py`). Parses Markdown posts with YAML frontmatter and renders HTML via Jinja2 templates. Deployed to GitHub Pages on push to `master`.

- `build.py` — self-contained generator (no extra modules)
- `posts/` — Markdown posts with YAML frontmatter (`title`, `date`, `lastmod`, optional `description`)
- `templates/` — `index.html` (post listing) and `post.html` (single post)
- `build/` — output directory with `styles.css`, `profanity.js`. Generated HTML is gitignored.
- `.github/workflows/deploy.yml` — CI/CD deploys on push to `master`

## Build & Verify

```bash
python3 build.py                    # generate site
python3 -m http.server -d build/    # preview locally
```

Dependencies: `pyyaml`, `markdown-it-py`, `jinja2`. No automated tests. Manually verify output by inspecting `build/` and checking post listing, navigation, and profanity toggle.

Use playwright-cli for summoning a real browser for testing. Always open in headed mode `--headed`.
Run `playwright-cli open` commands with `require_escalated` approval. Subsequent `playwright-cli` commands can normally run without escalation; if one is blocked, request escalated approval for that command too. Always close the playwright browser before finishing your response. DO NOT ASK USER FOR APPROVAL FOR CLOSING PLAYWRIGHT!
In order to test or observe a behavior, use `playwright-cli` to take screenshots and view them. Save screenshots to the `.playwright-cli/` folder in project's root.

Use `.venv` for running Python. NEVER USE SYSTEM PYTHON! It will fail.

## Behavioral Guidelines

**Tradeoff:** These bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If something is unclear, stop and ask. Push back when a simpler approach exists.

### 2. Simplicity First

Minimum code that solves the problem. Nothing speculative:

- No features beyond what was asked
- No abstractions for single-use code
- No error handling for impossible scenarios
- Keep `build.py` self-contained — no extra modules

If you write 200 lines and it could be 50, rewrite it.

### 3. Surgical Changes

Touch only what you must:

- Don't refactor adjacent code, comments, or formatting
- Match existing style (PEP 8 for Python, hand-written CSS mirroring Tailwind class names)
- Remove imports/variables/functions that YOUR changes made unused
- Don't delete pre-existing dead code unless asked

### 4. Goal-Driven Execution

Transform tasks into verifiable goals. For multi-step work, state a brief plan with verification at each step:

1. [Step] → verify: [check]
2. [Step] → verify: [check]

**Verification for this project:** Run `python3 build.py`, inspect `build/` output, confirm pages render correctly.

## Conventions

- **Python:** PEP 8, self-contained in `build.py`
- **CSS:** Plain hand-written in `build/styles.css`, class names mirror Tailwind utilities
- **Templates:** Jinja2, minimal logic — data prep lives in `build.py`
- **Posts:** YAML frontmatter in `---` blocks, custom `||nsfw||sfw||` profanity toggle
- **Commits:** Short, lowercase, descriptive (e.g., "add profanity toggle")

---

**These guidelines are working if:** unnecessary changes stay out of diffs, rewrites from overcomplication don't happen, and clarifying questions come before implementation rather than after mistakes.
