import React from 'react';

export const SheepIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g transform="translate(0, 5)">
      {/* Legs */}
      <rect x="30" y="60" width="8" height="25" rx="4" fill="#374151" />
      <rect x="45" y="60" width="8" height="25" rx="4" fill="#374151" />
      <rect x="60" y="60" width="8" height="25" rx="4" fill="#374151" />
      <rect x="75" y="60" width="8" height="25" rx="4" fill="#374151" />
      
      {/* Body / Wool */}
      <path fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" d="M 35 65 C 20 65 20 40 35 40 C 35 25 55 25 65 35 C 75 25 90 35 85 50 C 95 55 95 70 80 70 C 75 75 45 75 40 65 Z" />
      
      {/* Tail */}
      <circle cx="85" cy="55" r="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
      
      {/* Head */}
      <path fill="#374151" d="M 15 35 C 5 35 5 55 10 60 C 20 65 25 60 25 50 C 30 40 25 35 15 35 Z" />
      
      {/* Ears */}
      <ellipse cx="10" cy="50" rx="4" ry="10" transform="rotate(-30 10 50)" fill="#1f2937" />
      
      {/* Horns for Ram */}
      <path fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" d="M 22 38 C 30 25 40 30 35 45 C 32 50 25 45 28 40" />
      
      {/* Eye */}
      <circle cx="15" cy="45" r="3" fill="#ffffff" />
      <circle cx="14" cy="45" r="1.5" fill="#000000" />
    </g>
  </svg>
);

export const CamelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g transform="translate(0, 5)">
      {/* Legs */}
      <path fill="#b45309" d="M 30 60 L 30 85 L 25 85 L 25 60 Z"/>
      <path fill="#d97706" d="M 40 60 L 40 85 L 35 85 L 35 60 Z"/>
      <path fill="#b45309" d="M 75 60 L 75 85 L 70 85 L 70 60 Z"/>
      <path fill="#d97706" d="M 85 60 L 85 85 L 80 85 L 80 60 Z"/>
      
      {/* Body & Hump */}
      <path fill="#f59e0b" d="M 20 65 C 10 65 15 50 25 45 C 20 30 40 20 50 35 C 60 20 80 30 85 45 C 95 50 90 65 80 65 Z" />
      
      {/* Neck & Head */}
      <path fill="#f59e0b" d="M 25 45 C 10 40 10 20 15 20 C 25 20 30 30 30 40 Z" />
      <circle cx="20" cy="25" r="8" fill="#f59e0b" />
      <path fill="#f59e0b" d="M 15 20 C 5 20 5 30 15 30 Z" />
      
      {/* Eye */}
      <circle cx="18" cy="24" r="2" fill="#000000" />
    </g>
  </svg>
);

export const KaabaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g transform="translate(10, 10)">
      {/* Top Face */}
      <polygon points="40,25 70,40 40,55 10,40" fill="#374151" />
      {/* Left Face */}
      <polygon points="10,40 40,55 40,90 10,75" fill="#000000" />
      {/* Right Face */}
      <polygon points="40,55 70,40 70,75 40,90" fill="#111827" />
      
      {/* Gold Band Left */}
      <polygon points="10,50 40,65 40,70 10,55" fill="#f59e0b" />
      {/* Gold Band Right */}
      <polygon points="40,65 70,50 70,55 40,70" fill="#fbbf24" />
      
      {/* Door */}
      <polygon points="45,67 55,62 55,82 45,87" fill="#fbbf24" />
      {/* Door details */}
      <line x1="50" y1="65" x2="50" y2="84" stroke="#d97706" strokeWidth="0.5" />
    </g>
  </svg>
);

export const MoonStarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <g transform="translate(5, 5)">
      {/* Crescent */}
      <path fill="#fde047" d="M 50 10 C 75 10 90 30 90 50 C 90 75 70 90 45 90 C 20 90 10 70 10 50 C 10 40 15 30 25 25 C 15 35 15 55 25 70 C 35 85 55 85 70 70 C 80 55 80 35 70 20 C 65 15 55 12 50 10 Z" />
      {/* Star */}
      <polygon fill="#fef08a" points="75,20 80,30 90,32 82,40 85,50 75,45 65,50 68,40 60,32 70,30" />
    </g>
  </svg>
);

export const FamilyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    {/* Father */}
    <circle cx="35" cy="40" r="12" fill="#38bdf8" />
    <path fill="#0284c7" d="M 35 55 C 20 55 15 70 15 90 L 55 90 C 55 70 50 55 35 55 Z" />
    
    {/* Son */}
    <circle cx="65" cy="55" r="9" fill="#a7f3d0" />
    <path fill="#10b981" d="M 65 65 C 55 65 52 75 52 90 L 78 90 C 78 75 75 65 65 65 Z" />
    
    {/* Heart */}
    <path fill="#f43f5e" d="M 45 35 C 45 30 55 30 50 40 C 45 30 35 30 45 35 Z" transform="translate(5, -15) scale(1.5)" />
  </svg>
);
