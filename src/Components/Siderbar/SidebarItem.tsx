import { classNames } from '../../util';
import ToggleButton from '../ToggleButton';

type Props = {
  active: boolean;
  title: string;
  onClick: (item: string) => void;
};

function SidebarItem({ active, title, onClick }: Props) {
  return (
    <li className="mr-3 flex-1">
      <button
        onClick={() => onClick(title)}
        type="button"
        className={classNames(
          'block py-1 md:py-3 pl-1 align-middle no-underline border-b-2',
          active
            ? 'text-white hover:text-white border-pink-600'
            : 'text-gray-800 hover:text-pink-500 border-gray-800 md:border-gray-900 hover:border-pink-500'
        )}
      >
        <i
          className={classNames(
            'fas fa-link pr-0 md:pr-3',
            active && 'text-pink-500'
          )}
        />
        <span
          className={classNames(
            'pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block',
            active
              ? 'text-white md:font-bold'
              : 'text-gray-600 md:text-gray-400'
          )}
        >
          <ToggleButton title={title} checked={active} />
        </span>
      </button>
    </li>
  );
}

export default SidebarItem;
