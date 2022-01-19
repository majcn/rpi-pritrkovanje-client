import ABCJS from 'abcjs';
import { createAudioContext } from '../util';
import CursorControl from './CursorControl';

class AbcPlayer {
  private cursorControl!: CursorControl;

  private visualObj!: ABCJS.TuneObject;

  private timingCallbacks!: ABCJS.TimingCallbacks;

  private readonly audioContext = createAudioContext();

  private readonly midiBuffer = new ABCJS.synth.CreateSynth();

  private voicesOff = [] as number[];

  private currentLocation = 0;

  private isPlaying = false;

  init(song: string, paperEl: HTMLDivElement) {
    [this.visualObj] = ABCJS.renderAbc(paperEl, song, {
      responsive: 'resize',
      clickListener: this.visualObj__ClickListener.bind(this),
    });

    if (this.cursorControl !== undefined) {
      this.cursorControl.onFinished();
    }

    this.cursorControl = new CursorControl(
      paperEl.getElementsByTagName('svg')[0]
    );
  }

  async setVoicesOff(voicesOff: number[]) {
    this.voicesOff = voicesOff;

    if (this.isPlaying) {
      this.stop();
      await this.play();
    }
  }

  async play() {
    if (this.isPlaying) {
      return;
    }

    await this.audioContext.resume();

    await this.midiBuffer.init({
      audioContext: this.audioContext,
      visualObj: this.visualObj,
      options: {
        voicesOff: this.voicesOff,
      },
    });

    if (this.timingCallbacks !== undefined) {
      this.timingCallbacks.stop();
    }

    this.timingCallbacks = new ABCJS.TimingCallbacks(this.visualObj, {
      beatCallback: this.timing__beatCallback.bind(this),
      eventCallback: this.timing__eventCallback.bind(this),
    });

    await this.midiBuffer.prime();

    this.cursorControl.onStart();

    this.midiBuffer.seek(this.currentLocation, 'seconds');
    this.timingCallbacks.setProgress(this.currentLocation, 'seconds');
    this.midiBuffer.start();
    this.timingCallbacks.start();
    this.isPlaying = true;
  }

  stop() {
    if (this.isPlaying) {
      this.currentLocation = this.midiBuffer.pause();
      this.timingCallbacks.pause();
      this.isPlaying = false;
    }
  }

  private visualObj__ClickListener(abcElem: ABCJS.AbcElem) {
    this.midiBuffer.seek(abcElem.counters.note, 'beats');
    this.timingCallbacks.setProgress(abcElem.counters.note, 'beats');
    this.stop();
    this.play();
  }

  private timing__beatCallback(beatNumber: number, totalBeats: number) {
    if (beatNumber === totalBeats) {
      this.midiBuffer.seek(0);
      this.timingCallbacks.setProgress(0);
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
