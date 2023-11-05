import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home/Home";
import Board from "./page/Board/Board";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/Board/:boardId',
        element: <Board />,
    },
]);