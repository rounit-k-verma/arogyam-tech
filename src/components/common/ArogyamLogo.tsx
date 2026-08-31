/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface ArogyamLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'horizontal';
  theme?: 'light' | 'dark' | 'auto';
  size?: number | string;
}

export const ArogyamLogo: React.FC<ArogyamLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'full',
  theme = 'auto',
}) => {
  const navyColor = theme === 'dark' ? '#d1e4ff' : '#002845';
  const tealColor = '#00a396';
  const lightTeal = '#14b8a6';

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="AROGYAM TECH Emblem"
      >
        {/* Main 'A' Left Leg */}
        <path
          d="M 100 28 L 48 148 L 74 148 L 88 116 L 100 88 Z"
          fill={navyColor}
        />
        {/* Main 'A' Right Leg with circuit cutouts */}
        <path
          d="M 100 28 L 100 88 L 112 116 L 126 148 L 152 148 L 108 48 Z"
          fill={navyColor}
        />
        {/* Left Foot Serif / Base Accent */}
        <path
          d="M 42 148 L 78 148 L 74 140 L 46 140 Z"
          fill={navyColor}
        />
        {/* Right Foot Serif / Base Accent */}
        <path
          d="M 122 148 L 158 148 L 154 140 L 126 140 Z"
          fill={navyColor}
        />

        {/* Medical Cross in center */}
        <path
          d="M 94 92 H 106 V 99 H 113 V 111 H 106 V 118 H 94 V 111 H 87 V 99 H 94 Z"
          fill={tealColor}
        />

        {/* Circuit Traces extending to the right */}
        <path
          d="M 116 102 L 140 102 L 150 92 L 160 92"
          stroke={tealColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="163" cy="92" r="4.5" fill={tealColor} />

        <path
          d="M 116 108 L 154 108"
          stroke={tealColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="157" cy="108" r="4.5" fill={tealColor} />

        <path
          d="M 120 114 L 146 114 L 154 122 L 168 122"
          stroke={tealColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="171" cy="122" r="4.5" fill={tealColor} />
      </svg>
    );
  }

  // Full Stacked Logo (Emblem + AROGYAM + TECHNOLOGIES)
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AROGYAM TECHNOLOGIES Logo"
    >
      <g transform="translate(40, 10)">
        <path
          d="M 100 25 L 42 165 L 72 165 L 88 126 L 100 95 Z"
          fill={navyColor}
        />
        <path
          d="M 100 25 L 100 95 L 112 126 L 128 165 L 158 165 L 109 46 Z"
          fill={navyColor}
        />
        <path d="M 36 165 L 76 165 L 72 157 L 40 157 Z" fill={navyColor} />
        <path d="M 124 165 L 164 165 L 160 157 L 128 157 Z" fill={navyColor} />

        <path
          d="M 94 98 H 106 V 106 H 114 V 118 H 106 V 126 H 94 V 118 H 86 V 106 H 94 Z"
          fill={tealColor}
        />

        <path
          d="M 117 108 L 140 108 L 152 96 L 164 96"
          stroke={tealColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="168" cy="96" r="5" fill={tealColor} />

        <path
          d="M 117 115 L 156 115"
          stroke={tealColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="160" cy="115" r="5" fill={tealColor} />

        <path
          d="M 122 122 L 146 122 L 156 132 L 172 132"
          stroke={tealColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="176" cy="132" r="5" fill={tealColor} />
      </g>

      <text
        x="140"
        y="235"
        textAnchor="middle"
        fill={navyColor}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="8"
      >
        AROGYAM
      </text>

      <line
        x1="45"
        y1="262"
        x2="68"
        y2="262"
        stroke={tealColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <text
        x="140"
        y="266"
        textAnchor="middle"
        fill={lightTeal}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="6"
      >
        TECHNOLOGIES
      </text>

      <line
        x1="212"
        y1="262"
        x2="235"
        y2="262"
        stroke={tealColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
