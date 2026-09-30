"""Builds the case study mock-up images from screenshots captured by capture.mjs.

Usage: python3 scripts/mockups/build.py [name ...]   (no names = build everything)
Requires: pip install pillow numpy   (and screenshots in scripts/mockups/.cache/)
Output: 2x-resolution JPGs in src/assets/images/ (filenames are imported by src/data/projects.ts).
"""
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
IMAGES = ROOT / 'src' / 'assets' / 'images'
CACHE = Path(__file__).resolve().parent / '.cache'
SUPERSAMPLE = 4  # warp at 4x then downscale, so text and edges stay smooth
JPEG = dict(quality=88, optimize=True, progressive=True)


# --- helpers ---------------------------------------------------------------------------------

def perspective_coeffs(dst, src):
    """PIL PERSPECTIVE coefficients mapping output points (dst quad) to input points (src rect)."""
    a, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        a.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        a.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(a, float), np.array(b, float)).tolist()


def glare(size, strength=0.10):
    """Soft diagonal reflection, strongest top-left, like light on a screen."""
    w, h = size
    g = np.linspace(1, 0, w)[None, :] * np.linspace(1, 0.2, h)[:, None]
    return Image.fromarray((g * 255 * strength).astype('uint8'), 'L')


def screen_treatment(shot, dim):
    """Screens photograph slightly darker than raw pixels, with a faint reflection."""
    shot = Image.eval(shot.convert('RGB'), lambda v: int(v * dim))
    return Image.composite(Image.new('RGB', shot.size, 'white'), shot, glare(shot.size))


def place_on_screen(bg, shot, quad, dim=0.95, keep=None):
    """Warp `shot` onto the screen `quad` (TL, TR, BR, BL in bg pixels), anti-aliased via supersampling.
    `keep` restores a box of the original photo on top (e.g. a webcam overlapping the bezel)."""
    ss = SUPERSAMPLE
    shot = screen_treatment(shot, dim)
    w, h = shot.size
    x0, y0 = int(min(p[0] for p in quad)) - 4, int(min(p[1] for p in quad)) - 4
    x1, y1 = int(max(p[0] for p in quad)) + 4, int(max(p[1] for p in quad)) + 4
    bw, bh = x1 - x0, y1 - y0
    c = perspective_coeffs([((x - x0) * ss, (y - y0) * ss) for x, y in quad], [(0, 0), (w, 0), (w, h), (0, h)])
    warped = shot.transform((bw * ss, bh * ss), Image.PERSPECTIVE, c, Image.BICUBIC).resize((bw, bh), Image.LANCZOS)
    mask = Image.new('L', shot.size, 255).transform((bw * ss, bh * ss), Image.PERSPECTIVE, c, Image.BILINEAR)
    mask = mask.resize((bw, bh), Image.LANCZOS)
    original = bg.copy()
    bg.paste(Image.composite(warped, bg.crop((x0, y0, x1, y1)), mask), (x0, y0))
    if keep:
        bg.paste(original.crop(keep), keep[:2])
    return bg


def unsplash(photo_id, width=3200):
    """Download a free Unsplash photo (Unsplash License) into the cache."""
    path = CACHE / f'{photo_id}_{width}.jpg'
    if not path.exists():
        url = f'https://unsplash.com/photos/{photo_id}/download?force=true&w={width}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as r:
            path.write_bytes(r.read())
    return Image.open(path).convert('RGB')


def local_scene(filename, scale=2):
    """An original 1200px scene from src/assets/images, upscaled to 2x output resolution."""
    img = Image.open(IMAGES / filename).convert('RGB')
    return img.resize((img.width * scale, img.height * scale), Image.LANCZOS)


def shot(name):
    path = CACHE / f'{name}.png'
    if not path.exists():
        sys.exit(f'Missing {path} - run: node scripts/mockups/capture.mjs {name}')
    return Image.open(path).convert('RGB')


def scaled(points, k):
    return [(x * k, y * k) for x, y in points]


# --- one builder per case study image -----------------------------------------------------------
# Screen corners were measured to sub-pixel accuracy and padded ~0.5-2.5px into the bezel so none
# of the photo's original screen shows around the edges. Coordinates are in the units noted.

def fairfield():
    # Office scene from the original mock-up; screen corners in its 1200px coordinates.
    bg = local_scene('project_fairfield_dental_care_1790327371933.jpg')
    quad = [(292.6, 216.6), (907.0, 216.6), (907.0, 579.8), (292.6, 579.8)]
    return place_on_screen(bg, shot('fairfield'), scaled(quad, 2), dim=0.96)


def unibet():
    # Glass display from the original Chronos scene; corners in its 1200px coordinates.
    bg = local_scene('project_minimal_luxury_ecommerce_1790321313977.jpg')
    quad = [(298.0, 162.6), (915.0, 176.0), (915.0, 685.0), (298.0, 722.6)]
    return place_on_screen(bg, shot('unibet'), scaled(quad, 2), dim=0.95)


