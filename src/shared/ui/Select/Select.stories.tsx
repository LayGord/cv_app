import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Select } from './Select';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Select',
    component: Select,
    parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: { },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        value: '1',
        options: [
            {displayValue: 'Option 1', value: '1'},
            {displayValue: 'Option 2', value: '2'},
            {displayValue: 'Option 3', value: '3'},
        ]
    },
};

export const WithPlaceholder: Story = {
    args: {
        value: '',
        placeholder: 'select an item',
        options: [
            {displayValue: 'Option 1', value: '1'},
            {displayValue: 'Option 2', value: '2'},
            {displayValue: 'Option 3', value: '3'},
        ]
    },
};



