import { classNames } from '../../util';

type Props = {
  title: string;
  checked: boolean;
};

function ToggleButton({ title, checked }: Props) {
  return (
    <div className="flex flex-col">
      <div className="mt-3 inline-flex items-center cursor-pointer">
        <span className="relative">
          <span className="block w-10 h-6 bg-gray-400 rounded-full shadow-inner" />
          <span
            className={classNames(
              'absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0',
              'focus-within:shadow-outline transition-transform duration-300 ease-in-out',
              checked ? 'bg-purple-600 transform translate-x-full' : 'bg-white'
            )}
          >
            <input type="checkbox" className="absolute opacity-0 w-0 h-0" />
          </span>
        </span>
        <span className="ml-3 text-sm">{title}</span>
      </div>
    </div>
  );
}

export default ToggleButton;
