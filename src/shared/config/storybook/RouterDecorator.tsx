import { BrowserRouter } from "react-router";

export const RouterDecorator = (Story: any) => {
    return (
        <BrowserRouter>
            <Story />
        </BrowserRouter>
    )
}