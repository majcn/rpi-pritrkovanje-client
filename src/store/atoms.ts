import { atom } from 'recoil';

import AbcPlayer from '../music-player/AbcPlayer';

export const songUrlState = atom<string>({
  key: 'songUrl',
  default: '/api/state/song.abc',
});

export const bellsState = atom<boolean[]>({
  key: 'bells',
  default: [true, true, true, true],
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        const voicesOff = newValue
          .map((x, i) => (x ? -1 : i))
          .filter((x) => x !== -1);

        AbcPlayer.setVoicesOff(voicesOff);
      });
    },
  ],
});

export const isPlayingState = atom<boolean>({
  key: 'isPlaying',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      AbcPlayer.setOnIsPlayingChangeListener((isPlaying: boolean) => {
        setSelf(isPlaying);
      });

      onSet((newValue) => {
        if (newValue) {
          AbcPlayer.play();
        } else {
          AbcPlayer.stop();
        }
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        AbcPlayer.setOnIsPlayingChangeListener(() => {});
      };
    },
  ],
});

export const tempoState = atom<number>({
  key: 'tempo',
  default: 120,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => AbcPlayer.setTempo(newValue));
    },
  ],
});
