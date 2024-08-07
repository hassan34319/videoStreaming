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

type Props = {
  currentHighlight: Highlight;
};
export function ScoreAction({ currentHighlight }: Props) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  return (
    <div className="flex justify-center items-end z-50 fade-in text-gray-700 w-full text-start bg-[#C3C0FF] bg-opacity-[100%] rounded-[1rem] drop-shadow-xl mt-2 px-2 py-1 max-w-[30%] mx-2  font-bold">
      {currentHighlight.playerName} - {currentHighlight.action}
    </div>
  );
}
