/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HarryPose } from '../types';

interface HarryMascotProps {
  pose?: HarryPose;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  imageSrc?: string;
  alt?: string;
  showSpeechBubble?: boolean;
  speechText?: string;
}

export const HarryMascot: React.FC<HarryMascotProps> = ({
  pose = 'harry-idle',
  size = 'md',
  className = '',
  imageSrc,
  alt = 'Harry Fox - MarketMe Brand Mascot',
  showSpeechBubble = false,
  speechText,
}) => {
  // Target file path automatically attempts /assets/harry/{pose}.webp
  const targetSrc = imageSrc || `/assets/harry/${pose}.webp`;

  // State to track if the external image file failed to load
  const [hasError, setHasError] = useState(false);

  // Reset error state whenever the target source or pose changes
  useEffect(() => {
    setHasError(false);
  }, [targetSrc, pose]);

  const sizeDimensions = {
    xs: 'w-10 h-12',
    sm: 'w-16 h-20',
    md: 'w-32 h-40',
    lg: 'w-48 h-60',
    xl: 'w-60 h-76',
    custom: '',
  }[size];

  // Speech bubble element constrained to avoid mobile overflow
  const speechBubble = showSpeechBubble && speechText && (
    <div className="absolute -top-11 left-1/2 -translate-x-1/2 w-max max-w-[min(260px,calc(100vw-3rem))] text-center bg-[#18191E] border border-[#F97316]/50 text-neutral-100 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none z-20 font-medium leading-tight">
      <span className="text-[#F97316] font-semibold mr-1">Harry:</span>
      <span>{speechText}</span>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#18191E] border-r border-b border-[#F97316]/50 rotate-45" />
    </div>
  );

  // 1. Attempt image render if file has not errored
  if (!hasError) {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center aspect-[4/5] ${sizeDimensions} ${className} group`}
      >
        {speechBubble}
        <img
          src={targetSrc}
          alt={alt}
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-102 motion-reduce:transform-none"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // 2. High-fidelity vector SVG mascot fallback
  // Directly modeled after the MarketMe Harry Fox character design sheet:
  // - White spiky anime/streetwear hair with orange flame tips
  // - Fox ears with orange inner accents
  // - Sleek black cyber visor with glowing slanted orange eye slits
  // - Oversized black hoodie with orange drawstrings, orange cuffs
  // - Black cargo joggers with orange strap details
  // - Chunky black/white/orange sneakers
  // - Massive bushy fox tail with white base & orange accents
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center aspect-[4/5] ${sizeDimensions} ${className} group`}
    >
      {speechBubble}

      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-102 motion-reduce:transform-none"
        role="img"
        aria-label={alt}
      >
        <defs>
          <linearGradient id={`visorGlow_${pose}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id={`tailOrange_${pose}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="30%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
          <linearGradient id={`hoodieShade_${pose}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22242A" />
            <stop offset="100%" stopColor="#111215" />
          </linearGradient>
        </defs>

        {/* 1. Large Fluffy Fox Tail (White Base & Flaming Orange Tip) */}
        <g className="origin-bottom-left transition-transform duration-500 group-hover:rotate-2 motion-reduce:transform-none">
          {/* Main orange tail curve */}
          <path
            d="M 115 170 C 160 160 195 125 188 85 C 182 50 148 62 135 88 C 128 100 130 135 110 165 Z"
            fill={`url(#tailOrange_${pose})`}
          />
          {/* White inner tail fluff */}
          <path
            d="M 188 85 C 192 70 182 52 165 52 C 148 52 138 65 136 78 C 146 72 155 78 162 70 C 168 82 178 78 188 85 Z"
            fill="#FFFFFF"
          />
          {/* Hair tufts */}
          <path d="M 152 82 L 142 94" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M 166 92 L 158 104" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* 2. Fox Ears */}
        {/* Left Ear */}
        <path d="M 60 70 L 36 20 C 34 16 44 16 54 22 L 80 56 Z" fill="#FFFFFF" />
        <path d="M 62 65 L 46 26 C 45 24 50 24 56 30 L 74 54 Z" fill="#F97316" />
        <path d="M 36 20 L 44 32" stroke="#16171B" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Ear */}
        <path d="M 124 70 L 148 20 C 150 16 140 16 130 22 L 104 56 Z" fill="#FFFFFF" />
        <path d="M 122 65 L 138 26 C 139 24 134 24 128 30 L 110 54 Z" fill="#F97316" />
        <path d="M 148 20 L 140 32" stroke="#16171B" strokeWidth="2.5" strokeLinecap="round" />

        {/* 3. Spiky Anime Streetwear Hair (White with Orange Flame Tips) */}
        {/* White base hair crown */}
        <path
          d="M 52 74 C 44 56 56 38 72 32 C 84 26 100 26 112 32 C 128 38 140 56 132 74 C 144 88 140 106 128 116 C 114 126 70 126 56 116 C 44 106 40 88 52 74 Z"
          fill="#FFFFFF"
        />
        {/* Orange Flame Hair Highlights */}
        <path d="M 72 32 C 78 22 92 18 96 10 C 100 18 114 22 120 32 C 108 28 84 28 72 32 Z" fill="#F97316" />
        <path d="M 54 44 C 48 38 48 28 46 22 C 54 30 62 34 68 38 Z" fill="#F97316" />
        <path d="M 130 44 C 136 38 136 28 138 22 C 130 30 122 34 116 38 Z" fill="#F97316" />

        {/* Head Shape & Cute Fox Face */}
        <path
          d="M 64 74 C 54 86 50 102 62 114 C 72 122 88 126 96 126 C 104 126 120 122 130 114 C 142 102 138 86 128 74 Z"
          fill="#FFFFFF"
        />

        {/* 4. Sleek Cyber Visor Mask with Glowing Orange Slanted Eyes */}
        <g>
          {/* Black Visor Outline (Curved Mask as seen on sheet) */}
          <path
            d="M 58 78 C 54 90 60 104 96 104 C 132 104 138 90 134 78 C 126 74 106 72 96 76 C 86 72 66 74 58 78 Z"
            fill="#121316"
            stroke="#26272D"
            strokeWidth="1.8"
          />

          {/* Glowing Orange Slanted Eyes */}
          {pose === 'harry-thinking' ? (
            <>
              {/* Looking up thoughtfully */}
              <path d="M 72 86 C 76 80 84 82 88 88" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 104 86 C 108 80 116 82 120 88" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : pose === 'harry-celebrate' ? (
            <>
              {/* Joyful curved squint eyes */}
              <path d="M 72 90 C 76 83 84 83 88 90" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
              <path d="M 104 90 C 108 83 116 83 120 90" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Confident sharp slanted cyber eyes */}
              <path
                d="M 72 90 C 72 84 76 82 84 84 C 88 88 84 94 76 94 Z"
                fill={`url(#visorGlow_${pose})`}
              />
              <path
                d="M 120 90 C 120 84 116 82 108 84 C 104 88 108 94 116 94 Z"
                fill={`url(#visorGlow_${pose})`}
              />
              {/* Slit reflection highlights */}
              <circle cx="80" cy="88" r="1.5" fill="#FFFFFF" />
              <circle cx="112" cy="88" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Visor Glare Bar */}
          <path d="M 66 81 L 82 81" stroke="#3A3C44" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Cute confident smirk mouth */}
        <path d="M 92 116 C 96 119 104 118 106 115" stroke="#121316" strokeWidth="2" strokeLinecap="round" />

        {/* 5. Oversized Black Streetwear Hoodie */}
        <path
          d="M 64 126 C 52 130 42 146 44 176 C 45 184 52 186 60 186 L 132 186 C 140 186 147 184 148 176 C 150 146 140 130 128 126 Z"
          fill={`url(#hoodieShade_${pose})`}
        />

        {/* Kangaroo Pocket */}
        <path
          d="M 68 158 L 124 158 L 130 182 L 62 182 Z"
          fill="#17181D"
          stroke="#2A2C34"
          strokeWidth="1.2"
        />

        {/* Orange Hoodie Drawstrings */}
        <path d="M 86 130 L 84 152" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="84" cy="153" r="2.5" fill="#F97316" />
        <path d="M 106 130 L 108 152" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="108" cy="153" r="2.5" fill="#F97316" />

        {/* Orange Hood Interior Peak */}
        <path d="M 88 126 L 96 135 L 104 126" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* 6. Pose Variations for Arms & Paws */}
        {(pose === 'harry-point-right' || pose === 'harry-cta') ? (
          <g>
            {/* Pointing Right Hand (As in the character design sheet) */}
            <path d="M 132 144 L 164 142" stroke="#1A1C22" strokeWidth="14" strokeLinecap="round" />
            <circle cx="166" cy="142" r="8" fill="#F97316" />
            <circle cx="168" cy="142" r="7" fill="#FFFFFF" />
            <rect x="168" y="138" width="16" height="7" rx="3.5" fill="#FFFFFF" />
            <circle cx="180" cy="141.5" r="2.5" fill="#F97316" />
          </g>
        ) : pose === 'harry-point-left' ? (
          <g>
            {/* Pointing Left Hand */}
            <path d="M 60 144 L 28 142" stroke="#1A1C22" strokeWidth="14" strokeLinecap="round" />
            <circle cx="26" cy="142" r="8" fill="#F97316" />
            <circle cx="24" cy="142" r="7" fill="#FFFFFF" />
            <rect x="12" y="138" width="16" height="7" rx="3.5" fill="#FFFFFF" />
            <circle cx="16" cy="141.5" r="2.5" fill="#F97316" />
          </g>
        ) : pose === 'harry-wave' ? (
          <g>
            {/* Waving Paw */}
            <path d="M 136 142 C 148 128 158 108 154 94 C 150 88 142 90 140 96 L 128 126" stroke="#1A1C22" strokeWidth="14" strokeLinecap="round" />
            <circle cx="154" cy="94" r="9" fill="#FFFFFF" />
            <ellipse cx="154" cy="94" rx="5" ry="4" fill="#F97316" />
          </g>
        ) : pose === 'harry-present' ? (
          <g>
            {/* Open Presenting Palm */}
            <path d="M 134 144 L 160 134" stroke="#1A1C22" strokeWidth="14" strokeLinecap="round" />
            <circle cx="164" cy="132" r="9" fill="#FFFFFF" />
            <ellipse cx="164" cy="132" rx="5" ry="4" fill="#F97316" />
          </g>
        ) : (
          <g>
            {/* Hands casually tucked into hoodie pocket */}
            <circle cx="68" cy="168" r="7" fill="#FFFFFF" />
            <circle cx="124" cy="168" r="7" fill="#FFFFFF" />
            <rect x="65" y="166" width="6" height="4" rx="2" fill="#F97316" />
            <rect x="121" y="166" width="6" height="4" rx="2" fill="#F97316" />
          </g>
        )}

        {/* 7. Black Cargo Joggers with Orange Straps */}
        <path d="M 66 186 L 62 212 L 88 212 L 94 188 Z" fill="#141518" />
        <path d="M 98 188 L 104 212 L 130 212 L 126 186 Z" fill="#141518" />
        {/* Cargo Pockets with Orange Accent Tabs */}
        <rect x="58" y="194" width="14" height="7" rx="2" fill="#1F2128" stroke="#2F323C" strokeWidth="1" />
        <rect x="60" y="198" width="5" height="2" fill="#F97316" />
        <rect x="120" y="194" width="14" height="7" rx="2" fill="#1F2128" stroke="#2F323C" strokeWidth="1" />
        <rect x="127" y="198" width="5" height="2" fill="#F97316" />

        {/* 8. Chunky Black, White, and Orange Streetwear Sneakers */}
        {/* Left Sneaker */}
        <path
          d="M 52 222 C 52 215 58 212 72 212 L 88 212 L 88 226 C 88 229 82 231 66 231 L 54 231 C 52 231 52 226 52 222 Z"
          fill="#121316"
        />
        <rect x="50" y="227" width="40" height="5" rx="2.5" fill="#FFFFFF" />
        <path d="M 62 219 L 78 219" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />

        {/* Right Sneaker */}
        <path
          d="M 104 212 L 120 212 C 134 212 140 215 140 222 C 140 226 140 231 138 231 L 126 231 C 110 231 104 229 104 226 Z"
          fill="#121316"
        />
        <rect x="102" y="227" width="40" height="5" rx="2.5" fill="#FFFFFF" />
        <path d="M 114 219 L 130 219" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};
