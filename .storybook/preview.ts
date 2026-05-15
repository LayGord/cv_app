import type { Preview } from '@storybook/react-webpack5'
import { ThemeDecorator } from '../src/shared/config/storybook/ThemeDecorator';
import { RouterDecorator } from '../src/shared/config/storybook/RouterDecorator';
import { AppTheme } from '../src/app/providers/ThemeProvider';

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
  decorators: [ThemeDecorator(AppTheme.LIGHT), RouterDecorator]
};

export default preview;
