import { selector } from 'recoil';
import { development } from '../util';

import { songUrlState } from './atoms';

// eslint-disable-next-line import/prefer-default-export
export const songAsAbcTextState = selector<string>({
  key: 'songAsAbcText',
  get: async ({ get }) => {
    const songAsAbcTextResponse = await fetch(get(songUrlState)).catch(() => ({
      status: 500,
      text: () => '',
    }));

    if (songAsAbcTextResponse.status !== 200) {
      return development.songAsData;
    }

    return songAsAbcTextResponse.text();
  },
});
