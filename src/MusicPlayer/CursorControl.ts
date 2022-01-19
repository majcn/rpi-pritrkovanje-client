import type ABCJS from 'abcjs';

class CursorControl implements ABCJS.CursorControl {
  private abcSvg!: SVGElement;

  private cursor: SVGElement;

  constructor(abcSvg: SVGElement) {
    this.cursor = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    this.cursor.setAttribute('class', 'abcjs-cursor');

    this.replaceTarget(abcSvg);
  }

  private replaceTarget(abcSvg: SVGElement) {
    this.abcSvg = abcSvg;
    this.abcSvg.appendChild(this.cursor);
  }

  private setCursor(x: number, y: number, height: number) {
    this.cursor.setAttributeNS(null, 'x1', x.toString());
    this.cursor.setAttributeNS(null, 'x2', x.toString());
    this.cursor.setAttributeNS(null, 'y1', y.toString());
    this.cursor.setAttributeNS(null, 'y2', (y + height).toString());
  }

  private removeAllHighlights() {
    const elements = this.abcSvg.getElementsByClassName('highlight');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].classList.remove('highlight');
    }
  }

  onStart() {
    this.setCursor(0, 0, 0);
  }

  onEvent(ev: ABCJS.NoteTimingEvent) {
    if (ev.measureStart && ev.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

    this.removeAllHighlights();

    const elements = ev.elements as unknown as Array<Array<HTMLElement>>;
    elements.forEach((note) => {
      note
        .filter((element) => element.getAttribute('data-name') === 'note')
        .forEach((element) => element.classList.add('highlight'));
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.setCursor(ev.left! - 2, ev.top!, ev.height!);
  }

  onFinished() {
    this.removeAllHighlights();

    this.setCursor(0, 0, 0);
  }
}

export default CursorControl;
