<template>
  <div class="product-image-wrapper">
    <svg
      class="product-svg"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Premium moisturizer cream jar"
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

        <!-- Jar body (white glass) -->
        <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,255,255,0.88)" />
          <stop offset="15%" stop-color="rgba(255,255,255,0.97)" />
          <stop offset="40%" stop-color="white" />
          <stop offset="60%" stop-color="rgba(252,250,248,0.95)" />
          <stop offset="85%" stop-color="rgba(245,242,238,0.88)" />
          <stop offset="100%" stop-color="rgba(235,230,225,0.82)" />
        </linearGradient>

        <!-- Jar vertical shading -->
        <linearGradient id="jarVertical" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
          <stop offset="40%" stop-color="rgba(255,255,255,0.02)" />
          <stop offset="80%" stop-color="rgba(0,0,0,0.02)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.05)" />
        </linearGradient>

        <!-- Cream inside jar -->
        <linearGradient id="jarCream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff5ea" />
          <stop offset="50%" stop-color="#fdf0e4" />
          <stop offset="100%" stop-color="#fae8d8" />
        </linearGradient>

        <!-- Lid blush pink gradient -->
        <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f0b8c0" />
          <stop offset="20%" stop-color="#fad0d6" />
          <stop offset="40%" stop-color="#fce0e4" />
          <stop offset="60%" stop-color="#fad0d6" />
          <stop offset="85%" stop-color="#f0b8c0" />
          <stop offset="100%" stop-color="#e8a8b0" />
        </linearGradient>

        <!-- Lid top -->
        <linearGradient id="lidTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fce8ea" />
          <stop offset="100%" stop-color="#f0c8ce" />
        </linearGradient>

        <!-- Gold accents -->
        <linearGradient id="goldAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#c8a878" />
          <stop offset="30%" stop-color="#e0c898" />
          <stop offset="50%" stop-color="#ead4a4" />
          <stop offset="70%" stop-color="#e0c898" />
          <stop offset="100%" stop-color="#c0a070" />
        </linearGradient>

        <radialGradient id="surfaceShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="rgba(0,0,0,0.04)" />
          <stop offset="70%" stop-color="rgba(0,0,0,0.02)" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="600" height="600" fill="url(#bgGrad)" />
      <rect x="0" y="0" width="600" height="600" fill="url(#keyLight)" />
      <rect x="0" y="0" width="600" height="600" fill="url(#fillLight)" />
      <ellipse cx="300" cy="300" rx="240" ry="240" fill="rgba(220,210,200,0.04)" />
      <ellipse cx="200" cy="80" rx="200" ry="80" fill="white" opacity="0.05" transform="rotate(-18 200 80)" />

      <ellipse cx="300" cy="490" rx="140" ry="20" fill="url(#surfaceShadow)" />

      <g filter="url(#mainShadow)">
        <!-- Jar body -->
        <path d="M248 340 C248 316 254 304 300 304 C346 304 352 316 352 340 L352 440 C352 458 344 470 300 470 C256 470 248 458 248 440 Z"
              fill="url(#jarBody)" />
        <path d="M248 340 C248 316 254 304 300 304 C346 304 352 316 352 340 L352 440 C352 458 344 470 300 470 C256 470 248 458 248 440 Z"
              fill="url(#jarVertical)" />

        <!-- Cream visible through glass -->
        <path d="M252 348 C252 326 258 316 300 316 C342 316 348 326 348 348 L348 440 C348 456 342 466 300 466 C258 466 252 456 252 440 Z"
              fill="url(#jarCream)" opacity="0.35" />

        <!-- Glass highlight left -->
        <rect x="254" y="310" width="8" height="150" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="256" y="312" width="3" height="146" rx="1.5" fill="rgba(255,255,255,0.15)" />

        <!-- Glass highlight right edge -->
        <path d="M346 312 C348 320 350 340 350 440" stroke="rgba(255,255,255,0.08)" stroke-width="2" fill="none" />

        <!-- Jar rim -->
        <rect x="248" y="304" width="104" height="6" rx="3" fill="#f0ece6" />
        <rect x="248" y="304" width="104" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />

        <!-- Gold ring at neck -->
        <rect x="248" y="302" width="104" height="4" rx="2" fill="url(#goldAccent)" />
        <rect x="250" y="303" width="100" height="1" fill="rgba(255,255,255,0.3)" />

        <!-- Lid -->
        <ellipse cx="300" cy="288" rx="56" ry="12" fill="url(#lidTop)" />
        <rect x="244" y="274" width="112" height="14" rx="4" fill="url(#lidGrad)" />
        <rect x="244" y="274" width="112" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />

        <!-- Lid top surface -->
        <ellipse cx="300" cy="274" rx="56" ry="10" fill="url(#lidTop)" />

        <!-- Lid highlight -->
        <ellipse cx="280" cy="272" rx="30" ry="5" fill="white" opacity="0.15" />

        <!-- Gold ring on lid -->
        <rect x="244" y="286" width="112" height="3" rx="1.5" fill="url(#goldAccent)" />
        <rect x="246" y="287" width="108" height="0.8" fill="rgba(255,255,255,0.25)" />

        <!-- Gold foil logo placeholder -->
        <g opacity="0.35">
          <path d="M285 380 C285 368 295 362 300 362 C305 362 315 368 315 380 C315 392 305 400 300 400 C295 400 285 392 285 380 Z"
                fill="url(#goldAccent)" />
          <path d="M292 380 C292 372 297 368 300 368 C303 368 308 372 308 380 C308 388 303 392 300 392 C297 392 292 388 292 380 Z"
                fill="rgba(255,255,255,0.3)" />
        </g>

        <!-- Jar bottom curve -->
        <ellipse cx="300" cy="468" rx="50" ry="4" fill="rgba(255,255,255,0.08)" />

        <!-- Surface reflection -->
        <path d="M270 474 C270 486 285 492 300 492 C315 492 330 486 330 474"
              fill="rgba(255,255,255,0.06)" opacity="0.3" />
      </g>

      <circle cx="170" cy="190" r="1.2" fill="white" opacity="0.18" />
      <circle cx="440" cy="160" r="0.9" fill="white" opacity="0.14" />
      <circle cx="180" cy="390" r="0.7" fill="white" opacity="0.1" />
      <circle cx="430" cy="320" r="1" fill="white" opacity="0.12" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ProductImageMoisturizer'
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
  animation: gentleFloat 4.5s ease-in-out infinite;
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
</style>
