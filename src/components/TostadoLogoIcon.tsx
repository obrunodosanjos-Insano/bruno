import React from 'react';

interface TostadoLogoIconProps {
  className?: string;
  size?: number;
}

export const TostadoLogoIcon: React.FC<TostadoLogoIconProps> = ({
  className = 'w-8 h-8 text-stone-950',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tostado Logo - Grão de Café Trincado"
    >
      {/* Steam Flame above the bean */}
      <path
        d="M 98 12 C 92 26, 108 36, 100 50 C 96 56, 92 61, 98 68 C 100 66, 102 62, 99 59 C 105 48, 90 38, 98 23 C 100 20, 99 14, 98 12 Z"
        fill="currentColor"
      />

      {/* Main Group for Coffee Bean tilted */}
      <g>
        {/* Main shell of coffee bean */}
        <path
          d="
            M 98 60
            C 56 58, 30 88, 32 124
            C 34 154, 60 174, 90 170
            C 118 166, 145 144, 148 116
            C 152 94, 134 62, 98 60 Z
          "
          fill="currentColor"
        />

        {/* Left Edge Highlight Curve */}
        <path
          d="
            M 46 106
            C 42 120, 50 140, 64 150
            C 56 142, 50 126, 52 110
            Z
          "
          fill="#ffffff"
        />

        {/* Coffee Bean Center Groove (S-Curve) */}
        <path
          d="
            M 98 64
            C 88 80, 70 102, 64 120
            C 58 136, 62 148, 78 160
            C 68 152, 62 140, 68 126
            C 76 108, 92 86, 102 66
            Z
          "
          fill="#ffffff"
        />

        {/* Fissures / Cracks Network across the bean body */}
        <polygon points="126,78 112,90 122,100 106,112 120,124 134,108 126,98 138,86" fill="#ffffff" />
        <polygon points="112,90 96,96 88,106 98,110 106,100" fill="#ffffff" />
        <polygon points="122,100 108,122 98,134 106,140 116,128 128,114" fill="#ffffff" />
        <polygon points="106,112 92,120 82,136 90,138 100,126" fill="#ffffff" />
        <polygon points="130,90 140,86 136,96 128,98" fill="#ffffff" />

        {/* Shattered Particles and Flying Shards (Right Side Explosion) */}
        <polygon points="142,74 148,70 146,78 140,80" fill="currentColor" />
        <polygon points="150,80 157,76 154,85 148,86" fill="currentColor" />
        <polygon points="144,88 152,86 149,94 142,94" fill="currentColor" />
        <polygon points="156,88 164,84 160,93 153,92" fill="currentColor" />
        <polygon points="146,98 154,96 151,104 144,103" fill="currentColor" />
        <polygon points="158,98 166,94 162,103 156,102" fill="currentColor" />
        <polygon points="142,108 150,106 147,114 140,113" fill="currentColor" />
        <polygon points="154,108 162,104 158,113 151,112" fill="currentColor" />
        <polygon points="139,118 146,116 143,124 137,122" fill="currentColor" />
        <polygon points="150,118 156,115 153,123 147,121" fill="currentColor" />
        <polygon points="134,128 140,126 137,132 132,131" fill="currentColor" />
        <polygon points="144,130 149,128 146,135 141,133" fill="currentColor" />
        <polygon points="129,138 134,137 131,142 127,141" fill="currentColor" />
      </g>
    </svg>
  );
};
