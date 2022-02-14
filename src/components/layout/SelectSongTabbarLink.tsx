import { TabbarLink, Icon } from 'konsta/react';

import { IoIosFolderOpen, IoMdFolderOpen } from 'react-icons/io';

type Props = {
  iconClassName: string;
};

function PlayPauseTabbarLink({ iconClassName }: Props) {
  const isActive = true;

  const onClick = () => {
    // TODO
  };

  return (
    <TabbarLink
      active={isActive}
      className="text-primary dark:text-opacity-100 text-opacity-100"
      onClick={onClick}
      label={
        <Icon
          ios={<IoIosFolderOpen className={iconClassName} />}
          material={<IoMdFolderOpen className={iconClassName} />}
        />
      }
    />
  );
}

export default PlayPauseTabbarLink;
