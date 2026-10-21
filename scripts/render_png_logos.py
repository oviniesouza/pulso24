import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

DIR_PUBLIC = r"C:\Users\Micro\Desktop\Projetos Antigravity\Pulso 24\pulso24\public\brand"
DIR_ARTIFACT = r"C:\Users\Micro\.gemini\antigravity\brain\7e6a2863-1ecf-491f-a70c-541d9fc61cbb"

# Colors
BG_DARK = (8, 11, 17, 255)
CARD_BG = (17, 24, 39, 255)
EMERALD = (16, 185, 129, 255)
EMERALD_BRIGHT = (52, 211, 153, 255)
CYAN = (6, 182, 212, 255)
WHITE = (255, 255, 255, 255)
MUTED = (156, 163, 175, 255)

# -------------------------------------------------------------
# 1. RENDER 1024x1024 APP ICON PNG
# -------------------------------------------------------------
SIZE = 1024
scale = SIZE / 512.0

img_icon = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img_icon)

# Draw Rounded Box container
draw.rounded_rectangle([20, 20, SIZE - 20, SIZE - 20], radius=int(180 * scale), fill=BG_DARK, outline=(31, 41, 55, 255), width=int(4 * scale))

# Glow Layer
glow_img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_img)

# Scaled coordinates for bubble
# Bubble: M66 76 L446 76 Q466 76 466 96 L466 353 Q466 373 446 373 L189 373 L107 445 L128 373 L66 373 Q46 373 46 353 L46 96 Q46 76 66 76 Z
bubble_pts = [
    (int(66 * scale), int(76 * scale)),
    (int(446 * scale), int(76 * scale)),
    (int(466 * scale), int(96 * scale)),
    (int(466 * scale), int(353 * scale)),
    (int(446 * scale), int(373 * scale)),
    (int(189 * scale), int(373 * scale)),
    (int(107 * scale), int(445 * scale)),
    (int(128 * scale), int(373 * scale)),
    (int(66 * scale), int(373 * scale)),
    (int(46 * scale), int(353 * scale)),
    (int(46 * scale), int(96 * scale)),
    (int(66 * scale), int(76 * scale)),
]

glow_draw.polygon(bubble_pts, outline=(16, 185, 129, 120), width=int(32 * scale))
glow_img = glow_img.filter(ImageFilter.GaussianBlur(int(16 * scale)))
img_icon = Image.alpha_composite(img_icon, glow_img)

draw = ImageDraw.Draw(img_icon)
draw.polygon(bubble_pts, fill=CARD_BG, outline=EMERALD, width=int(14 * scale))

# Pulse Line Points:
# M86 261 L163 261 L197 179 L231 338 L270 194 L309 309 L343 261 L426 261
pulse_pts = [
    (int(86 * scale), int(261 * scale)),
    (int(163 * scale), int(261 * scale)),
    (int(197 * scale), int(179 * scale)),
    (int(231 * scale), int(338 * scale)),
    (int(270 * scale), int(194 * scale)),
    (int(309 * scale), int(309 * scale)),
    (int(343 * scale), int(261 * scale)),
    (int(426 * scale), int(261 * scale)),
]

# Draw pulse glow
pulse_glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
pg_draw = ImageDraw.Draw(pulse_glow)
pg_draw.line(pulse_pts, fill=(52, 211, 153, 200), width=int(32 * scale), joint="round")
pulse_glow = pulse_glow.filter(ImageFilter.GaussianBlur(int(12 * scale)))
img_icon = Image.alpha_composite(img_icon, pulse_glow)

draw = ImageDraw.Draw(img_icon)
draw.line(pulse_pts, fill=EMERALD_BRIGHT, width=int(16 * scale), joint="round")

# AI Cyan Dot
dot_center = (int(426 * scale), int(105 * scale))
dot_r = int(22 * scale)
draw.ellipse([dot_center[0] - dot_r, dot_center[1] - dot_r, dot_center[0] + dot_r, dot_center[1] + dot_r], fill=CYAN)

# -------------------------------------------------------------
# 2. RENDER HORIZONTAL BANNER (1200x400)
# -------------------------------------------------------------
W_BAN, H_BAN = 1200, 400
img_banner = Image.new("RGBA", (W_BAN, H_BAN), BG_DARK)

# Resize Icon for banner left side
icon_sub = img_icon.crop((20, 20, SIZE - 20, SIZE - 20)).resize((260, 260), Image.Resampling.LANCZOS)
img_banner.paste(icon_sub, (70, 70), icon_sub)

draw_b = ImageDraw.Draw(img_banner)

# Try font loading, else fallback to standard default fonts
font_title = None
font_sub = None
font_paths = [
    r"C:\Windows\Fonts\Inter-Bold.ttf",
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\arial.ttf",
]
for fp in font_paths:
    if os.path.exists(fp):
        try:
            font_title = ImageFont.truetype(fp, 110)
            font_sub = ImageFont.truetype(fp, 26)
            break
        except Exception:
            pass

if not font_title:
    font_title = ImageFont.load_default()
    font_sub = ImageFont.load_default()

# Draw "Pulso 24"
draw_b.text((370, 100), "Pulso ", fill=WHITE, font=font_title)
pulso_w = draw_b.textlength("Pulso ", font=font_title)
draw_b.text((370 + pulso_w, 100), "24", fill=EMERALD_BRIGHT, font=font_title)

# Draw Subtitle
draw_b.text((375, 230), "ATENDIMENTO 24/7 NO WHATSAPP COM IA", fill=MUTED, font=font_sub)

# Save PNGs to public/brand and artifact directory
for dest in [DIR_PUBLIC, DIR_ARTIFACT]:
    img_icon.save(os.path.join(dest, "pulso24-logo-icon.png"), "PNG")
    img_banner.save(os.path.join(dest, "pulso24-logo-banner.png"), "PNG")

print("Generated pulso24-logo-icon.png and pulso24-logo-banner.png successfully!")
