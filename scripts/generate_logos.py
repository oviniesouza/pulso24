import os
import xml.etree.ElementTree as ET

# Output directories
DIR_PUBLIC = r"C:\Users\Micro\Desktop\Projetos Antigravity\Pulso 24\pulso24\public\brand"
DIR_ARTIFACT = r"C:\Users\Micro\.gemini\antigravity\brain\7e6a2863-1ecf-491f-a70c-541d9fc61cbb"

os.makedirs(DIR_PUBLIC, exist_ok=True)
os.makedirs(DIR_ARTIFACT, exist_ok=True)

# 1. STANDALONE ICON (Transparent Background, 512x512)
svg_icon_transparent = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="50%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#10B981" flood-opacity="0.45" />
    </filter>
    <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#06B6D4" flood-opacity="0.6" />
    </filter>
  </defs>

  <!-- Chat Bubble Body -->
  <path d="M51 61 L461 61 Q481 61 481 81 L481 358 Q481 378 461 378 L184 378 L97 455 L118 378 L51 378 Q31 378 31 358 L31 81 Q31 61 51 61 Z"
        fill="#111827"
        stroke="url(#emeraldGrad)"
        stroke-width="14"
        stroke-linejoin="round"
        filter="url(#emeraldGlow)" />

  <!-- Heartbeat / EKG Pulse Line -->
  <path d="M71 256 L153 256 L189 169 L225 338 L266 185 L307 307 L343 256 L441 256"
        stroke="url(#pulseGrad)"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        filter="url(#emeraldGlow)" />

  <!-- Cyan AI Dot -->
  <circle cx="441" cy="91" r="24" fill="#06B6D4" filter="url(#cyanGlow)" />
</svg>"""

# 2. APP ICON / AVATAR (With dark luxury background, 512x512)
svg_icon_app = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#05080E" />
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#10B981" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="50%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#10B981" flood-opacity="0.5" />
    </filter>
    <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#06B6D4" flood-opacity="0.7" />
    </filter>
  </defs>

  <!-- Luxury App Icon Rounded Container -->
  <rect width="512" height="512" rx="108" fill="url(#bgGrad)" stroke="#1F2937" stroke-width="2" />
  <circle cx="256" cy="256" r="220" fill="url(#centerGlow)" />

  <!-- Chat Bubble Body -->
  <path d="M66 76 L446 76 Q466 76 466 96 L466 353 Q466 373 446 373 L189 373 L107 445 L128 373 L66 373 Q46 373 46 353 L46 96 Q46 76 66 76 Z"
        fill="#111827"
        stroke="url(#emeraldGrad)"
        stroke-width="14"
        stroke-linejoin="round"
        filter="url(#emeraldGlow)" />

  <!-- Heartbeat Pulse Line -->
  <path d="M86 261 L163 261 L197 179 L231 338 L270 194 L309 309 L343 261 L426 261"
        stroke="url(#pulseGrad)"
        stroke-width="16"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        filter="url(#emeraldGlow)" />

  <!-- Cyan AI Dot -->
  <circle cx="426" cy="105" r="22" fill="#06B6D4" filter="url(#cyanGlow)" />
</svg>"""

# 3. COMPLETE HORIZONTAL LOGO (Dark Background, 1200x320)
svg_horizontal_dark = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" width="1200" height="320">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080B11" />
      <stop offset="100%" stop-color="#040609" />
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="50%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#10B981" flood-opacity="0.4" />
    </filter>
    <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#06B6D4" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="1200" height="320" fill="url(#bgGrad)" />

  <!-- Group: ICON (Scaled & Positioned at x=60, y=40, size=240x240) -->
  <g transform="translate(60, 40) scale(0.46875)">
    <!-- Chat Bubble Body -->
    <path d="M51 61 L461 61 Q481 61 481 81 L481 358 Q481 378 461 378 L184 378 L97 455 L118 378 L51 378 Q31 378 31 358 L31 81 Q31 61 51 61 Z"
          fill="#111827"
          stroke="url(#emeraldGrad)"
          stroke-width="16"
          stroke-linejoin="round"
          filter="url(#emeraldGlow)" />

    <!-- Pulse Line -->
    <path d="M71 256 L153 256 L189 169 L225 338 L266 185 L307 307 L343 256 L441 256"
          stroke="url(#pulseGrad)"
          stroke-width="18"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          filter="url(#emeraldGlow)" />

    <!-- Cyan Dot -->
    <circle cx="441" cy="91" r="26" fill="#06B6D4" filter="url(#cyanGlow)" />
  </g>

  <!-- Group: TYPOGRAPHY -->
  <g transform="translate(340, 0)">
    <!-- Main Brand Name -->
    <text x="0" y="175"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif"
          font-size="124"
          font-weight="900"
          letter-spacing="-2.5"
          fill="#FFFFFF">
      Pulso <tspan fill="url(#emeraldGrad)">24</tspan>
    </text>

    <!-- Subtitle / Positioning Tagline -->
    <text x="4" y="235"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif"
          font-size="25"
          font-weight="700"
          letter-spacing="9"
          fill="#9CA3AF">
      ATENDIMENTO 24/7 NO WHATSAPP COM IA
    </text>

    <!-- Small Accent Pill Tag -->
    <rect x="740" y="85" width="85" height="30" rx="4" fill="#10B981" fill-opacity="0.12" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.4" />
    <text x="782" y="105"
          text-anchor="middle"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Inter, sans-serif"
          font-size="12"
          font-weight="800"
          fill="#10B981"
          letter-spacing="1.5">
      PRO
    </text>
  </g>
