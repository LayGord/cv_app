import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-webpack5",
  "staticDirs": [
    "..\\public"
  ],
  // sb absolute imports fix
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(process.cwd(), 'src'),
    ];
    //console.log(`Current working directory is: ${process.cwd()}`)
    return config;
  },
};
export default config;