/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  // If user provides a custom image or puts files in /assets/harry/
  const [imageError, setImageError] = useState(false);
  const targetSrc = imageSrc || `/assets/harry/${pose}.webp`;

  const sizeDimensions = {
    xs: 'w-10 h-10',
    sm: 'w-16 h-16',
    md: 'w-32 h-36',
    lg: 'w-48 h-56',
    xl: 'w-64 h-72',
    custom: '',
  }[size];

  // If a real image file exists and hasn't errored out, render the image
  if (imageSrc && !imageError) {
    return (
      <div className={`relative inline-flex items-center justify-center ${sizeDimensions} ${className}`}>
        <img
          src={targetSrc}
          alt={alt}
          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        {showSpeechBubble && speechText && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 border border-[#F97316]/50 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none z-10 font-medium">
            {speechText}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-r border-b border-[#F97316]/50 rotate-45" />
          </div>
        )}
      </div>
    );
  }

  // High-fidelity vector SVG mascot illustration of Harry Fox
  // White fur, orange accents, black visor with orange eyes, black hoodie, cargo pants, orange/white sneakers & tail
  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${sizeDimensions} ${className} group`}>
      {showSpeechBubble && speechText && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#18191E] border border-[#F97316]/40 text-neutral-100 text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none z-20 font-medium tracking-wide">
          <span className="text-[#F97316] font-semibold mr-1.5">Harry:</span>
          {speechText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#18191E] border-r border-b border-[#F97316]/40 rotate-45" />
        </div>
      )}

      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-102"
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
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="70%" stopColor="#C2410C" />
          </linearGradient>
          <linearGradient id={`hoodieShade_${pose}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2024" />
            <stop offset="100%" stopColor="#0F1012" />
          </linearGradient>
          <radialGradient id={`glowPupil_${pose}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEDD5" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </radialGradient>
        </defs>

        {/* 1. Large Fluffy Fox Tail (White & Orange) */}
        <g className="transition-transform duration-500 origin-bottom-left group-hover:rotate-3">
          {/* Main orange tail curve */}
          <path
            d="M 125 150 C 155 140 185 110 178 75 C 172 45 140 55 128 78 C 122 88 126 120 120 145 Z"
            fill={`url(#tailOrange_${pose})`}
          />
          {/* White tail fluffy tip */}
          <path
            d="M 178 75 C 182 62 175 48 160 48 C 146 48 136 58 134 70 C 142 66 150 72 156 64 C 160 74 168 70 178 75 Z"
            fill="#FFFFFF"
          />
          {/* Fluffy tail hair tuft lines */}
          <path d="M 148 76 L 140 85" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M 160 84 L 154 94" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* 2. Fox Ears */}
        {/* Left Ear */}
        <path d="M 62 65 L 42 22 C 40 18 48 18 56 24 L 80 54 Z" fill="#FFFFFF" />
        <path d="M 64 60 L 50 28 C 49 26 53 26 58 31 L 74 52 Z" fill="#F97316" />
        <path d="M 42 22 L 48 34" stroke="#18191E" strokeWidth="2" strokeLinecap="round" />

        {/* Right Ear */}
        <path d="M 122 65 L 142 22 C 144 18 136 18 128 24 L 104 54 Z" fill="#FFFFFF" />
        <path d="M 120 60 L 134 28 C 135 26 131 26 126 31 L 110 52 Z" fill="#F97316" />
        <path d="M 142 22 L 136 34" stroke="#18191E" strokeWidth="2" strokeLinecap="round" />

        {/* 3. White Fox Head & Cheeks */}
        <path
          d="M 60 70 C 50 82 45 98 56 108 C 66 116 82 120 92 122 C 102 122 118 116 128 108 C 139 98 134 82 124 70 C 114 60 70 60 60 70 Z"
          fill="#FFFFFF"
        />

        {/* Orange Cheek Accents / Fox Markings */}
        <path d="M 52 92 C 58 90 62 96 66 100 C 58 102 54 98 52 92 Z" fill="#F97316" opacity="0.9" />
        <path d="M 132 92 C 126 90 122 96 118 100 C 126 102 130 98 132 92 Z" fill="#F97316" opacity="0.9" />

        {/* Cute Fox Nose */}
        <ellipse cx="92" cy="110" rx="4.5" ry="3.5" fill="#18191E" />
        <path d="M 92 113.5 L 92 116" stroke="#18191E" strokeWidth="1.5" strokeLinecap="round" />

        {/* 4. Black Visor / Eye Area with Glowing Orange Eyes */}
        <g>
          {/* Black Visor Frame */}
          <rect x="58" y="74" width="68" height="24" rx="10" fill="#111215" stroke="#27272A" strokeWidth="1.5" />
          {/* Visor Glare Accent */}
          <path d="M 64 78 L 82 78" stroke="#3F3F46" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left Eye / Visor Reticle */}
          {pose === 'harry-thinking' ? (
            <path d="M 72 86 C 75 82 82 82 85 86" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          ) : pose === 'harry-celebrate' ? (
            <path d="M 72 88 C 76 83 82 83 86 88" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="78" cy="86" r="5" fill={`url(#glowPupil_${pose})`} />
              <circle cx="79.5" cy="84.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Right Eye / Visor Reticle */}
          {pose === 'harry-thinking' ? (
            <path d="M 99 86 C 102 82 109 82 112 86" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          ) : pose === 'harry-celebrate' ? (
            <path d="M 98 88 C 102 83 108 83 112 88" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="106" cy="86" r="5" fill={`url(#glowPupil_${pose})`} />
              <circle cx="107.5" cy="84.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Subtle Cyber Target HUD tick */}
          <line x1="91" y1="84" x2="93" y2="84" stroke="#F97316" strokeWidth="1.5" opacity="0.7" />
          <line x1="91" y1="88" x2="93" y2="88" stroke="#F97316" strokeWidth="1.5" opacity="0.7" />
        </g>

        {/* 5. Oversized Black Streetwear Hoodie */}
        {/* Hoodie Collar & Body */}
        <path
          d="M 64 122 C 54 125 44 140 46 168 C 47 175 52 178 60 178 L 124 178 C 132 178 137 175 138 168 C 140 140 130 125 120 122 Z"
          fill={`url(#hoodieShade_${pose})`}
        />
        {/* Kangaroo Pocket */}
        <path
          d="M 68 152 L 116 152 L 122 172 L 62 172 Z"
          fill="#1A1C20"
          stroke="#2A2C32"
          strokeWidth="1.2"
        />

        {/* Orange Hoodie Drawstrings */}
        <path d="M 84 126 L 82 144" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <circle cx="82" cy="145" r="2" fill="#F97316" />
        <path d="M 100 126 L 102 144" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <circle cx="102" cy="145" r="2" fill="#F97316" />

        {/* MarketMe Orange Accent on Chest (Minimalist "M") */}
        <path
          d="M 90 136 L 92 131 L 94 136 L 96 131 L 98 136"
          stroke="#F97316"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 6. Pose Variations for Arms & Props */}
        {pose === 'harry-wave' && (
          <g>
            {/* Waving Right Paw */}
            <path d="M 134 134 C 146 122 156 102 152 90 C 148 84 142 86 140 92 L 126 118" stroke="#1E2024" strokeWidth="12" strokeLinecap="round" />
            <circle cx="152" cy="90" r="8" fill="#FFFFFF" />
            <ellipse cx="152" cy="90" rx="4" ry="3" fill="#F97316" />
            {/* Wave lines */}
            <path d="M 162 82 C 166 86 166 94 162 98" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {(pose === 'harry-point-right' || pose === 'harry-cta') && (
          <g>
            {/* Pointing Right Arm */}
            <path d="M 132 138 L 164 138" stroke="#1E2024" strokeWidth="12" strokeLinecap="round" />
            <circle cx="168" cy="138" r="7" fill="#FFFFFF" />
            {/* Extended pointer finger */}
            <rect x="168" y="135" width="12" height="6" rx="3" fill="#FFFFFF" />
            <circle cx="178" cy="138" r="2" fill="#F97316" />
          </g>
        )}

        {pose === 'harry-point-left' && (
          <g>
            {/* Pointing Left Arm */}
            <path d="M 52 138 L 20 138" stroke="#1E2024" strokeWidth="12" strokeLinecap="round" />
            <circle cx="16" cy="138" r="7" fill="#FFFFFF" />
            <rect x="4" y="135" width="12" height="6" rx="3" fill="#FFFFFF" />
            <circle cx="6" cy="138" r="2" fill="#F97316" />
          </g>
        )}

        {pose === 'harry-analyse' && (
          <g>
            {/* Holding translucent HUD Tablet / Magnifier */}
            <rect x="120" y="105" width="40" height="30" rx="4" fill="#18191E" stroke="#F97316" strokeWidth="1.5" />
            <path d="M 126 124 L 132 118 L 138 122 L 148 112 L 154 116" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="148" cy="112" r="2" fill="#22C55E" />
            {/* Harry's paw holding the tablet */}
            <circle cx="120" cy="120" r="6" fill="#FFFFFF" />
          </g>
        )}

        {pose === 'harry-idea' && (
          <g>
            {/* Idea Bulb above head */}
            <circle cx="92" cy="16" r="9" fill="#F97316" opacity="0.9" />
            <path d="M 88 24 L 96 24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M 90 27 L 94 27" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            {/* Radiating beams */}
            <line x1="92" y1="3" x2="92" y2="0" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
            <line x1="77" y1="12" x2="74" y2="10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
            <line x1="107" y1="12" x2="110" y2="10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {pose === 'harry-celebrate' && (
          <g>
            {/* Both arms up in air */}
            <path d="M 54 135 L 36 102" stroke="#1E2024" strokeWidth="10" strokeLinecap="round" />
            <circle cx="34" cy="98" r="7" fill="#FFFFFF" />
            <path d="M 130 135 L 148 102" stroke="#1E2024" strokeWidth="10" strokeLinecap="round" />
            <circle cx="150" cy="98" r="7" fill="#FFFFFF" />
            {/* Confetti sparks */}
            <circle cx="28" cy="80" r="2" fill="#F97316" />
            <circle cx="156" cy="80" r="2" fill="#F97316" />
            <path d="M 92 48 L 94 44" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* 7. Cargo Pants */}
        <path d="M 64 178 L 62 198 L 86 198 L 90 180 Z" fill="#141518" />
        <path d="M 94 180 L 98 198 L 122 198 L 120 178 Z" fill="#141518" />
        {/* Cargo pocket flaps with orange tabs */}
        <rect x="58" y="184" width="12" height="6" rx="1.5" fill="#1E2024" stroke="#2B2D33" strokeWidth="0.8" />
        <rect x="59" y="188" width="4" height="1.5" fill="#F97316" />
        <rect x="114" y="184" width="12" height="6" rx="1.5" fill="#1E2024" stroke="#2B2D33" strokeWidth="0.8" />
        <rect x="121" y="188" width="4" height="1.5" fill="#F97316" />

        {/* 8. Chunky Black/White/Orange Sneakers */}
        {/* Left Sneaker */}
        <path
          d="M 54 206 C 54 200 60 198 72 198 L 86 198 L 86 208 C 86 211 80 212 66 212 L 56 212 C 54 212 54 209 54 206 Z"
          fill="#111215"
        />
        {/* White Sole */}
        <rect x="52" y="209" width="36" height="4" rx="2" fill="#FFFFFF" />
        {/* Orange Accent Stripe */}
        <path d="M 64 203 L 78 203" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Sneaker */}
        <path
          d="M 98 198 L 112 198 C 124 198 130 200 130 206 C 130 209 130 212 128 212 L 118 212 C 104 212 98 211 98 208 Z"
          fill="#111215"
        />
        {/* White Sole */}
        <rect x="96" y="209" width="36" height="4" rx="2" fill="#FFFFFF" />
        {/* Orange Accent Stripe */}
        <path d="M 106 203 L 120 203" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};
