import type { ReactElement } from 'react';
import {
  Menu,
  Tooltip,
  type MenuPlacement,
  type TooltipPlacement,
} from '@vidstack/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChaptersIcon,
  RadioButtonIcon,
  RadioButtonSelectedIcon,
} from '@vidstack/react/icons';

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

export const submenuClass2 =
  'hidden w-full flex-col items-start justify-center outline-none data-[keyboard]:mt-[-100px] data-[open]:inline-block';

import { buttonClass, tooltipClass } from './buttons';
import { menuClass, submenuClass } from './menus'; // Reuse the styles

export interface ChaptersMenuProps {
  placement?: MenuPlacement;
  tooltipPlacement?: TooltipPlacement;
  setCurrentHighlight: (highlight: Highlight) => void;
  highlights: Highlight[];
  currentHighlight: Highlight;
  playNext: boolean;
  setPlayNext: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const tooltipClass2 =
  'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-black/90 px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden ';

const menuClass2 =
  'animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[400px] min-w-[350px] flex-col overflow-y-auto overscroll-y-contain rounded-md border border-white/10 bg-black/95 p-2.5 font-sans text-[15px] font-medium outline-none backdrop-blur-sm transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden';

export function ChaptersMenu({
  placement,
  tooltipPlacement,
  setCurrentHighlight,
  highlights,
  currentHighlight,
  playNext,
  setPlayNext,
}: ChaptersMenuProps) {
  return (
    <Menu.Root className="parent">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <ChaptersIcon className="h-8 w-8 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90 bg-black bg-opacity-30 rounded-xl" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass}>Highlights</Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={menuClass2} placement={placement}>
        <ChaptersSubmenu
          setCurrentHighlight={setCurrentHighlight}
          highlights={highlights}
          currentHighlight={currentHighlight}
          playNext={playNext}
          setPlayNext={setPlayNext}
        />
      </Menu.Content>
    </Menu.Root>
  );
}

function ChaptersSubmenu({
  highlights,
  setCurrentHighlight,
  currentHighlight,
  playNext,
  setPlayNext,
}: ChaptersMenuProps) {
  const hint = currentHighlight
    ? highlights.find((highlight) => highlight.name === currentHighlight.name)
        ?.name ?? 'None'
    : 'None';

  return (
    <Menu.Root className="">
      <SubmenuButton
        label="Highlights"
        hint={hint}
        icon={ChaptersIcon}
      />
      <Menu.Content className={submenuClass2}>
        <Menu.RadioGroup
          className="w-full flex flex-col"
          value={currentHighlight.name} // Use highlight name to match Radio value
        >
          {highlights.map(({ name }) => (
            <Radio
              value={name}
              onSelect={() =>
                setCurrentHighlight(highlights.find((h) => h.name === name)!)
              }
              key={name}
            >
              {name}
            </Radio>
          ))}
        </Menu.RadioGroup>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
          onClick={() => setPlayNext((prev) => !prev)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {playNext ? 'Disable Autoplay' : 'Enable Autoplay'}
          </span>
        </button>
        {/* <Menu.Item
          className="mt-2 px-4 py-2 cursor-pointer text-center bg-gray-200 rounded hover:bg-gray-300"
          onSelect={() => setPlayNext(!playNext)}
        >
          {playNext ? 'Disable Autoplay' : 'Enable Autoplay'}
        </Menu.Item> */}
      </Menu.Content>
    </Menu.Root>
  );
}

export interface RadioProps extends Menu.RadioProps {}

function Radio({ children, ...props }: RadioProps) {
  return (
    <Menu.Radio
      className="ring-media-focus group relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]"
      {...props}
    >
      <RadioButtonIcon className="h-4 w-4 text-white group-data-[checked]:hidden" />
      <RadioButtonSelectedIcon className="text-media-brand hidden h-4 w-4 group-data-[checked]:block" />
      <span className="ml-2">{children}</span>
    </Menu.Radio>
  );
}

export interface SubmenuButtonProps {
  label: string;
  hint: string;
  icon: any;
}

function SubmenuButton({ label, hint, icon: Icon }: SubmenuButtonProps) {
  return (
    <Menu.Button className="ring-media-focus parent left-0 top-0 z-10 flex w-full cursor-pointer select-none items-start justify-end rounded-sm bg-black/60 p-2.5 outline-none ring-inset data-[open]:sticky data-[open]:-top-12 data-[hocus]:bg-white/10 data-[focus]:ring-[3px]">
      <ChevronLeftIcon className="parent-data-[open]:block -ml-0.5 mr-1.5 hidden h-[18px] w-[18px]" />
      <div className="contents parent-data-[open]:hidden">
        <Icon className="w-5 h-5" />
      </div>
      <span className="ml-1.5 parent-data-[open]:ml-0">{label}</span>
      <span className="ml-auto text-sm text-white/50">{hint}</span>
      <ChevronRightIcon className="parent-data-[open]:hidden ml-0.5 h-[18px] w-[18px] text-sm text-white/50" />
    </Menu.Button>
  );
}
