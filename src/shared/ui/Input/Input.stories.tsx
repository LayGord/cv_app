import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Input, InputTheme } from './Input';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Input',
    component: Input,
    parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: {
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {},
};

export const DefaultWithPlaceholder: Story = {
    args: {
        placeholder: "Search"
    },
};

export const DefaultWithLabel: Story = {
    args: {

        placeholder: 'Username',
        id: 'test_input3'
    },
};

export const Error: Story = {
    args: {
        theme: InputTheme.ERROR 
    },
};

export const ErrorWithPlaceholder: Story = {
    args: {
        placeholder: "Search",
        theme: InputTheme.ERROR
    },
};

export const ErrorWithLabel: Story = {
    args: {
        placeholder: 'Username',
        id: 'test_input3',
        theme: InputTheme.ERROR
    },
};

export const WithErrorMessage: Story = {
    args: {
        placeholder: 'Username',
        id: 'test_input3',
        theme: InputTheme.ERROR,
        error: 'Error'
    },
};
