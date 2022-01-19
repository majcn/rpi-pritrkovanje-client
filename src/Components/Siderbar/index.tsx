import SidebarItem from './SidebarItem';

type Props = {
  items: { title: string; active: boolean }[];
  onItemClick: (index: string) => void;
};

function Sidebar({ items, onItemClick }: Props) {
  return (
    <div className="w-full md:w-1/5 bg-gray-900 md:bg-gray-900 px-2 text-center fixed bottom-0 md:pt-8 md:top-0 md:left-0 h-16 md:h-screen md:border-r-4 md:border-gray-600">
      <div className="md:relative mx-auto lg:float-right lg:px-6">
        <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
          {items.map((x) => (
            <SidebarItem
              key={x.title}
              title={x.title}
              active={x.active}
              onClick={onItemClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
