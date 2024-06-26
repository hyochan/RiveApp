import 'dotenv/config';

import type {ConfigContext, ExpoConfig} from '@expo/config';
import withAndroidLocalizedName from '@mmomtchev/expo-android-localized-app-name';
import dotenv from 'dotenv';
import {expand} from 'dotenv-expand';
import path from 'path';

import {version} from './package.json';

// https://github.com/expo/expo/issues/23727#issuecomment-1651609858
if (process.env.STAGE) {
  expand(
    dotenv.config({
      path: path.join(
        __dirname,
        ['./.env', process.env.STAGE].filter(Boolean).join('.'),
      ),
      override: true,
    }),
  );
}

const DEEP_LINK_URL = '[firebaseAppId].web.app';

const buildNumber = 1;

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'riveapp',
  scheme: 'riveapp',
  slug: 'riveapp-slug',
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  version,
  orientation: 'default',
  icon: './assets/icon.png',
  plugins: [
    // @ts-ignore
    withAndroidLocalizedName,
    'expo-router',
    'expo-tracking-transparency',
    'expo-localization',
    [
      'expo-font',
      {
        fonts: [
          'node_modules/dooboo-ui/uis/Icon/doobooui.ttf',
          'node_modules/dooboo-ui/uis/Icon/Pretendard-Bold.otf',
          'node_modules/dooboo-ui/uis/Icon/Pretendard-Regular.otf',
          'node_modules/dooboo-ui/uis/Icon/Pretendard-Thin.otf',
        ],
      },
    ],
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '14.0',
        },
      },
    ],
  ],
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#1B1B1B',
  },
  extra: {
    ROOT_URL: process.env.ROOT_URL,
    googleClientIdIOS: process.env.googleClientIdIOS,
    googleClientIdAndroid: process.env.googleClientIdAndroid,
    googleClientIdWeb: process.env.googleClientIdWeb,
    facebookAppId: process.env.facebookAppId,
    expoProjectId: process.env.expoProjectId,
    firebaseWebApiKey: process.env.firebaseWebApiKey,
    // eas: {projectId: ''},
  },
  updates: {
    fallbackToCacheTimeout: 0,
    // requestHeaders: {'expo-channel-name': 'production'},
    // url: '',
  },
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  ios: {
    buildNumber: buildNumber.toString(),
    bundleIdentifier: 'io.riveapp',
    associatedDomains: [`applinks:${DEEP_LINK_URL}`],
    supportsTablet: true,
    entitlements: {
      'com.apple.developer.applesignin': ['Default'],
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    userInterfaceStyle: 'automatic',
    permissions: [
      'RECEIVE_BOOT_COMPLETED',
      'CAMERA',
      'CAMERA_ROLL',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'NOTIFICATIONS',
      'USER_FACING_NOTIFICATIONS',
    ],
    adaptiveIcon: {
      foregroundImage: './assets/adaptive_icon.png',
      backgroundColor: '#2F2F2F',
    },
    package: 'io.riveapp',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: {
          scheme: 'https',
          host: DEEP_LINK_URL,
          pathPrefix: '/',
        },
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  description: 'Starter project from dooboo-cli.',
  web: {bundler: 'metro', favicon: './assets/favicon.png'},
});