def stan():
    # Warm window-lit desk, Unsplash jLn20MzqfdE; corners in 1600px coordinates, photo at 3200px.
    bg = unsplash('jLn20MzqfdE')
    quad = [(555.5, 349.5), (1130, 345.5), (1130, 699), (555.5, 673)]
    out = place_on_screen(bg, shot('stan'), scaled(quad, 2), dim=0.92)
    return out.crop((466, 300, 2866, 2100))


def vodafone():
    # Minimal white desk, Unsplash gVpXbCGG6jI; corners in 1600px coordinates, photo at 3200px.
    bg = unsplash('gVpXbCGG6jI')
    quad = [(451.59, 236.0), (1099.45, 262.18), (1099.45, 651.93), (456.55, 691.47)]
    out = place_on_screen(bg, shot('vodafone'), scaled(quad, 2), dim=0.96)
    return out.crop((240, 200, 2640, 2000))


def jira():
    # Floating app window on a teal glow, from the original Strata scene (flat, rounded corners).
    bg = local_scene('project_fintech_saas_platform_1790321328026.jpg')
    x0, y0, x1, y1 = 60 * 2, 64 * 2, 1140 * 2, 832 * 2
    w, h = x1 - x0, y1 - y0
    screenshot = shot('jira').resize((w, h), Image.LANCZOS)
    radius, ss = 20, SUPERSAMPLE
    rounded = Image.new('L', (w * ss, h * ss), 0)
    ImageDraw.Draw(rounded).rounded_rectangle((0, 0, w * ss - 1, h * ss - 1), radius * ss, fill=255)
    bg.paste(screenshot, (x0, y0), rounded.resize((w, h), Image.LANCZOS))
    border = Image.new('L', (w * ss, h * ss), 0)
    ImageDraw.Draw(border).rounded_rectangle((0, 0, w * ss - 1, h * ss - 1), radius * ss, outline=255, width=2 * ss)
    bg.paste(Image.new('RGB', (w, h), 'white'), (x0, y0), border.resize((w, h), Image.LANCZOS).point(lambda v: int(v * 0.25)))
    return bg


def miniminds():
    # Two overlapping full-page captures on a warm textured backdrop (Studio Aeterna style).
    k, src_scale = 2, 2
    width, height = 1200 * k, 896 * k
    rng = np.random.default_rng(7)
    yy, xx = np.mgrid[0:height, 0:width]
    light = 1 + 0.035 * (1 - (xx / width) * 0.6 - (yy / height) * 0.4)
    base = np.ones((height, width, 3)) * np.array((212, 202, 190), float)
    pixels = np.clip(base * light[..., None] + rng.normal(0, 2.2, (height, width, 1)), 0, 255).astype('uint8')
    canvas = Image.fromarray(pixels).filter(ImageFilter.GaussianBlur(0.6))
    full = shot('miniminds')

    def page(css_box, width_px):
        crop = full.crop(tuple(v * src_scale for v in css_box))
        return crop.resize((width_px, round(crop.height * width_px / crop.width)), Image.LANCZOS)

    def drop(img, pos):
        shadow = Image.new('L', canvas.size, 0)
        sx, sy = pos[0], pos[1] + 10 * k
        shadow.paste(int(255 * 0.28), (sx, sy, sx + img.width, sy + img.height))
        canvas.paste(Image.new('RGB', canvas.size, (70, 55, 40)), (0, 0), shadow.filter(ImageFilter.GaussianBlur(22 * k)))
        canvas.paste(img, pos)

    back = page((490, 3290, 1440, 5120), 440 * k)  # right-hand part of the Programs section
    drop(back, (701 * k, 846 * k - back.height))
    drop(page((0, 0, 1440, 1900), 667 * k), (59 * k, 57 * k))  # hero + welcome section
    return canvas


BUILDS = {
    'fairfield': (fairfield, 'project_fairfield_dental_care_office.jpg'),
    'unibet': (unibet, 'project_unibet_glass.jpg'),
    'stan': (stan, 'project_stan_desk.jpg'),
    'vodafone': (vodafone, 'project_vodafone_desk.jpg'),
    'jira': (jira, 'project_jira_window.jpg'),
    'miniminds': (miniminds, 'project_miniminds_stacked.jpg'),
}

if __name__ == '__main__':
    CACHE.mkdir(exist_ok=True)
    names = sys.argv[1:] or list(BUILDS)
    unknown = [n for n in names if n not in BUILDS]
    if unknown:
        sys.exit(f'Unknown: {", ".join(unknown)}. Available: {", ".join(BUILDS)}')
    for name in names:
        builder, filename = BUILDS[name]
        image = builder()
        image.save(IMAGES / filename, **JPEG)
        print(f'built {name} -> src/assets/images/{filename} ({image.width}x{image.height})')
