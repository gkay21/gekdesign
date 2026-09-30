# Case study mock-ups

Regenerates the case study hero images in `src/assets/images/` from the real client websites.
Re-run when a client site changes.

```bash
pnpm exec playwright install chromium        # once
pip install pillow numpy                     # once

node scripts/mockups/capture.mjs             # screenshots -> scripts/mockups/.cache/ (git-ignored)
python3 scripts/mockups/build.py             # composites -> src/assets/images/*.jpg (2400px wide)

# or just one image
node scripts/mockups/capture.mjs vodafone && python3 scripts/mockups/build.py vodafone
```

| Image | Website | Scene |
|---|---|---|
| `project_fairfield_dental_care_office.jpg` | fairfielddentalcare.com.au | Office monitor from `project_fairfield_dental_care_1790327371933.jpg` |
| `project_miniminds_stacked.jpg` | minimindselc.com.au (full page) | Two overlapping pages on a textured backdrop |
| `project_unibet_glass.jpg` | unibet.com.au (cookie banner hidden, not accepted) | Glass display from `project_minimal_luxury_ecommerce_1790321313977.jpg` |
| `project_stan_desk.jpg` | stan.com.au | Unsplash `jLn20MzqfdE` |
| `project_vodafone_desk.jpg` | vodafone.com.au/mobile-phones, **archived Feb 2021** (Wayback Machine) | Unsplash `gVpXbCGG6jI` |
| `project_jira_window.jpg` | Atlassian's public Ecosystem Jira (people's names and avatars blurred) | App window from `project_fintech_saas_platform_1790321328026.jpg` |

Notes:
- Unsplash photos are downloaded on demand under the [Unsplash License](https://unsplash.com/license) (free, commercial use, no attribution required). Don't use Unsplash+ (premium) photos.
- Screen corners are measured to sub-pixel accuracy and pushed slightly into the bezel. If you change a scene, re-measure the corners and zoom into every edge: a thin light line means the photo's original screen is showing.
- Each capture viewport matches the aspect ratio of the screen it lands on, so nothing is stretched.
- The scene source images above are no longer used by the site directly; keep them for this script.
