import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { MultiSelect } from './MultiSelect';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'shared/MultiSelect',
    component: MultiSelect,
    parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
        docs: {
            story: {
                inline: false,
                iframeHeight: 450,
            },
        },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    args: { },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = {
    '1': {displayName: "option1", id: '1', category: 'category1'},
    '2':{displayName: "option2", id: '2', category: 'category1'},
    '3':{displayName: "option3", id: '3', category: 'category1'},
    '4':{displayName: "option4", id: '4', category: 'category1'},
    '5':{displayName: "option5", id: '5', category: 'category1'},
    '6':{displayName: "option6", id: '6', category: 'category2'},
    '7':{displayName: "option7", id: '7', category: 'category2'},
    '8':{displayName: "option8", id: '8', category: 'category1'},
    '9':{displayName: "option9", id: '9', category: 'category2'},
    '10':{displayName: "option10", id: '10', category: 'category2'},
    '11':{displayName: "option11", id: '11'},
    '12':{displayName: "option12", id: '12'},
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        id: 'str',
        options: options,
        value: [],
    },
};

export const GroupedByCategory: Story = {
    args: {
        id: 'str',
        options: options,
        value: [],
        groupByCategories: true,
    },
};


