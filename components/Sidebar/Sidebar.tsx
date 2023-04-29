import { IconFolderPlus, IconMistOff, IconPlus, IconDots } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { ChatbarSettings } from '../Chatbar/components/ChatbarSettings';

import {
  CloseSidebarButton,
  OpenSidebarButton,
} from './components/OpenCloseButton';

import Search from '../Search';

interface Props<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: 'left' | 'right';
  items: T[];
  itemComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: () => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
}: Props<T>) => {
  const { t } = useTranslation('promptbar');

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = '#343541';
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = 'none';
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };  

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  return isOpen ? (
    <div>
      <div
        className={`fixed top-0 ${side}-0 z-50 flex h-full w-[358px] flex-none flex-col space-y-2 bg-[#F4F4F5] p-2 text-[14px] transition-all sm:relative sm:top-0`}
      >
        <div className="text-left text-2xl font-bold text-black pt-3 pb-1 hidden">
            Genesis⚡️
          </div>
          <Search
          placeholder={t('Search...') || ''}
          searchTerm={searchTerm}
          onSearch={handleSearchTerm}
        />
        <div className="flex items-center">
          <button
            className="text-sidebar flex w-[190px] flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-black p-3 text-black transition-colors duration-200 hover:bg-gray-500/10"
            onClick={() => {
              handleCreateItem();
              handleSearchTerm('');
            }}
          >
            <IconPlus size={16} />
            {addItemButtonTitle}
          </button>

          <button
            className="ml-2 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-black p-3 text-sm text-black transition-colors duration-200 hover:bg-gray-500/10"
            onClick={handleCreateFolder}
          >
            <IconFolderPlus size={16} />
          </button>
        </div>
        <div className="flex-grow overflow-auto ">
          {items?.length > 0 && (
            <div className="flex border-b border-black pb-2">
              {folderComponent}
            </div>
          )}

          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <div className="mt-8 select-none text-center text-black opacity-50 ">
              <IconMistOff className="mx-auto mb-3 hidden" />
              <span className="text-[14px] leading-normal">
                {t('Let there be... ⚡️')}
              </span>
            </div>
          )}
        </div>
        {footerComponent}
      </div>
      

      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};

export default Sidebar;
