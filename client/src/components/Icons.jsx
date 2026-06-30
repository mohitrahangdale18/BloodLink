import React from 'react';

const baseSvgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  style: { display: 'inline-block', verticalAlign: 'middle' }
};

export const Droplet = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

export const MapPin = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Phone = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const User = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const Calendar = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const Activity = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export const Plus = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Search = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const FileText = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export const LogOut = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const LogIn = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

export const UserPlus = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

export const Check = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const X = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Hospital = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M18 22V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
    <path d="M22 22H2" />
    <path d="M10 14h4" />
    <path d="M12 12v4" />
  </svg>
);

export const Heart = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const Shield = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const Clock = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...baseSvgProps} width={size} height={size} stroke={color} className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
