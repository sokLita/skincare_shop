<template>
  <div class="circular-hero-wrapper">
    <div class="circular-frame">
      <!-- Ambient glow behind the circle -->
      <div class="ambient-glow"></div>

      <svg
        class="product-art"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Premium skincare products on marble surface"
      >
        <!-- ===== DEFS ===== -->
        <defs>
          <!-- Light leak gradient -->
          <radialGradient id="lightLeak" cx="0.25" cy="0.15" r="0.7">
            <stop offset="0%" stop-color="#fffbe6" stop-opacity="0.35" />
            <stop offset="50%" stop-color="#fff5d6" stop-opacity="0.08" />
            <stop offset="100%" stop-color="transparent" stop-opacity="0" />
          </radialGradient>

          <!-- Marble gradient -->
          <linearGradient id="marbleTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f5efe6" />
            <stop offset="25%" stop-color="#faf5ed" />
            <stop offset="50%" stop-color="#f0eade" />
            <stop offset="70%" stop-color="#f8f2e8" />
            <stop offset="100%" stop-color="#efe9dd" />
          </linearGradient>

          <radialGradient id="marbleVein" cx="0.3" cy="0.4" r="0.5">
            <stop offset="0%" stop-color="#e8e0d4" stop-opacity="0.5" />
            <stop offset="100%" stop-color="transparent" stop-opacity="0" />
          </radialGradient>

          <!-- Glass body gradient -->
          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="rgba(255,255,255,0.85)" />
            <stop offset="30%" stop-color="rgba(255,255,255,0.95)" />
            <stop offset="60%" stop-color="rgba(248,245,240,0.92)" />
            <stop offset="100%" stop-color="rgba(240,237,230,0.8)" />
          </linearGradient>

          <!-- Serum liquid -->
          <linearGradient id="serumLiquid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#f5d6a8" stop-opacity="0.8" />
            <stop offset="40%" stop-color="#f5e0b8" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#fae8c8" stop-opacity="0.3" />
          </linearGradient>

          <!-- Glass highlight -->
          <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="white" stop-opacity="0.5" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </linearGradient>

          <!-- Tube gradient -->
          <linearGradient id="tubeBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f2c4c4" />
            <stop offset="25%" stop-color="#fad4d4" />
            <stop offset="50%" stop-color="#fce8e8" />
            <stop offset="75%" stop-color="#fad4d4" />
            <stop offset="100%" stop-color="#edb8b8" />
          </linearGradient>

          <linearGradient id="tubeCap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#e5b0b0" />
            <stop offset="50%" stop-color="#f0c4c4" />
            <stop offset="100%" stop-color="#d8a4a4" />
          </linearGradient>

          <!-- Jar lid gradient -->
          <linearGradient id="jarLid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f5d0d0" />
            <stop offset="50%" stop-color="#e8b8b8" />
            <stop offset="100%" stop-color="#d4a0a0" />
          </linearGradient>

          <!-- Jar body -->
          <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="rgba(255,255,255,0.9)" />
            <stop offset="30%" stop-color="white" />
            <stop offset="70%" stop-color="white" />
            <stop offset="100%" stop-color="rgba(248,245,240,0.85)" />
          </linearGradient>

          <!-- Jar cream -->
          <linearGradient id="jarCream" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#fae8d8" />
            <stop offset="60%" stop-color="#fdf0e4" />
            <stop offset="100%" stop-color="#fff5ea" />
          </linearGradient>

          <!-- Leaf gradients -->
          <linearGradient id="leafDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7aad84" />
            <stop offset="100%" stop-color="#5a8d64" />
          </linearGradient>
          <linearGradient id="leafLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#a8d5ba" />
            <stop offset="100%" stop-color="#8ab894" />
          </linearGradient>
          <linearGradient id="leafMid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#90c89e" />
            <stop offset="100%" stop-color="#6aaa7a" />
          </linearGradient>

          <!-- Shadow filter -->
          <filter id="productShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feOffset dx="2" dy="6" result="offsetBlur" />
            <feComponentTransfer result="shadow">
              <feFuncA type="linear" slope="0.12" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset dx="1" dy="3" in="blur" result="offsetblur" />
            <feComponentTransfer in="offsetblur" result="shadow">
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <!-- Circular clip -->
          <clipPath id="circleClip">
            <circle cx="250" cy="250" r="248" />
          </clipPath>

          <!-- Beige background gradient -->
          <radialGradient id="bgGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stop-color="#faf3eb" />
            <stop offset="60%" stop-color="#f5ede4" />
            <stop offset="100%" stop-color="#ede3d8" />
          </radialGradient>

          <!-- Sunlight radial -->
          <radialGradient id="sunlight" cx="0.2" cy="0.1" r="0.6">
            <stop offset="0%" stop-color="white" stop-opacity="0.4" />
            <stop offset="40%" stop-color="#fffbe6" stop-opacity="0.08" />
            <stop offset="100%" stop-color="transparent" stop-opacity="0" />
          </radialGradient>

          <!-- Reflection gradient -->
          <linearGradient id="reflection" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="white" stop-opacity="0.15" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </linearGradient>

          <!-- Flower petal -->
          <radialGradient id="petalPink" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stop-color="#fce8e8" />
            <stop offset="100%" stop-color="#f5d5d5" stop-opacity="0.6" />
          </radialGradient>
        </defs>

        <!-- ===== CIRCLE BACKGROUND ===== -->
        <g clip-path="url(#circleClip)">
          <rect x="0" y="0" width="500" height="500" fill="url(#bgGrad)" />

          <!-- Sunlight beam from top-left -->
          <rect x="0" y="0" width="500" height="500" fill="url(#sunlight)" />

          <!-- Subtle light streak -->
          <ellipse cx="120" cy="80" rx="200" ry="100" fill="white" opacity="0.08" transform="rotate(-25 120 80)" />

          <!-- Background warm glow -->
          <ellipse cx="250" cy="250" rx="200" ry="200" fill="rgba(255,235,220,0.08)" />

          <!-- ===== MARBLE SURFACE ===== -->
          <g filter="url(#dropShadow)">
            <!-- Main marble surface -->
            <ellipse cx="250" cy="385" rx="175" ry="28" fill="url(#marbleTop)" />
            <!-- Marble veins -->
            <ellipse cx="240" cy="383" rx="160" ry="22" fill="url(#marbleVein)" />
            <!-- Subtle vein lines -->
            <path d="M120 382 C160 378 200 386 240 380 C280 374 320 384 360 378" stroke="#e8e0d4" stroke-width="0.5" opacity="0.3" fill="none" />
            <path d="M140 388 C180 384 220 392 260 386 C300 380 340 390 370 384" stroke="#e8e0d4" stroke-width="0.3" opacity="0.2" fill="none" />
            <!-- Marble front edge -->
            <ellipse cx="250" cy="392" rx="170" ry="12" fill="rgba(240,234,226,0.3)" />
          </g>

          <!-- ===== SUNLIGHT SPOT ON MARBLE ===== -->
          <ellipse cx="180" cy="380" rx="60" ry="12" fill="white" opacity="0.08" />

          <!-- ===== BOTANICAL LEAVES (behind products) ===== -->

          <!-- Large leaf bottom-left -->
          <g filter="url(#dropShadow)">
            <path d="M95 370 C85 340 70 310 65 285 C60 265 68 248 82 240 C96 232 110 240 115 258 C120 276 112 305 105 330 C100 348 98 360 95 370 Z" fill="url(#leafDark)" opacity="0.7" />
            <path d="M95 370 C90 345 78 315 75 290 C72 270 80 252 90 246" stroke="#5a8d64" stroke-width="0.6" opacity="0.3" fill="none" />
            <path d="M95 370 L95 246" stroke="#6a9a74" stroke-width="0.4" opacity="0.15" fill="none" />
          </g>

          <!-- Medium leaf bottom-right -->
          <g filter="url(#dropShadow)">
            <path d="M400 365 C410 338 425 310 428 288 C430 270 425 252 412 246 C399 240 388 248 384 264 C380 280 385 308 392 332 C396 348 398 358 400 365 Z" fill="url(#leafLight)" opacity="0.65" />
            <path d="M400 365 L400 248" stroke="#8ab894" stroke-width="0.4" opacity="0.15" fill="none" />
          </g>

          <!-- Small leaf top-left -->
          <g filter="url(#dropShadow)">
            <path d="M115 180 C105 160 92 142 88 128 C84 114 90 102 100 98 C110 94 120 102 124 114 C128 126 122 150 118 166 C116 174 115 178 115 180 Z" fill="url(#leafMid)" opacity="0.55" />
          </g>

          <!-- Small leaf top-right -->
          <g filter="url(#dropShadow)">
            <path d="M390 200 C400 180 412 162 415 148 C418 134 413 122 403 118 C393 114 384 122 380 134 C376 146 382 170 386 186 C388 194 389 198 390 200 Z" fill="url(#leafLight)" opacity="0.5" />
          </g>

          <!-- Tiny accent leaf far left -->
          <g filter="url(#dropShadow)">
            <path d="M80 260 C72 242 62 228 60 218 C58 208 64 200 72 198 C80 196 88 204 90 214 C92 224 86 244 82 256 C80 260 80 260 80 260 Z" fill="url(#leafDark)" opacity="0.4" />
          </g>

          <!-- Tiny accent leaf far right -->
          <g filter="url(#dropShadow)">
            <path d="M418 280 C426 262 436 248 438 238 C440 228 434 220 426 218 C418 216 410 224 408 234 C406 244 412 264 416 276 C418 280 418 280 418 280 Z" fill="url(#leafMid)" opacity="0.45" />
          </g>

          <!-- ===== SMALL FLOWERS ===== -->
          <!-- Flower bottom-left -->
          <g>
            <circle cx="130" cy="348" r="6" fill="url(#petalPink)" opacity="0.7" />
            <circle cx="130" cy="342" r="5.5" fill="url(#petalPink)" opacity="0.6" />
            <circle cx="135" cy="348" r="5.5" fill="url(#petalPink)" opacity="0.6" />
            <circle cx="125" cy="348" r="5.5" fill="url(#petalPink)" opacity="0.6" />
            <circle cx="130" cy="354" r="5.5" fill="url(#petalPink)" opacity="0.6" />
            <circle cx="130" cy="348" r="3" fill="#f5e6c8" opacity="0.8" />
          </g>

          <!-- Flower bottom-right -->
          <g>
            <circle cx="370" cy="358" r="5" fill="url(#petalPink)" opacity="0.65" />
            <circle cx="370" cy="353" r="4.5" fill="url(#petalPink)" opacity="0.55" />
            <circle cx="374" cy="358" r="4.5" fill="url(#petalPink)" opacity="0.55" />
            <circle cx="366" cy="358" r="4.5" fill="url(#petalPink)" opacity="0.55" />
            <circle cx="370" cy="363" r="4.5" fill="url(#petalPink)" opacity="0.55" />
            <circle cx="370" cy="358" r="2.5" fill="#f5e6c8" opacity="0.8" />
          </g>

        </g><!-- End circle clip -->

        <!-- ===== SERUM BOTTLE (left) ===== -->
        <g filter="url(#productShadow)" clip-path="url(#circleClip)">
          <!-- Bottle shadow on marble -->
          <ellipse cx="185" cy="380" rx="22" ry="5" fill="rgba(0,0,0,0.06)" />

          <!-- Bottle body -->
          <rect x="173" y="290" width="30" height="84" rx="4" fill="url(#glassBody)" />

          <!-- Liquid inside -->
          <rect x="173" y="330" width="30" height="44" rx="4" fill="url(#serumLiquid)" />
          <!-- Liquid meniscus -->
          <ellipse cx="188" cy="330" rx="14" ry="2" fill="#f5d6a8" opacity="0.4" />

          <!-- Glass highlight stripe left -->
          <rect x="176" y="294" width="5" height="76" rx="2" fill="url(#glassHighlight)" />

          <!-- Glass edge reflection right -->
          <rect x="198" y="294" width="1.5" height="76" rx="0.75" fill="white" opacity="0.15" />

          <!-- Bottle cap/neck area -->
          <rect x="180" y="282" width="16" height="10" rx="2" fill="rgba(255,255,255,0.7)" stroke="#e0d8d0" stroke-width="0.3" />
          <!-- Cap -->
          <rect x="178" y="272" width="20" height="12" rx="3" fill="#d4c8b8" />
          <rect x="179" y="273" width="6" height="10" rx="2" fill="rgba(255,255,255,0.25)" />
          <rect x="186" y="273" width="10" height="10" rx="2" fill="rgba(0,0,0,0.03)" />

          <!-- Dropper -->
          <rect x="185" y="260" width="6" height="14" rx="1" fill="#c8c0b8" />
          <!-- Dropper rubber bulb -->
          <ellipse cx="188" cy="256" rx="7" ry="6" fill="#3a3a3a" />
          <ellipse cx="188" cy="254" rx="4" ry="3" fill="#4a4a4a" opacity="0.5" />
          <!-- Dropper highlight -->
          <ellipse cx="186" cy="254" rx="2" ry="1.5" fill="rgba(255,255,255,0.1)" />

          <!-- Label on bottle -->
          <rect x="176" y="310" width="24" height="22" rx="1" fill="rgba(255,255,255,0.6)" />
          <text x="188" y="320" text-anchor="middle" font-size="3.8" font-weight="600" fill="#7a8a7a" font-family="Inter, sans-serif" letter-spacing="0.5">GLOW</text>
          <text x="188" y="326" text-anchor="middle" font-size="3.2" font-weight="400" fill="#8a9a8a" font-family="Inter, sans-serif">SERUM</text>

          <!-- Glass bottom reflection -->
          <ellipse cx="188" cy="374" rx="13" ry="3" fill="rgba(255,255,255,0.2)" />

          <!-- Sparkle -->
          <circle cx="180" cy="300" r="1.5" fill="white" opacity="0.6" filter="url(#softGlow)" />
        </g>

        <!-- ===== MOISTURIZER TUBE (right) ===== -->
        <g filter="url(#productShadow)" clip-path="url(#circleClip)">
          <!-- Shadow -->
          <ellipse cx="290" cy="382" rx="18" ry="4" fill="rgba(0,0,0,0.05)" />

          <!-- Tube body -->
          <path d="M276 380 L276 316 C276 306 280 300 290 300 C300 300 304 306 304 316 L304 380 Z" fill="url(#tubeBody)" />
          <!-- Tube body subtle gradient overlay for roundness -->
          <path d="M276 380 L276 316 C276 306 280 300 290 300 C300 300 304 306 304 316 L304 380 Z" fill="rgba(255,255,255,0.15)" />

          <!-- Tube highlight strip -->
          <rect x="282" y="302" width="4" height="76" rx="2" fill="rgba(255,255,255,0.25)" />

          <!-- Tube shadow side -->
          <rect x="296" y="302" width="3" height="76" rx="1.5" fill="rgba(0,0,0,0.04)" />

          <!-- Tube cap -->
          <rect x="282" y="292" width="16" height="12" rx="3" fill="url(#tubeCap)" />
          <rect x="283" y="293" width="5" height="10" rx="2" fill="rgba(255,255,255,0.2)" />

          <!-- Label on tube -->
          <rect x="279" y="320" width="22" height="18" rx="1" fill="rgba(255,255,255,0.5)" />
          <text x="290" y="329" text-anchor="middle" font-size="3.8" font-weight="600" fill="#c08080" font-family="Inter, sans-serif" letter-spacing="0.3">RADIANT</text>
          <text x="290" y="335" text-anchor="middle" font-size="2.8" font-weight="400" fill="#c09090" font-family="Inter, sans-serif">CREAM</text>

          <!-- Tube bottom curve -->
          <ellipse cx="290" cy="380" rx="14" ry="3" fill="#edb8b8" opacity="0.3" />

          <!-- Tiny sparkle -->
          <circle cx="285" cy="310" r="1" fill="white" opacity="0.5" filter="url(#softGlow)" />
        </g>

        <!-- ===== CREAM JAR (center-right foreground) ===== -->
        <g filter="url(#productShadow)" clip-path="url(#circleClip)">
          <!-- Jar shadow -->
          <ellipse cx="310" cy="385" rx="26" ry="5" fill="rgba(0,0,0,0.05)" />

          <!-- Jar body -->
          <path d="M288 358 C288 340 292 332 310 332 C328 332 332 340 332 358 L332 380 C332 384 330 386 310 386 C290 386 288 384 288 380 Z" fill="url(#jarBody)" opacity="0.9" />

          <!-- Cream inside jar -->
          <path d="M290 358 C290 342 294 336 310 336 C326 336 330 342 330 358 L330 380 C330 384 328 385 310 385 C292 385 290 384 290 380 Z" fill="url(#jarCream)" opacity="0.5" />

          <!-- Jar highlight left -->
          <rect x="291" y="336" width="6" height="46" rx="3" fill="rgba(255,255,255,0.25)" />

          <!-- Jar rim (metal accent ring) -->
          <rect x="288" y="332" width="44" height="3" rx="1.5" fill="#e8dcc8" />
          <rect x="288" y="332" width="44" height="1.5" rx="0.75" fill="rgba(255,255,255,0.3)" />

          <!-- Jar lid -->
          <ellipse cx="310" cy="326" rx="24" ry="5" fill="url(#jarLid)" />
          <!-- Lid top surface -->
          <rect x="288" y="318" width="44" height="8" rx="4" fill="url(#jarLid)" />
          <rect x="288" y="318" width="44" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
          <!-- Lid highlight -->
          <rect x="292" y="319" width="16" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
          <!-- Lid top ellipse -->
          <ellipse cx="310" cy="318" rx="22" ry="4" fill="#f0c8c8" />

          <!-- Label on jar -->
          <text x="310" y="362" text-anchor="middle" font-size="4.2" font-weight="600" fill="#c08080" font-family="Inter, sans-serif" letter-spacing="0.5">NOURISH</text>
          <text x="310" y="368" text-anchor="middle" font-size="3" font-weight="400" fill="#8a7a7a" font-family="Inter, sans-serif">DAY CREAM</text>

          <!-- Jar bottom curve -->
          <ellipse cx="310" cy="384" rx="20" ry="2" fill="rgba(0,0,0,0.02)" />

          <!-- Small sparkle -->
          <circle cx="300" cy="345" r="1.2" fill="white" opacity="0.6" filter="url(#softGlow)" />
        </g>

        <!-- ===== ADDITIONAL BOTANICALS (foreground) ===== -->
        <g clip-path="url(#circleClip)">
          <!-- Eucalyptus sprig top-center -->
          <g filter="url(#dropShadow)">
            <path d="M250 108 C245 95 238 80 235 68 C232 56 238 48 245 44 C252 40 260 48 262 58 C264 68 260 82 256 94 C254 102 252 106 250 108 Z" fill="url(#leafDark)" opacity="0.5" />
            <path d="M250 108 L250 48" stroke="#5a8d64" stroke-width="0.4" opacity="0.2" fill="none" />
            <!-- Small round leaves -->
            <circle cx="242" cy="75" r="4" fill="#7aad84" opacity="0.35" />
            <circle cx="258" cy="82" r="3.5" fill="#8ab894" opacity="0.3" />
            <circle cx="248" cy="65" r="3" fill="#7aad84" opacity="0.3" />
          </g>

          <!-- Light dust particles -->
          <circle cx="160" cy="220" r="1.5" fill="white" opacity="0.3" />
          <circle cx="340" cy="170" r="1" fill="white" opacity="0.25" />
          <circle cx="200" cy="160" r="0.8" fill="white" opacity="0.2" />
          <circle cx="320" cy="230" r="1.2" fill="white" opacity="0.2" />

          <!-- Soft light leak overlay -->
          <ellipse cx="180" cy="100" rx="80" ry="60" fill="white" opacity="0.04" transform="rotate(-20 180 100)" />
        </g>

        <!-- ===== CIRCLE BORDER ===== -->
        <circle cx="250" cy="250" r="246" stroke="rgba(200,190,180,0.12)" stroke-width="1" fill="none" />
        <circle cx="250" cy="250" r="248" stroke="rgba(255,255,255,0.4)" stroke-width="0.5" fill="none" />

        <!-- ===== OUTER GLOW BORDER ===== -->
        <circle cx="250" cy="250" r="250" fill="none" stroke="rgba(200,190,180,0.08)" stroke-width="4" filter="url(#softGlow)" />

      </svg>

      <!-- Decorative ring accents -->
      <div class="ring-outer"></div>
      <div class="ring-inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircularProductHero'
}
</script>

