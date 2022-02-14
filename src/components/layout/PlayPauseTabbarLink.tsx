import { Icon, TabbarLink } from 'konsta/react';

import { IoIosPlay, IoMdPlay, IoIosPause, IoMdPause } from 'react-icons/io';

import { useRecoilState } from 'recoil';
import { isPlayingState } from '../../store/atoms';

type PlayPauseIconProps = {
  isPlaying: boolean;
  className: string;
};

function PlayPauseIcon({ isPlaying, className }: PlayPauseIconProps) {
  return isPlaying ? (
    <Icon
      ios={<IoIosPause className={className} />}
      material={<IoMdPause className={className} />}
    />
  ) : (
    <Icon
      ios={<IoIosPlay className={className} />}
      material={<IoMdPlay className={className} />}
    />
  );
}

type PlayPauseTabbarLinkProps = {
  iconClassName: string;
};

function PlayPauseTabbarLink({ iconClassName }: PlayPauseTabbarLinkProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useRecoilState(isPlayingState);

  const onClick = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <TabbarLink
      className="text-primary dark:text-opacity-100 text-opacity-100"
      onClick={onClick}
      label={
        <PlayPauseIcon isPlaying={isMusicPlaying} className={iconClassName} />
      }
    />
  );
}

export default PlayPauseTabbarLink;
