// import songAsData from './song.txt?raw';

const songAsData = `X: 1
T: Petka okrog na 3 zvonove (extra gorenjsko gostenje)
M: 4/4
L: 1/8
K: C
Q: 120
V:Z1 clef=treble name="Prvi zvon"
%%MIDI program 14
| D z z z z z z z | D z z z z z z z | D z z z D z z z | 
| D z z D z D z D | z D z D z D z D/2 D/2 | z D z D z D z D/2 D/2 | 
| z D z D/2 D/2 z D z D/2 D/2 | z D z z z z z z | z z D z D z D z | 
| z z D z D z D z | z z D z z z D z | z z D z D z D z |
V:Z2 clef=treble name="Drugi zvon"
%%MIDI program 14
| z z G z G z G z | z z G z G z G z | z z G z z z G z | 
| z z G z G z G z | G z z z z z z z | G z z z z z z z | 
| G z z z G z z z | G z z G z G z G | z G z G z G z G/2 G/2 |
| z G z G z G z G/2 G/2 | z G z G/2 G/2 z G z G/2 G/2 | z G z z z z z z |
V:Z3 clef=treble name="Tretji zvon"
%%MIDI program 14
| z B z B z B z B | z B/2 B/2 z B z B z B | z B/2 B/2 z B z B/2 B/2 z B | 
| z B/2 B/2 z z z z z z | z z B z B z B z | z z B z B z B z | 
| z z B z z z B z | z z B z B z B z | B z z z z z z z | 
| B z z z z z z z | B z z z B z z z | B z z B z B z B |`;

export default { songAsData };
