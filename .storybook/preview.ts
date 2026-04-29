import type { Preview } from '@storybook/react-webpack5'
//@ts-ignore
import '../src/app/styles/index.scss';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;