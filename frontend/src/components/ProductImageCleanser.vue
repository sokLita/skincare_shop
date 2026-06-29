<template>
  <div class="product-image-wrapper">
    <svg
      class="product-svg"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Premium facial cleanser"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <!-- Light beige background gradient -->
        <radialGradient id="bgGrad" cx="0.5" cy="0.5" r="0.65">
          <stop offset="0%" stop-color="#faf5ef" />
          <stop offset="60%" stop-color="#f5ede5" />
          <stop offset="100%" stop-color="#ede3d8" />
        </radialGradient>

        <!-- Key light from top-left -->
        <radialGradient id="keyLight" cx="0.3" cy="0.15" r="0.6">
          <stop offset="0%" stop-color="white" stop-opacity="0.35" />
          <stop offset="40%" stop-color="#fffcf5" stop-opacity="0.08" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>

        <!-- Fill light from right -->
        <radialGradient id="fillLight" cx="0.8" cy="0.5" r="0.4">
          <stop offset="0%" stop-color="white" stop-opacity="0.06" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>

        <!-- Main shadow -->
        <filter id="mainShadow" x="-30%" y="-20%" width="160%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="blur" />
          <feOffset dx="4" dy="12" result="offsetBlur" />
          <feComponentTransfer result="shadow">
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Soft glow -->
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Tube body gradient (white with pink tint) -->
        <linearGradient id="tubeBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#fcf8f5" />
          <stop offset="15%" stop-color="#ffffff" />
          <stop offset="40%" stop-color="#fffbfa" />
          <stop offset="60%" stop-color="#fefcfb" />
          <stop offset="85%" stop-color="#f8f0ee" />
          <stop offset="100%" stop-color="#f0e6e2" />
        </linearGradient>

        <!-- Tube body vertical shading -->
        <linearGradient id="tubeVertical" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.15)" />
          <stop offset="20%" stop-color="rgba(255,255,255,0.05)" />
          <stop offset="70%" stop-color="rgba(0,0,0,0.02)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.06)" />
        </linearGradient>

        <!-- Pink band gradient -->
        <linearGradient id="pinkBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f0b8c0" />
          <stop offset="20%" stop-color="#f8d0d6" />
          <stop offset="40%" stop-color="#fadce0" />
          <stop offset="60%" stop-color="#f8d0d6" />
          <stop offset="85%" stop-color="#f0b8c0" />
          <stop offset="100%" stop-color="#e8a8b0" />
        </linearGradient>

        <!-- Gold accent gradient -->
        <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#c8a878" />
          <stop offset="30%" stop-color="#e0c898" />
          <stop offset="50%" stop-color="#ead4a4" />
          <stop offset="70%" stop-color="#e0c898" />
          <stop offset="100%" stop-color="#c0a070" />
        </linearGradient>

        <!-- Gold ring gradient -->
        <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#b89868" />
          <stop offset="30%" stop-color="#d8c088" />
          <stop offset="60%" stop-color="#e8d4a0" />
          <stop offset="100%" stop-color="#b89868" />
        </linearGradient>

        <!-- Cap gradient -->
        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f5f0ec" />
          <stop offset="25%" stop-color="#ffffff" />
          <stop offset="50%" stop-color="#fcfaf8" />
          <stop offset="75%" stop-color="#f5f0ec" />
          <stop offset="100%" stop-color="#ece5e0" />
        </linearGradient>

        <!-- Cap top gradient -->
        <linearGradient id="capTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f5f0ec" />
        </linearGradient>

        <!-- Nozzle gradient -->
        <linearGradient id="nozzleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#e8e2dc" />
          <stop offset="40%" stop-color="#f5f0ec" />
          <stop offset="100%" stop-color="#e0d8d0" />
        </linearGradient>

        <!-- Surface shadow -->
        <radialGradient id="surfaceShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="rgba(0,0,0,0.04)" />
          <stop offset="70%" stop-color="rgba(0,0,0,0.02)" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>

        <!-- Reflection -->
        <linearGradient id="reflectionGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0.12" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </linearGradient>

        <!-- Gold cap band -->
        <linearGradient id="goldCapBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#c8a878" />
          <stop offset="30%" stop-color="#e0c898" />
          <stop offset="60%" stop-color="#ead4a4" />
          <stop offset="100%" stop-color="#b89868" />
        </linearGradient>
      </defs>

      <!-- ===== BACKGROUND ===== -->
      <rect x="0" y="0" width="600" height="600" fill="url(#bgGrad)" />

      <!-- Key light from top-left -->
      <rect x="0" y="0" width="600" height="600" fill="url(#keyLight)" />

      <!-- Fill light from right -->
      <rect x="0" y="0" width="600" height="600" fill="url(#fillLight)" />

      <!-- Soft vignette -->
      <ellipse cx="300" cy="300" rx="240" ry="240" fill="rgba(220,210,200,0.04)" />

      <!-- Light streak across top -->
      <ellipse cx="200" cy="80" rx="200" ry="80" fill="white" opacity="0.05" transform="rotate(-18 200 80)" />

      <!-- ===== SURFACE SHADOW ===== -->
      <ellipse cx="300" cy="490" rx="140" ry="20" fill="url(#surfaceShadow)" />

      <!-- ===== CLEANSER TUBE ===== -->
      <g filter="url(#mainShadow)">

        <!-- Tube body (main rectangle with rounded bottom) -->
        <path d="M240 240 L240 420 C240 444 255 460 300 460 C345 460 360 444 360 420 L360 240 Z"
              fill="url(#tubeBody)" />

        <!-- Vertical shading overlay -->
        <path d="M240 240 L240 420 C240 444 255 460 300 460 C345 460 360 444 360 420 L360 240 Z"
              fill="url(#tubeVertical)" />

        <!-- Edge contour left -->
        <path d="M240 240 L240 420 C240 444 255 460 300 460"
              stroke="rgba(0,0,0,0.03)" stroke-width="1" fill="none" />

        <!-- Edge contour right -->
        <path d="M360 240 L360 420 C360 444 345 460 300 460"
              stroke="rgba(0,0,0,0.02)" stroke-width="1" fill="none" />

        <!-- Left highlight streak -->
        <rect x="248" y="245" width="10" height="210" rx="5" fill="url(#reflectionGrad)" opacity="0.4" />

        <!-- === PINK BAND (upper portion) === -->
        <path d="M240 280 L240 340 C240 344 248 348 300 348 C352 348 360 344 360 340 L360 280 Z"
              fill="url(#pinkBand)" />

        <!-- Pink band light highlight -->
        <rect x="248" y="285" width="8" height="58" rx="4" fill="rgba(255,255,255,0.2)" />

        <!-- Pink band shadow side -->
        <path d="M352 282 L352 338 C352 340 348 342 340 342"
              stroke="rgba(0,0,0,0.04)" stroke-width="1" fill="none" />

        <!-- === GOLD ACCENT STRIPE (between pink band and lower white) === -->
        <rect x="240" y="340" width="120" height="3" fill="url(#goldAccent)" />
        <rect x="242" y="341" width="116" height="0.8" fill="rgba(255,255,255,0.3)" />

        <!-- === GOLD BOTTOM ACCENT === -->
        <rect x="240" y="418" width="120" height="2.5" fill="url(#goldAccent)" rx="0.5" />

        <!-- === SUBTLE GOLD FOIL LOGO PLACEHOLDER (abstract shape, no text) === -->
        <g opacity="0.4">
          <!-- Abstract petal/leaf shape -->
          <path d="M285 370 C285 358 295 352 300 352 C305 352 315 358 315 370 C315 382 305 390 300 390 C295 390 285 382 285 370 Z"
                fill="url(#goldAccent)" opacity="0.5" />
          <!-- Inner highlight -->
          <path d="M292 370 C292 362 297 358 300 358 C303 358 308 362 308 370 C308 378 303 382 300 382 C297 382 292 378 292 370 Z"
                fill="rgba(255,255,255,0.3)" />
          <!-- Tiny leaf accents -->
          <path d="M278 364 C274 360 274 354 278 350" stroke="url(#goldAccent)" stroke-width="1" fill="none" opacity="0.4" />
          <path d="M322 376 C326 380 326 386 322 390" stroke="url(#goldAccent)" stroke-width="1" fill="none" opacity="0.4" />
        </g>

        <!-- Tube bottom curve -->
        <path d="M240 420 C240 444 255 460 300 460 C345 460 360 444 360 420"
              stroke="rgba(0,0,0,0.03)" stroke-width="1.5" fill="none" />

        <!-- Bottom base highlight -->
        <ellipse cx="300" cy="458" rx="55" ry="3" fill="rgba(255,255,255,0.1)" />

        <!-- === CAP === -->
        <!-- Cap body -->
        <rect x="256" y="200" width="88" height="44" rx="8" fill="url(#capGrad)" />

        <!-- Cap top edge highlight -->
        <rect x="258" y="202" width="84" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />

        <!-- Cap left highlight -->
        <rect x="262" y="205" width="6" height="36" rx="3" fill="rgba(255,255,255,0.2)" />

        <!-- Cap shadow right -->
        <rect x="330" y="205" width="6" height="36" rx="3" fill="rgba(0,0,0,0.03)" />

        <!-- Cap top face -->
        <ellipse cx="300" cy="200" rx="44" ry="8" fill="url(#capTop)" />
        <ellipse cx="300" cy="200" rx="44" ry="8" fill="rgba(255,255,255,0.15)" />

        <!-- Cap top highlight -->
        <ellipse cx="288" cy="198" rx="20" ry="4" fill="white" opacity="0.2" />

        <!-- === GOLD RING ON CAP === -->
        <rect x="256" y="214" width="88" height="4" rx="2" fill="url(#goldRing)" />
        <rect x="258" y="215" width="84" height="1" fill="rgba(255,255,255,0.25)" />

        <!-- === NOZZLE / PUMP (under cap, slightly visible) === -->
        <rect x="286" y="188" width="28" height="16" rx="2" fill="url(#nozzleGrad)" />
        <rect x="286" y="188" width="28" height="2" rx="1" fill="rgba(255,255,255,0.15)" />

        <!-- Nozzle opening -->
        <ellipse cx="300" cy="188" rx="10" ry="2.5" fill="#d8d0c8" stroke="#ccc4bc" stroke-width="0.3" />

        <!-- ===== SUBTLE REFLECTION ON SURFACE ===== -->
        <path d="M260 464 C260 480 280 486 300 486 C320 486 340 480 340 464"
              fill="rgba(255,255,255,0.08)" opacity="0.3" />

      </g>

      <!-- ===== AMBIENT LIGHT PARTICLES ===== -->
      <circle cx="160" cy="180" r="1.5" fill="white" opacity="0.2" />
      <circle cx="440" cy="150" r="1" fill="white" opacity="0.15" />
      <circle cx="180" cy="380" r="0.8" fill="white" opacity="0.12" />
      <circle cx="430" cy="340" r="1.2" fill="white" opacity="0.1" />
      <circle cx="140" cy="280" r="0.6" fill="white" opacity="0.08" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ProductImageCleanser'
}
</script>

<style scoped>
.product-image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.product-image-wrapper:hover {
  transform: translateY(-6px);
}

.product-svg {
  width: 100%;
  height: 100%;
  display: block;
  animation: gentleFloat 4s ease-in-out infinite;
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
</style>
