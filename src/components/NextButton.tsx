import { Tooltip, type TooltipPlacement } from '@vidstack/react';

import { NextIcon } from '@vidstack/react/icons';

interface Highlight {
  name: string;
  start: number;
  end: number;
  team1Name: string;
  team1Score: number;
  team2Name: string;
  team2Score: number;
  action: string;
  playerName: string;
  team1Logo: string;
  team2Logo: string;
}

export interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement;
  setCurrentHighlight: (highlight: Highlight) => void;
  highlights: Highlight[];
  currentHighlight: Highlight;
}

export const buttonClass =
  'group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4';

export const tooltipClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden';

export function NextButton({
  tooltipPlacement,
  highlights,
  setCurrentHighlight,
  currentHighlight,
}: MediaButtonProps) {
  const handleNextClick = () => {
    console.log('Play Next');
    const currentIndex = highlights.indexOf(currentHighlight);
    if (currentIndex < highlights.length - 1) {
      setCurrentHighlight(highlights[currentIndex + 1]);
    }
  };
  return (
    <div>
      <div>
        <button
          className={buttonClass}
          onClick={handleNextClick}
          disabled={
            highlights.indexOf(currentHighlight) == highlights.length - 1
          }
        >
          <NextIcon
            className={`h-8 w-8 ${
              highlights.indexOf(currentHighlight) == highlights.length - 1
                ? 'opacity-20'
                : 'opacity-100'
            }`}
            aria-disabled={
              highlights.indexOf(currentHighlight) == highlights.length - 1
            }
          />
        </button>
      </div>
    </div>
  );
}
