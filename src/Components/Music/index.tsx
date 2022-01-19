import { useEffect, useRef } from 'react';
import useFetch from 'react-fetch-hook';
import AbcPlayer from '../../MusicPlayer/AbcPlayer';
import { development } from '../../util';
import './style.css';

type Props = {
  items: { title: string; active: boolean }[];
  songAbcUrl: string;
};

function Music({ items, songAbcUrl }: Props) {
  const paperElRef = useRef<HTMLDivElement>(null);
  const { data } = useFetch<string>(songAbcUrl, {
    formatter: (response) => response.text(),
  });

  useEffect(() => {
    if (paperElRef.current !== null) {
      AbcPlayer.init(data ?? development.songAsData, paperElRef.current);
    }
  }, [data]);

  useEffect(() => {
    const voicesOff = items
      .map((x, i) => (x.active ? -1 : i))
      .filter((x) => x !== -1);

    AbcPlayer.setVoicesOff(voicesOff);
  }, [items]);

  return (
    <>
      <div className="inline-flex">
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => AbcPlayer.play()}
        >
          Play
        </button>
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
          onClick={() => AbcPlayer.stop()}
        >
          Stop
        </button>
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => alert('TODO')}
        >
          Revert
        </button>
      </div>

      <div className="w-full lg:w-[750px] inline-block align-middle text-center">
        <div ref={paperElRef} />
      </div>
    </>
  );
}

export default Music;
