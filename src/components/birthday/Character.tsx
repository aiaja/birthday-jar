import React from 'react';
import { CharacterState } from '@/types/birthday';
import { characterAssets } from '@/data/characterAssets';

export interface CharacterProps {
  state?: CharacterState;
  isEntered?: boolean;
  className?: string;
}

export const Character: React.FC<CharacterProps> = ({
  state = 'walking',
  isEntered = true,
  className = '',
}) => {
  const assetSrc = characterAssets[state];

  return (
    <div
      id="char"
      className={`char ${isEntered ? 'in' : ''} ${className}`.trim()}
      data-state={state}
      role="img"
      aria-label="Chibi Aisya (placeholder illustration)"
      style={{ width: 112, flex: 'none' }}
    >
      {assetSrc ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          id="charImg"
          className="char-img"
          src={assetSrc}
          alt=""
          style={{ display: 'block', width: '100%' }}
        />
      ) : (
        <svg
          id="charSvg"
          className="char-svg"
          viewBox="0 0 120 150"
          width="112"
          height="140"
          style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }}
          aria-hidden="true"
        >
          <g className="think" opacity={0}>
            <circle cx="92" cy="14" r="3" fill="#2B2A33" />
            <circle cx="102" cy="8" r="4" fill="#2B2A33" />
            <circle cx="114" cy="0" r="5" fill="#2B2A33" />
          </g>
          <g className="leg l">
            <rect
              x="42"
              y="118"
              width="12"
              height="28"
              rx="6"
              fill="#2B2A33"
            />
          </g>
          <g className="leg r">
            <rect
              x="66"
              y="118"
              width="12"
              height="28"
              rx="6"
              fill="#2B2A33"
            />
          </g>
          <g className="char-body">
            <path
              className="hair"
              d="M24 56C24 28 40 12 60 12s36 16 36 44v34H24z"
              fill="#2B2A33"
            />
            <g className="arm l">
              <rect
                x="27"
                y="86"
                width="13"
                height="32"
                rx="6.5"
                fill="#FFE2C6"
                stroke="#2B2A33"
                strokeWidth="2.5"
              />
            </g>
            <rect
              className="dress"
              x="38"
              y="82"
              width="44"
              height="42"
              rx="14"
              fill="#FF5FA2"
              stroke="#2B2A33"
              strokeWidth="2.5"
            />
            <g className="arm r">
              <rect
                x="80"
                y="86"
                width="13"
                height="32"
                rx="6.5"
                fill="#FFE2C6"
                stroke="#2B2A33"
                strokeWidth="2.5"
              />
            </g>
            <circle
              className="skin"
              cx="60"
              cy="58"
              r="29"
              fill="#FFE2C6"
              stroke="#2B2A33"
              strokeWidth="2.5"
            />
            <path
              className="hair"
              d="M31 54c2-20 15-31 29-31s27 11 29 31c-10-3-21-12-29-18-8 6-19 15-29 18z"
              fill="#2B2A33"
            />
            <circle
              className="eye"
              cx="49"
              cy="62"
              r="3"
              fill="#2B2A33"
            />
            <circle
              className="eye"
              cx="71"
              cy="62"
              r="3"
              fill="#2B2A33"
            />
            <circle
              className="cheek"
              cx="41"
              cy="70"
              r="5"
              fill="#FF5FA2"
              opacity={0.45}
            />
            <circle
              className="cheek"
              cx="79"
              cy="70"
              r="5"
              fill="#FF5FA2"
              opacity={0.45}
            />
            <path
              className="mouth"
              d="M54 71q6 6 12 0"
              fill="none"
              stroke="#2B2A33"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Character;
