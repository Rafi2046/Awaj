import {
    createBrowserRouter
} from "react-router-dom";
import Root from "../Root/Root";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Components/Home/home";
import LogIn from "../Components/Authentication/LogIn/LogIn";
import SignUp from "../Components/Authentication/SignUp/SignUp";
import Contact from "../Components/Contact/contact";
import TermsAndConditions from "../Components/TermsAndConditions/TermsAndConditions";
import About from "../Components/About/About";
import Users from "../Components/Users/Users";

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
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/termsandconditions',
                element: <TermsAndConditions />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/users',
                element: <Users />,
            },
        ]
    }
]);


export default Routes;