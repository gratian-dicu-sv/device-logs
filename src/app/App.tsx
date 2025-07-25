import { ThemeProvider } from '@/app/components/theme-provider';
import Titlebar from '@/app/components/titlebar';
import { useRendererListener } from '@/app/hooks';
import { LandingScreen } from '@/app/screens/landing';
import { MenuChannels } from '@/channels/menuChannels';

import { ApolloProvider } from '@apollo/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { client } from './apollo/client';

const onMenuEvent = (_: Electron.IpcRendererEvent, channel: string, ...args: unknown[]) => {
  electron.ipcRenderer.invoke(channel, args);
};

export default function App () {
  useRendererListener(MenuChannels.MENU_EVENT, onMenuEvent);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Router>
          <div className='flex flex-col h-full'>
            <Titlebar />
            <main className='flex-1 overflow-auto'>
              <Routes>
                <Route path='/' Component={LandingScreen} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}
