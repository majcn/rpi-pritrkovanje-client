import { useState, useEffect } from 'react';
import Music from './Components/Music';

import AbcPlayer from './MusicPlayer/AbcPlayer';
import MobileLayout from './Components/Mobile/Layout';

function App() {
  const [bell1, setBell1] = useState(true);
  const [bell2, setBell2] = useState(true);
  const [bell3, setBell3] = useState(true);
  const [bell4, setBell4] = useState(true);

  const bells = [bell1, bell2, bell3, bell4];
  const bellSetters = [setBell1, setBell2, setBell3, setBell4];

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusicPlaying = () => {
    if (isMusicPlaying) {
      AbcPlayer.stop();
      setIsMusicPlaying(false);
    } else {
      AbcPlayer.play();
      setIsMusicPlaying(true);
    }
  };

  const [tempo, setTempo] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (tempo > 0) {
      AbcPlayer.setTempo(tempo);
    }
  }, [tempo]);

  return (
    <MobileLayout
      theme="ios"
      server={false}
      title={title}
      bells={bells}
      onBellClick={(i) => bellSetters[i](!bells[i])}
      bpm={tempo}
      setBpm={setTempo}
      isMusicPlaying={isMusicPlaying}
      toggleMusicPlaying={toggleMusicPlaying}
    >
      <Music
        bells={bells}
        setTempo={setTempo}
        setTitle={setTitle}
        songAbcUrl="/api/state/song.abc"
      />
    </MobileLayout>
  );
}

export default App;
