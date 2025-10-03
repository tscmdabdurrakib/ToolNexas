import { useState, useCallback, useEffect } from 'react';

interface ContextMenuHook {
  x: number;
  y: number;
  visible: boolean;
  showMenu: (event: React.MouseEvent) => void;
  hideMenu: () => void;
}

const useContextMenu = (): ContextMenuHook => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [visible, setVisible] = useState(false);

  const showMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setX(event.clientX);
    setY(event.clientY);
    setVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      hideMenu();
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [hideMenu]);

  return { x, y, visible, showMenu, hideMenu };
};

export default useContextMenu;