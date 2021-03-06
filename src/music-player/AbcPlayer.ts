import ABCJS from 'abcjs';
import CursorControl from './CursorControl';

import { getCurrentTrackMilliseconds } from './tempo-hack';

class AbcPlayer {
  private cursorControl!: CursorControl;

  private visualObj!: ABCJS.TuneObject;

  private timingCallbacks!: ABCJS.TimingCallbacks;

  private readonly midiBuffer = new ABCJS.synth.CreateSynth();

  private voicesOff = [] as number[];

  private readonly defaultBpm = 120;

  private bpm = this.defaultBpm;

  private isPlaying = false;

  private onIsPlayingChangeListener!: (isPlaying: boolean) => void;

  private async initMidiBuffer() {
    await this.midiBuffer.init({
      visualObj: this.visualObj,
      options: {
        qpm: this.bpm,
        voicesOff: this.voicesOff,
      },
    });

    this.timingCallbacks?.stop();
    this.timingCallbacks = new ABCJS.TimingCallbacks(this.visualObj, {
      qpm: this.bpm,
      beatCallback: this.timing__beatCallback.bind(this),
      eventCallback: this.timing__eventCallback.bind(this),
    });

    await this.midiBuffer.prime();
  }

  private async reloadMidi() {
    const currentTrackMilliseconds =
      this.timingCallbacks?.currentMillisecond() ?? 0;

    await this.initMidiBuffer();

    if (this.isPlaying) {
      this.stop();
      this.play();
    }

    this.seek(currentTrackMilliseconds);
  }

  public init(
    song: string,
    paperEl: HTMLDivElement
  ): { title: string; bpm: number } {
    const titleRe = /^T: (.*)$/gm;
    const bpmRe = /^Q: (\d+)$/gm;

    const title = titleRe.exec(song)?.[1] ?? 'No title';
    const bpm = Number(bpmRe.exec(song)?.[1] ?? this.defaultBpm);

    const songToParse = song
      // .replace(titleRe, '')
      .replace(bpmRe, '')
      .replaceAll('\n\n', '\n');

    [this.visualObj] = ABCJS.renderAbc(paperEl, songToParse, {
      responsive: 'resize',
      initialClef: true,
      clickListener: this.visualObj__ClickListener.bind(this),
    });

    this.cursorControl?.onFinished();
    this.cursorControl = new CursorControl(
      paperEl.getElementsByTagName('svg')[0]
    );

    this.bpm = bpm;

    this.initMidiBuffer();

    return {
      title,
      bpm,
    };
  }

  public setTempo(bpm: number) {
    this.bpm = bpm;
    this.reloadMidi();
  }

  public setVoicesOff(voicesOff: number[]) {
    this.voicesOff = voicesOff;
    this.reloadMidi();
  }

  public play() {
    if (this.isPlaying) {
      return;
    }

    ABCJS.synth.activeAudioContext().resume();

    this.midiBuffer.resume();
    this.timingCallbacks.start();
    this.isPlaying = true;
  }

  public seek(currentTrackMilliseconds: number) {
    const currentTrackSeconds = currentTrackMilliseconds / 1000;

    this.midiBuffer.seek(currentTrackSeconds, 'seconds');
    this.timingCallbacks.setProgress(currentTrackSeconds, 'seconds');
  }

  public stop() {
    if (this.isPlaying) {
      this.midiBuffer.pause();
      this.timingCallbacks.pause();
      this.isPlaying = false;
    }
  }

  public setOnIsPlayingChangeListener(listener: (isPlaying: boolean) => void) {
    this.onIsPlayingChangeListener = listener;
  }

  private visualObj__ClickListener(abcElem: ABCJS.AbcElem) {
    const currentTrackMilliseconds = getCurrentTrackMilliseconds(
      abcElem,
      this.timingCallbacks,
      this.visualObj
    );

    this.seek(currentTrackMilliseconds);

    this.play();
    this.onIsPlayingChangeListener(true);
  }

  private timing__beatCallback(beatNumber: number, totalBeats: number) {
    if (beatNumber === totalBeats) {
      this.seek(0);
    }
  }

  private timing__eventCallback(event: ABCJS.TimingEvent) {
    if (event) {
      this.cursorControl.onEvent(event);
    } else {
      this.cursorControl.onFinished();
    }
  }
}

const AbcPlayerSingleton = new AbcPlayer();

export default AbcPlayerSingleton;
