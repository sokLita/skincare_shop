<template>
  <div class="product-image-wrapper">
    <svg
      class="product-svg"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Premium vitamin C serum bottle"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="bgGrad" cx="0.5" cy="0.5" r="0.65">
          <stop offset="0%" stop-color="#faf5ef" />
          <stop offset="60%" stop-color="#f5ede5" />
          <stop offset="100%" stop-color="#ede3d8" />
        </radialGradient>
        <radialGradient id="keyLight" cx="0.3" cy="0.15" r="0.6">
          <stop offset="0%" stop-color="white" stop-opacity="0.35" />
          <stop offset="40%" stop-color="#fffcf5" stop-opacity="0.08" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="fillLight" cx="0.8" cy="0.5" r="0.4">
          <stop offset="0%" stop-color="white" stop-opacity="0.06" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>

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

        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Glass bottle body -->
        <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(248,245,240,0.82)" />
          <stop offset="15%" stop-color="rgba(255,255,255,0.95)" />
          <stop offset="40%" stop-color="rgba(255,255,255,0.98)" />
          <stop offset="60%" stop-color="rgba(252,250,248,0.92)" />
          <stop offset="85%" stop-color="rgba(242,238,234,0.85)" />
          <stop offset="100%" stop-color="rgba(232,228,224,0.78)" />
        </linearGradient>

        <!-- Glass vertical shading -->
        <linearGradient id="glassVertical" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
          <stop offset="30%" stop-color="rgba(255,255,255,0.03)" />
          <stop offset="70%" stop-color="rgba(0,0,0,0.02)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.06)" />
        </linearGradient>

        <!-- Serum liquid inside -->
        <linearGradient id="serumLiquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,220,170,0.4)" />
          <stop offset="40%" stop-color="rgba(255,215,160,0.55)" />
          <stop offset="100%" stop-color="rgba(245,200,140,0.65)" />
        </linearGradient>

        <!-- Pink label -->
        <linearGradient id="labelGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f0b8c0" />
          <stop offset="20%" stop-color="#fad0d6" />
          <stop offset="40%" stop-color="#fce0e4" />
          <stop offset="60%" stop-color="#fad0d6" />
          <stop offset="85%" stop-color="#f0b8c0" />
          <stop offset="100%" stop-color="#e8a8b0" />
        </linearGradient>

        <!-- Gold accent -->
        <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#c8a878" />
          <stop offset="30%" stop-color="#e0c898" />
          <stop offset="50%" stop-color="#ead4a4" />
          <stop offset="70%" stop-color="#e0c898" />
          <stop offset="100%" stop-color="#c0a070" />
        </linearGradient>

        <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#b89868" />
          <stop offset="30%" stop-color="#d8c088" />
          <stop offset="60%" stop-color="#e8d4a0" />
          <stop offset="100%" stop-color="#b89868" />
        </linearGradient>

        <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f5f0ec" />
          <stop offset="25%" stop-color="#ffffff" />
          <stop offset="50%" stop-color="#fcfaf8" />
          <stop offset="75%" stop-color="#f5f0ec" />
          <stop offset="100%" stop-color="#ece5e0" />
        </linearGradient>

        <linearGradient id="dropperGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#d8d0c8" />
          <stop offset="40%" stop-color="#e8e2dc" />
          <stop offset="100%" stop-color="#ccc4bc" />
        </linearGradient>

        <radialGradient id="surfaceShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="rgba(0,0,0,0.04)" />
          <stop offset="70%" stop-color="rgba(0,0,0,0.02)" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="reflectionGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0.15" />
          <stop offset="100%" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="600" height="600" fill="url(#bgGrad)" />
      <rect x="0" y="0" width="600" height="600" fill="url(#keyLight)" />
      <rect x="0" y="0" width="600" height="600" fill="url(#fillLight)" />
      <ellipse cx="300" cy="300" rx="240" ry="240" fill="rgba(220,210,200,0.04)" />
      <ellipse cx="200" cy="80" rx="200" ry="80" fill="white" opacity="0.05" transform="rotate(-18 200 80)" />

      <ellipse cx="300" cy="480" rx="130" ry="18" fill="url(#surfaceShadow)" />

      <g filter="url(#mainShadow)">
        <!-- Bottle body -->
        <path d="M262 280 L262 440 C262 458 272 468 300 468 C328 468 338 458 338 440 L338 280 Z"
              fill="url(#glassBody)" />
        <path d="M262 280 L262 440 C262 458 272 468 300 468 C328 468 338 458 338 440 L338 280 Z"
              fill="url(#glassVertical)" />

        <!-- Serum liquid -->
        <path d="M264 340 L264 440 C264 456 274 466 300 466 C326 466 336 456 336 440 L336 340 Z"
              fill="url(#serumLiquid)" />

        <!-- Liquid meniscus -->
        <ellipse cx="300" cy="340" rx="36" ry="4" fill="rgba(255,220,170,0.3)" />

        <!-- Glass highlight left -->
        <rect x="266" y="284" width="6" height="180" rx="3" fill="url(#reflectionGrad)" opacity="0.35" />
        <rect x="268" y="286" width="2" height="176" rx="1" fill="rgba(255,255,255,0.2)" />

        <!-- Glass edge right reflection -->
        <rect x="332" y="286" width="2" height="176" rx="1" fill="rgba(255,255,255,0.08)" />

        <!-- Bottle neck -->
        <rect x="278" y="248" width="44" height="36" rx="2" fill="url(#glassBody)" />
        <rect x="278" y="248" width="44" height="36" rx="2" fill="url(#glassVertical)" />

        <!-- Gold ring at neck base -->
        <rect x="262" y="278" width="76" height="4" rx="2" fill="url(#goldRing)" />
        <rect x="264" y="279" width="72" height="1" fill="rgba(255,255,255,0.25)" />

        <!-- Pink label -->
        <rect x="264" y="360" width="72" height="48" rx="3" fill="url(#labelGrad)" />
        <rect x="266" y="362" width="68" height="44" rx="2" fill="rgba(255,255,255,0.08)" />

        <!-- Label border -->
        <rect x="268" y="364" width="64" height="40" rx="1.5" stroke="rgba(255,255,255,0.25)" stroke-width="0.5" fill="none" />

        <!-- Gold foil logo on label -->
        <g opacity="0.35">
          <path d="M290 378 C290 370 296 366 300 366 C304 366 310 370 310 378 C310 386 304 390 300 390 C296 390 290 386 290 378 Z"
                fill="url(#goldAccent)" />
          <path d="M295 378 C295 373 297 370 300 370 C303 370 305 373 305 378 C305 383 303 386 300 386 C297 386 295 383 295 378 Z"
                fill="rgba(255,255,255,0.3)" />
        </g>

        <!-- Glass bottom -->
        <ellipse cx="300" cy="466" rx="36" ry="3" fill="rgba(255,255,255,0.08)" />

        <!-- Cap -->
        <rect x="274" y="228" width="52" height="24" rx="6" fill="url(#capGrad)" />
        <rect x="276" y="230" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.3)" />
        <rect x="278" y="232" width="4" height="18" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="316" y="232" width="4" height="18" rx="2" fill="rgba(0,0,0,0.03)" />

        <!-- Cap top face -->
        <ellipse cx="300" cy="228" rx="26" ry="5" fill="#fcfaf8" />
        <ellipse cx="300" cy="228" rx="26" ry="5" fill="rgba(255,255,255,0.15)" />
        <ellipse cx="290" cy="226" rx="14" ry="3" fill="white" opacity="0.2" />

        <!-- Gold ring on cap -->
        <rect x="274" y="240" width="52" height="3" rx="1.5" fill="url(#goldRing)" />
        <rect x="276" y="241" width="48" height="0.8" fill="rgba(255,255,255,0.25)" />

        <!-- Dropper -->
        <rect x="290" y="210" width="20" height="20" rx="2" fill="url(#dropperGrad)" />

        <!-- Dropper rubber bulb -->
        <ellipse cx="300" cy="206" rx="12" ry="9" fill="#3a3a3a" />
        <ellipse cx="300" cy="204" rx="7" ry="5" fill="#4a4a4a" opacity="0.5" />
        <ellipse cx="296" cy="202" rx="4" ry="3" fill="rgba(255,255,255,0.08)" />

        <!-- Surface reflection -->
        <path d="M270 472 C270 484 285 490 300 490 C315 490 330 484 330 472"
              fill="rgba(255,255,255,0.06)" opacity="0.3" />
      </g>

      <!-- Sparkle -->
      <circle cx="272" cy="310" r="1.5" fill="white" opacity="0.4" filter="url(#softGlow)" />
      <circle cx="328" cy="360" r="1" fill="white" opacity="0.3" />

      <!-- Light particles -->
      <circle cx="180" cy="200" r="1.2" fill="white" opacity="0.18" />
      <circle cx="430" cy="170" r="0.9" fill="white" opacity="0.14" />
      <circle cx="200" cy="400" r="0.7" fill="white" opacity="0.1" />
      <circle cx="420" cy="340" r="1" fill="white" opacity="0.12" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ProductImageSerum'
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
  animation: gentleFloat 5s ease-in-out infinite;
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
</style>
