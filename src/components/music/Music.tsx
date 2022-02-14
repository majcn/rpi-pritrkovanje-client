import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import AbcPlayer from '../../music-player/AbcPlayer';
import './Music.css';

import { tempoState } from '../../store/atoms';
import { songAsAbcTextState } from '../../store/selectors';

function Music() {
  const setTempo = useSetRecoilState(tempoState);
  const songAsAbcText = useRecoilValue(songAsAbcTextState);

  const paperElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paperElRef.current !== null) {
      const { bpm } = AbcPlayer.init(songAsAbcText, paperElRef.current);
      setTempo(bpm);
    }
  }, [songAsAbcText, setTempo]);

  return (
    <div className="w-full lg:w-[750px] inline-block align-middle text-center">
      <div ref={paperElRef} />
    </div>
  );
}

export default Music;
