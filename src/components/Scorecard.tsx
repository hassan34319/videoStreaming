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
export function Scorecard({ currentHighlight }: Props) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  return (
    <div className="flex justify-between z-50 fade-in text-white w-full text-start bg-[#C3C0FF] bg-opacity-[100%] rounded-[1rem] drop-shadow-xl mt-2 px-2 py-1 max-w-[50%]">
      <div className="flex w-[80%] items-center justify-between">
        <div className="flex items-center">
          <img
            src={currentHighlight.team1Logo}
            alt={`${currentHighlight.team1Name} logo`}
            className="w-8 h-8 mr-2 rounded-full border border-gray-300"
          />
          <div className="text-md font-semibold">
            {currentHighlight.team1Name}
          </div>
        </div>
        <div className="text-lg font-bold">
          {currentHighlight.team1Score} - {currentHighlight.team2Score}
        </div>
        <div className="flex items-center">
          <img
            src={currentHighlight.team2Logo}
            alt={`${currentHighlight.team2Name} logo`}
            className="w-8 h-8 ml-4 rounded-full border border-gray-300"
          />
          <div className="text-md font-semibold">
            {currentHighlight.team2Name}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-700">
        <div className="bg-gray-700 text-white p-2 rounded-xl">
          {formatTime(currentHighlight.start)}
        </div>
      </div>
    </div>
  );
}
