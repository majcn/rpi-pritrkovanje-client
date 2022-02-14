import { Stepper } from 'konsta/react';

import { useRecoilState } from 'recoil';
import { tempoState } from '../../store/atoms';

function TempoStepper() {
  const [tempo, setTempo] = useRecoilState(tempoState);

  return (
    <Stepper
      outline
      value={tempo}
      onPlus={() => setTempo(tempo + 10)}
      onMinus={() => setTempo(tempo - 10)}
    />
  );
}

export default TempoStepper;
