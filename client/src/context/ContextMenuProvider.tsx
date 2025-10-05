import React, { createContext, useState, useCallback, ReactNode } from 'react';
import ContextMenu from '../components/shared/ContextMenu';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface ContextMenuContextType {
  showContextMenu: (event: React.MouseEvent, items: MenuItem[]) => void;
  hideContextMenu: () => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType>({
  showContextMenu: () => {},
  hideContextMenu: () => {},
});

interface ContextMenuProviderProps {
  children: ReactNode;
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({ children }) => {
  const [menuState, setMenuState] = useState({
    x: 0,
    y: 0,
    visible: false,
    items: [] as MenuItem[],
  });

  const showContextMenu = useCallback((event: React.MouseEvent, items: MenuItem[]) => {
    event.preventDefault();
    setMenuState({
      x: event.clientX,
      y: event.clientY,
      visible: true,
      items,
    });
  }, []);

  const hideContextMenu = useCallback(() => {
    setMenuState((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <ContextMenuContext.Provider value={{ showContextMenu, hideContextMenu }}>
      {children}
      <ContextMenu
        x={menuState.x}
        y={menuState.y}
        visible={menuState.visible}
        items={menuState.items}
        onClose={hideContextMenu}
      />
    </ContextMenuContext.Provider>
  );
};