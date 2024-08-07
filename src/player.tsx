import '@vidstack/react/player/styles/base.css';
import { useEffect, useRef, useState } from 'react';
import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  useStore,
  type MediaCanPlayDetail,
  type MediaCanPlayEvent,
  MediaPlayerInstance,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import { VideoLayout } from './components/layouts/video-layout';
import { textTracks } from './tracks';

const highlights = [
  {
    name: 'Goal by Player 1',
    start: 5,
    end: 15,
    team1Name: 'Team A',
    team1Score: 1,
    team2Name: 'Team B',
    team2Score: 0,
    action: 'Goal',
    playerName: 'Player 1',
    team1Logo:
      'https://clipart.info/images/ccovers/1503438031pakistan-football-logo-png.png',
    team2Logo:
      'https://micras.org/wiki/images/7/77/Victoria_national_football_team_logo_2014.png',
  },
  {
    name: 'Amazing Save by Goalkeeper',
    start: 800,
    end: 810,
    team1Name: 'Team A',
    team1Score: 1,
    team2Name: 'Team B',
    team2Score: 0,
    action: 'Save',
    playerName: 'Goalkeeper',
    team1Logo:
      'https://clipart.info/images/ccovers/1503438031pakistan-football-logo-png.png',
    team2Logo:
      'https://micras.org/wiki/images/7/77/Victoria_national_football_team_logo_2014.png',
  },
  {
    name: 'Yellow Card Incident',
    start: 1600,
    end: 1610,
    team1Name: 'Team A',
    team1Score: 1,
    team2Name: 'Team B',
    team2Score: 1,
    action: 'Yellow Card',
    playerName: 'Player 2',
    team1Logo:
      'https://clipart.info/images/ccovers/1503438031pakistan-football-logo-png.png',
    team2Logo:
      'https://micras.org/wiki/images/7/77/Victoria_national_football_team_logo_2014.png',
  },
  {
    name: 'Another Goal by Player 2',
    start: 50,
    end: 60,
    team1Name: 'Team A',
    team1Score: 2,
    team2Name: 'Team B',
    team2Score: 1,
    action: 'Goal',
    playerName: 'Player 2',
    team1Logo:
      'https://clipart.info/images/ccovers/1503438031pakistan-football-logo-png.png',
    team2Logo:
      'https://micras.org/wiki/images/7/77/Victoria_national_football_team_logo_2014.png',
  },
  {
    name: 'Final Whistle',
    start: 65,
    end: 75,
    team1Name: 'Team A',
    team1Score: 2,
    team2Name: 'Team B',
    team2Score: 1,
    action: 'End of Match',
    playerName: 'Referee',
    team1Logo:
      'https://clipart.info/images/ccovers/1503438031pakistan-football-logo-png.png',
    team2Logo:
      'https://micras.org/wiki/images/7/77/Victoria_national_football_team_logo_2014.png',
  },
];
export function Player() {
  const playerRef = useRef<MediaPlayerInstance>(null);
  const { currentTime, duration, ended } = useStore(
    MediaPlayerInstance,
    playerRef
  );
  const [currentHighlight, setCurrentHighlight] = useState(highlights[0]);
  const [playNext, setPlayNext] = useState(true);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    // Reset the timer and play the video when the highlight changes
    player.currentTime = 0.01;
    player.play().catch((err) => {
      console.error('Failed to autoplay:', err);
    });
  }, [currentHighlight]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (ended && playNext) {
      const currentIndex = highlights.indexOf(currentHighlight);
      if (currentIndex < highlights.length - 1) {
        setCurrentHighlight(highlights[currentIndex + 1]);
      }
    }
  }, [ended, playNext]);

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent
  ) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  return (
    <div>
      <MediaPlayer
        className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
        title="Sprite Fight"
        src="https://hiwajovideov2.azureedge.net/videos/4-2024-114654-2024-05-04-min.mp4"
        crossOrigin
        clipStartTime={currentHighlight.start}
        clipEndTime={currentHighlight.end}
        playsInline
        onProviderChange={onProviderChange}
        ref={playerRef}
        autoPlay={true}
        paused={false}
        preload="auto"
        controlsDelay={100000000000}
      >
        <MediaProvider>
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src="https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
          {textTracks.map((track) => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>

        <VideoLayout
          thumbnails="https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          setCurrentHighlight={setCurrentHighlight}
          highlights={highlights}
          currentHighlight={currentHighlight}
          playNext={playNext}
          setPlayNext={setPlayNext}
        />
      </MediaPlayer>
    </div>
  );
}
