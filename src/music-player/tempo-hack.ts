import type ABCJS from 'abcjs';

function getCurrentTrackMillisecondsIndex(
  timingCallbacks: ABCJS.TimingCallbacks,
  visualObj: ABCJS.TuneObject
) {
  const timing = timingCallbacks.noteTimings.reduce((prev, curr) => {
    const prevDiff = Math.abs(prev.milliseconds - prev.millisecondsPerMeasure);
    const currDiff = Math.abs(curr.milliseconds - curr.millisecondsPerMeasure);

    return prevDiff < currDiff ? prev : curr;
  });

  if (timing.startChar === undefined) {
    return 0;
  }

  const elementAtTimingChar = visualObj.getElementFromChar(timing.startChar);

  if (elementAtTimingChar === null) {
    return 0;
  }

  const { currentTrackMilliseconds } = elementAtTimingChar as unknown as {
    currentTrackMilliseconds: number[];
  };

  const index = currentTrackMilliseconds.findIndex(
    (el) => Math.trunc(el) === Math.trunc(timing.millisecondsPerMeasure)
  );

  if (index === -1) {
    return 0;
  }

  return index;
}

// eslint-disable-next-line import/prefer-default-export
export function getCurrentTrackMilliseconds(
  abcElem: ABCJS.AbcElem,
  timingCallbacks: ABCJS.TimingCallbacks,
  visualObj: ABCJS.TuneObject
) {
  if (Array.isArray(abcElem.currentTrackMilliseconds)) {
    const index = getCurrentTrackMillisecondsIndex(timingCallbacks, visualObj);
    return abcElem.currentTrackMilliseconds[index];
  }

  return abcElem.currentTrackMilliseconds;
}
