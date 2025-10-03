import React from 'react';
import './ContextMenu.css';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  divider?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  items: MenuItem[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, visible, items, onClose }) => {
  if (!visible) {
    return null;
  }

  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <ul>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li onClick={() => { item.action(); onClose(); }}>
              {item.icon && <span className="icon">{item.icon}</span>}
              <span>{item.label}</span>
            </li>
            {item.divider && <div className="divider"></div>}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;