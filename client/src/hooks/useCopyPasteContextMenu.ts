import { useContext, useEffect } from 'react';
import { ContextMenuContext } from '../context/ContextMenuProvider';

export const useCopyPasteContextMenu = () => {
  const { showContextMenu } = useContext(ContextMenuContext);

  useEffect(() => {
    const handleContextMenu = async (event: MouseEvent) => {
      const selection = window.getSelection();
      const selectedText = selection ? selection.toString().trim() : '';
      
      let clipboardText = '';
      try {
        clipboardText = await navigator.clipboard.readText();
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }

      const target = event.target as HTMLElement;
      const isEditable = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      const menuItems = [
        {
          label: 'Copy',
          action: () => navigator.clipboard.writeText(selectedText),
          disabled: !selectedText,
        },
        {
          label: 'Paste',
          action: () => {
            if (isEditable) {
              if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                (target as HTMLInputElement).value += clipboardText;
              } else {
                document.execCommand('insertText', false, clipboardText);
              }
            }
          },
          disabled: !clipboardText || !isEditable,
          divider: true,
        },
      ];

      showContextMenu(event as unknown as React.MouseEvent, menuItems);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [showContextMenu]);
};