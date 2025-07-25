import { MenuChannels } from '@/channels/menuChannels';
import { emitEvent } from '@/webContents';

const MenuItems: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Ohana Device Logs Viewer',
    submenu: [
      {
        label: 'About'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WINDOW_CLOSE,
        label: 'Exit',
        role: 'quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        id: MenuChannels.WEB_ACTUAL_SIZE,
        label: 'Reset Zoom',
        role: 'resetZoom',
        accelerator: 'CmdOrCtrl+0'
      },
      {
        id: MenuChannels.WEB_ZOOM_IN,
        label: 'Zoom In',
        role: 'zoomIn'
      },
      {
        id: MenuChannels.WEB_ZOOM_OUT,
        label: 'Zoom Out',
        role: 'zoomOut',
        accelerator: 'CmdOrCtrl+-'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WEB_TOGGLE_FULLSCREEN,
        label: 'Toggle Full Screen',
        role: 'togglefullscreen'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WEB_TOGGLE_DEVTOOLS,
        label: 'Toogle Developer Tools',
        role: 'toggleDevTools',
        accelerator: 'CmdOrCtrl+Shift+I'
      }
    ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        id: MenuChannels.OPEN_GITHUB_PROFILE,
        label: 'Check other tools',
        click: emitEvent(MenuChannels.OPEN_GITHUB_PROFILE, 'gratian-dicu-sv')
      }
    ]
  }
];

export default MenuItems;
