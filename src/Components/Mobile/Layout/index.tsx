import Ticker from 'react-ticker'

import {
  App,
  Page,
  Navbar,
  Stepper,
  Block,
  Tabbar,
  TabbarLink,
  NavbarBackLink,
  Icon,
} from 'konsta/react';

import {
  IoIosNotificationsOutline,
  IoMdNotificationsOutline,
  IoIosPlay,
  IoMdPlay,
  IoIosPause,
  IoMdPause,
} from 'react-icons/io';

type Props = {
  theme: 'ios' | 'material';
  server: boolean;
  title: string;
  bells: boolean[];
  onBellClick: (i: number) => void;
  bpm: number;
  setBpm: (bpm: number) => void;
  children: React.ReactNode;

  isMusicPlaying: boolean;
  toggleMusicPlaying: () => void;
};

function Layout({
  theme,
  server,
  title,
  bells,
  onBellClick,
  bpm,
  setBpm,
  children,
  isMusicPlaying,
  toggleMusicPlaying,
}: Props) {
  return (
    <App theme={theme} safeAreas>
      <Page>
        <Navbar
          title={title}
          // titleClassName="truncate w-[120px] hover:w-[300px] animate-marquee"
          className="top-0 sticky"
          left={<NavbarBackLink showText text={server ? 'Server' : 'Client'} />}
          right={
            <Stepper
              outline
              value={bpm}
              onPlus={() => setBpm(bpm + 10)}
              onMinus={() => setBpm(bpm - 10)}
            />
          }
        />

        <Block strong className="mt-0 text-center">
          {children}
        </Block>

        <Tabbar labels className="left-0 bottom-0 fixed">
          {bells.map((bell, i) => (
            <TabbarLink
              key={i}
              active={bell}
              onClick={() => onBellClick(i)}
              label={
                <Icon
                  ios={<IoIosNotificationsOutline className="w-7 h-7" />}
                  material={<IoMdNotificationsOutline className="w-7 h-7" />}
                  badge={i + 1}
                  badgeColors={{
                    bg: bell ? 'bg-blue-500' : 'bg-gray-500/50',
                  }}
                />
              }
            />
          ))}
          {/* <div className="w-full" /> */}
          <TabbarLink
            className="text-primary dark:text-opacity-100 text-opacity-100"
            onClick={() => toggleMusicPlaying()}
            label={
              isMusicPlaying ? (
                <Icon
                  ios={<IoIosPause className="w-7 h-7" />}
                  material={<IoMdPause className="w-7 h-7" />}
                />
              ) : (
                <Icon
                  ios={<IoIosPlay className="w-7 h-7" />}
                  material={<IoMdPlay className="w-7 h-7" />}
                />
              )
            }
          />
        </Tabbar>
      </Page>
    </App>
  );
}

export default Layout;
