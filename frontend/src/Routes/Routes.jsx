import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Components/Home/home";
import LogIn from "../Components/Authentication/LogIn/LogIn";
import SignUp from "../Components/Authentication/SignUp/SignUp";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <LogIn />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            }
        ]
    }
]);


export default Routes;