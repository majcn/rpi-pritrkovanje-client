import { useState } from 'react';
import { Container, MainLayout } from './Components/Layout';
import Music from './Components/Music';
import Sidebar from './Components/Siderbar';

function App() {
  const zvonovi = [
    useState(true),
    useState(true),
    useState(true),
    useState(true),
  ];

  const items = [
    { title: 'Prvi zvon', active: zvonovi[0][0] },
    { title: 'Drugi zvon', active: zvonovi[1][0] },
    { title: 'Tretji zvon', active: zvonovi[2][0] },
    { title: 'Četrti zvon', active: zvonovi[3][0] },
  ];

  const handleSidebarClick = (item: string) => {
    const i = items.findIndex((x) => x.title === item);
    const [z, s] = zvonovi[i];
    s(!z);
  };

  return (
    <MainLayout>
      <Container>
        <Music items={items} songAbcUrl="/api/state/song.abc" />
      </Container>

      <Sidebar items={items} onItemClick={handleSidebarClick} />
    </MainLayout>
  );
}

export default App;
