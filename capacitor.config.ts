import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'my.arenap.app',
  appName: 'arenap',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
};

export default config;
