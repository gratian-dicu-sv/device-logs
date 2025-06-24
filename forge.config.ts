import path from 'node:path';
import { resolve, join, dirname } from 'path';

import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { VitePlugin } from '@electron-forge/plugin-vite';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { copy, mkdirs } from 'fs-extra';

import { author, productName } from './package.json';

const rootDir = process.cwd();

const config: ForgeConfig = {
  packagerConfig: {
    // Create asar archive for main, renderer process files
    asar: true,
    // Set executable name
    executableName: productName,
    // Set application copyright
    appCopyright: `Copyright © ${new Date().getFullYear()} ${author.name}`,
    // Set application icon
    icon: path.resolve(rootDir, 'assets/icons/icon')
  },
  rebuildConfig: {},
  hooks: {
    // The call to this hook is mandatory for better-sqlite3 to work once the app built
    async packageAfterCopy (_forgeConfig, buildPath) {
      const requiredNativePackages = ['electron-squirrel-startup', 'electron-window-state', 'jsonfile', 'mkdirp'];

      // __dirname isn't accessible from here
      const dirnamePath: string = '.';
      const sourceNodeModulesPath = resolve(dirnamePath, 'node_modules');
      const destNodeModulesPath = resolve(buildPath, 'node_modules');

      // Copy all asked packages in /node_modules directory inside the asar archive
      await Promise.all(
        requiredNativePackages.map(async (packageName) => {
          const sourcePath = join(sourceNodeModulesPath, packageName);
          const destPath = join(destNodeModulesPath, packageName);

          await mkdirs(dirname(destPath));
          await copy(sourcePath, destPath, {
            recursive: true,
            preserveTimestamps: true
          });
        })
      );
    }
  },
  makers: [
    new MakerSquirrel({ name: productName }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({})
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'config/vite.main.config.ts'
        },
        {
          entry: 'src/preload.ts',
          config: 'config/vite.preload.config.ts'
        }
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'config/vite.renderer.config.ts'
        }
      ]
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
};

export default config;
