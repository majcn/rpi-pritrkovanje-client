import { Icon, TabbarLink } from 'konsta/react';

import {
  IoIosNotificationsOutline,
  IoMdNotificationsOutline,
} from 'react-icons/io';

import { useRecoilState } from 'recoil';
import { bellsState } from '../../store/atoms';

type BellIconProps = {
  bellId: number;
  bell: boolean;
  className: string;
};

function BellIcon({ bellId, bell, className }: BellIconProps) {
  return (
    <Icon
      ios={<IoIosNotificationsOutline className={className} />}
      material={<IoMdNotificationsOutline className={className} />}
      badge={bellId}
      badgeColors={{
        bg: bell ? 'bg-blue-500' : 'bg-gray-500/50',
      }}
    />
  );
}

type BellTabbarLinkProps = {
  bellId: number;
  bell: boolean;
  onBellClick: () => void;
  iconClassName: string;
};

function BellTabbarLink({
  bellId,
  bell,
  onBellClick,
  iconClassName,
}: BellTabbarLinkProps) {
  return (
    <TabbarLink
      active={bell}
      onClick={onBellClick}
      label={<BellIcon bellId={bellId} bell={bell} className={iconClassName} />}
    />
  );
}

type BellTabbarLinkGroupProps = {
  iconClassName: string;
};

function BellTabbarLinkGroup({ iconClassName }: BellTabbarLinkGroupProps) {
  const [bells, setBells] = useRecoilState(bellsState);

  const onBellClick = (bellIndex: number) => {
    const newBells = [...bells];
    newBells[bellIndex] = !newBells[bellIndex];
    setBells(newBells);
  };

  return (
    <>
      {bells.map((bell, bellIndex) => (
        <BellTabbarLink
          // eslint-disable-next-line react/no-array-index-key
          key={bellIndex}
          bellId={bellIndex + 1}
          bell={bell}
          onBellClick={() => onBellClick(bellIndex)}
          iconClassName={iconClassName}
        />
      ))}
    </>
  );
}

export default BellTabbarLinkGroup;
