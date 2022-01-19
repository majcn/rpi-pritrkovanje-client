// import songAsData from './song.txt?raw';

const songAsData = `X: 1
T: Petka okrog na 3 zvonove (gorenjsko gostenje)
M: 4/4
L: 1/8
K: B
Q: 120
V:Z1 clef=alto name="Prvi zvon"
%%MIDI program 14
| A, z z z z z z z | A, z z z z z z z | A, z z z A, z z z | 
| A, z z A, z A, z A, | z A, z A, z A, z A, | z A, z A, z A, z A, | 
| z A, z A, z A, z A, | z A, z z z z z z | z z A, z A, z A, z | 
| z z A, z A, z A, z | z z A, z z z A, z | z z A, z A, z A, z |
V:Z2 clef=alto name="Drugi zvon"
%%MIDI program 14
| z z C z C z C z | z z C z C z C z | z z C z z z C z | 
| z z C z C z C z | C z z z z z z z | C z z z z z z z | 
| C z z z C z z z | C z z C z C z C | z C z C z C z C | 
| z C z C z C z C | z C z C z C z C | z C z z z z z z |
V:Z3 clef=treble name="Tretji zvon"
%%MIDI program 14
| z E z E z E z E | z E z E z E z E | z E z E z E z E | 
| z E z z z z z z | z z E z E z E z | z z E z E z E z | 
| z z E z z z E z | z z E z E z E z | E z z z z z z z | 
| E z z z z z z z | E z z z E z z z | E z z E z E z E |`;

export default { songAsData };
