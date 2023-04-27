import { SiOpenai } from '@icons-pack/react-simple-icons';
import { IconDots } from '@tabler/icons-react';
import { FC } from 'react';

interface Props { }

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="rounded-2xl p-3 group border-b border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#444654] dark:text-gray-100"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="relative flex items-start prose">
        <div className="h-10 w-10 rounded-xl inline-flex items-center justify-center mr-2 bg-teal-500 text-white flex-shrink-0">
          <SiOpenai size={30} />
        </div>
        <IconDots className="animate-pulse" />
      </div>
    </div>
  );
};