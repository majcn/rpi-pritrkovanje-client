import { useEffect, useRef } from 'react';
import useFetch from 'react-fetch-hook';
import AbcPlayer from '../../MusicPlayer/AbcPlayer';
import { development } from '../../util';
import './style.css';

type Props = {
  bells: boolean[];
  songAbcUrl: string;
  setTempo: (bpm: number) => void;
  setTitle: (title: string) => void;
};

function Music({ bells, songAbcUrl, setTempo, setTitle }: Props) {
  const paperElRef = useRef<HTMLDivElement>(null);
  const { data } = useFetch<string>(songAbcUrl, {
    formatter: (response) => response.text(),
  });

  useEffect(() => {
    if (paperElRef.current !== null) {
      const { title, bpm } = AbcPlayer.init(
        data ?? development.songAsData,
        paperElRef.current
      );

      setTitle(title);
      setTempo(bpm);
    }
  }, [data, setTempo, setTitle]);

  useEffect(() => {
    const voicesOff = bells.map((x, i) => (x ? -1 : i)).filter((x) => x !== -1);

    AbcPlayer.setVoicesOff(voicesOff);
  }, [bells]);

  return (
    <div className="w-full lg:w-[750px] inline-block align-middle text-center">
      <div ref={paperElRef} />
    </div>
  );
}

export default Music;