<style scoped>
.circular-hero-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circular-frame {
  position: relative;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ambient glow behind the circle */
.ambient-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, rgba(168,213,186,0.12) 0%, transparent 60%),
              radial-gradient(circle at 70% 75%, rgba(240,200,180,0.08) 0%, transparent 50%);
  filter: blur(40px);
  pointer-events: none;
  animation: ambientPulse 6s ease-in-out infinite;
}

@keyframes ambientPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.product-art {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  border-radius: 50%;
  filter: drop-shadow(0 8px 32px rgba(180, 120, 140, 0.15));
}

/* Decorative ring outer */
.ring-outer {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid rgba(200, 190, 180, 0.12);
  pointer-events: none;
  z-index: 1;
}

/* Decorative ring inner */
.ring-inner {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 1px solid rgba(200, 190, 180, 0.08);
  pointer-events: none;
  z-index: 3;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .circular-frame {
    width: 340px;
    height: 340px;
  }
}

@media (max-width: 992px) {
  .circular-frame {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .circular-frame {
    width: 260px;
    height: 260px;
  }
}

@media (max-width: 480px) {
  .circular-frame {
    width: 220px;
    height: 220px;
  }

  .ambient-glow {
    inset: -12px;
    filter: blur(24px);
  }
}
</style>