</svg>"""

# 4. COMPLETE HORIZONTAL LOGO (Transparent Background, 1200x320)
svg_horizontal_transparent = svg_horizontal_dark.replace('<rect width="1200" height="320" fill="url(#bgGrad)" />', '<!-- Transparent background -->')

# 5. COMPLETE HORIZONTAL LOGO (Light Background for Documents / Proposals, 1200x320)
svg_horizontal_light = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" width="1200" height="320">
  <defs>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="50%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#059669" flood-opacity="0.25" />
    </filter>
  </defs>

  <rect width="1200" height="320" fill="#FFFFFF" />

  <!-- Group: ICON -->
  <g transform="translate(60, 40) scale(0.46875)">
    <!-- Chat Bubble Body -->
    <path d="M51 61 L461 61 Q481 61 481 81 L481 358 Q481 378 461 378 L184 378 L97 455 L118 378 L51 378 Q31 378 31 358 L31 81 Q31 61 51 61 Z"
          fill="#0B0F19"
          stroke="url(#emeraldGrad)"
          stroke-width="16"
          stroke-linejoin="round"
          filter="url(#subtleGlow)" />

    <!-- Pulse Line -->
    <path d="M71 256 L153 256 L189 169 L225 338 L266 185 L307 307 L343 256 L441 256"
          stroke="url(#pulseGrad)"
          stroke-width="18"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none" />

    <!-- Cyan Dot -->
    <circle cx="441" cy="91" r="26" fill="#06B6D4" />
  </g>

  <!-- Group: TYPOGRAPHY -->
  <g transform="translate(340, 0)">
    <!-- Main Brand Name -->
    <text x="0" y="175"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif"
          font-size="124"
          font-weight="900"
          letter-spacing="-2.5"
          fill="#0B0F19">
      Pulso <tspan fill="url(#emeraldGrad)">24</tspan>
    </text>

    <!-- Subtitle / Positioning Tagline -->
    <text x="4" y="235"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif"
          font-size="25"
          font-weight="700"
          letter-spacing="9"
          fill="#4B5563">
      ATENDIMENTO 24/7 NO WHATSAPP COM IA
    </text>

    <!-- Small Accent Pill Tag -->
    <rect x="740" y="85" width="85" height="30" rx="4" fill="#059669" fill-opacity="0.1" stroke="#059669" stroke-width="1.5" />
    <text x="782" y="105"
          text-anchor="middle"
          font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Inter, sans-serif"
          font-size="12"
          font-weight="800"
          fill="#059669"
          letter-spacing="1.5">
      PRO
    </text>
  </g>
</svg>"""

files = {
    "pulso24-logo-icon.svg": svg_icon_transparent,
    "pulso24-logo-icon-app.svg": svg_icon_app,
    "pulso24-logo-horizontal.svg": svg_horizontal_dark,
    "pulso24-logo-horizontal-transparent.svg": svg_horizontal_transparent,
    "pulso24-logo-horizontal-light.svg": svg_horizontal_light,
}

for filename, content in files.items():
    # Verify XML
    ET.fromstring(content)
    # Save to public/brand
    p_pub = os.path.join(DIR_PUBLIC, filename)
    with open(p_pub, "w", encoding="utf-8") as f:
        f.write(content)
    # Save to artifact directory
    p_art = os.path.join(DIR_ARTIFACT, filename)
    with open(p_art, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved: {filename} ({len(content)} bytes)")

print("All SVG logos generated and verified successfully!")
