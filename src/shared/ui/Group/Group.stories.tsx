import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Group } from './Group';
import { Input } from '../Input/Input';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/Group',
    component: Group,
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
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        children: (
            <>
                <Input placeholder='Firstname'/>
                <Input placeholder='Lastname'/>
                <Input placeholder='Patronymic'/>
            </>
        ),
    },
};

export const WithTitle: Story = {
    args: {
        title: 'Personal Information',
        children: (
            <>
                <Input placeholder='Firstname'/>
                <Input placeholder='Lastname'/>
                <Input placeholder='Patronymic'/>
            </>
        ),
    },
};

