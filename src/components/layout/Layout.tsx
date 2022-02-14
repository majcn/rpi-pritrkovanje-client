import {
  App,
  Page,
  Navbar,
  Block,
  Tabbar,
  TabbarLink,
  NavbarBackLink,
  Icon,
  BlockTitle,
  List,
  ListItem,
} from 'konsta/react';

import { IoIosFolderOpen, IoMdFolderOpen } from 'react-icons/io';

import BellTabbarLinkGroup from './BellTabbarLinkGroup';
import PlayPauseTabbarLink from './PlayPauseTabbarLink';
import TempoStepper from './TempoStepper';

type Props = {
  theme: 'ios' | 'material';
  server: boolean;
  children: React.ReactNode;
};

function Layout({ theme, server, children }: Props) {
  return (
    <App theme={theme} safeAreas>
      <Page>
        <Navbar
          title="My App"
          // titleClassName="truncate w-[120px] hover:w-[300px] animate-marquee"
          className="top-0 sticky"
          left={<NavbarBackLink showText text={server ? 'Server' : 'Client'} />}
          right={<TempoStepper />}
        />

        <BlockTitle>Songs</BlockTitle>
        <List>
          <ListItem
            link
            title="Petka okrog na 3 zvonove (gorenjsko gostenje)"
          />
          <ListItem
            link
            title="Petka okrog na 3 zvonove (gorenjsko gostenje)"
          />
          <ListItem
            link
            title="Petka okrog na 3 zvonove (gorenjsko gostenje)"
          />
        </List>

        <Block className="mt-0 text-center">{children}</Block>

        <Tabbar labels className="left-0 bottom-0 fixed">
          <TabbarLink
            active
            label={
              <Icon
                ios={<IoIosFolderOpen className="w-7 h-7" />}
                material={<IoMdFolderOpen className="w-7 h-7" />}
              />
            }
          />

          <BellTabbarLinkGroup iconClassName="w-7 h-7" />

          <PlayPauseTabbarLink iconClassName="w-7 h-7" />
        </Tabbar>
      </Page>
    </App>
  );
}

export default Layout;
