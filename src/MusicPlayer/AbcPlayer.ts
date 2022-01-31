import ABCJS from 'abcjs';
import CursorControl from './CursorControl';

class AbcPlayer {
  private cursorControl!: CursorControl;

  private visualObj!: ABCJS.TuneObject;

  private timingCallbacks!: ABCJS.TimingCallbacks;

  private readonly midiBuffer = new ABCJS.synth.CreateSynth();

  private voicesOff = [] as number[];

  private isPlaying = false;

  private async initMidiBuffer() {
    await this.midiBuffer.init({
      visualObj: this.visualObj,
      options: {
        voicesOff: this.voicesOff,
      },
    });

    this.timingCallbacks?.stop();
    this.timingCallbacks = new ABCJS.TimingCallbacks(this.visualObj, {
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

  public init(song: string, paperEl: HTMLDivElement) {
    [this.visualObj] = ABCJS.renderAbc(paperEl, song, {
      responsive: 'resize',
      clickListener: this.visualObj__ClickListener.bind(this),
    });

    this.cursorControl?.onFinished();
    this.cursorControl = new CursorControl(
      paperEl.getElementsByTagName('svg')[0]
    );

    this.initMidiBuffer();
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

  private visualObj__ClickListener(abcElem: ABCJS.AbcElem) {
    this.seek(abcElem.currentTrackMilliseconds);
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
