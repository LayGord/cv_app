import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Button',
    component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.DEFAULT,
        size: ButtonSize.M
    },
};

export const Secondary: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.SECONDARY,
        size: ButtonSize.M
    },
};

export const Clear: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.CLEAR,
        size: ButtonSize.M
    },
};

export const Outline: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.M
    },
};

export const Accent: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.ACCENT,
        size: ButtonSize.M
    },
};

export const Error: Story = {
    args: {
        children: 'text',
        theme: ButtonTheme.ERROR,
        size: ButtonSize.M
    },
};