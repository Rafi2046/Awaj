import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Contact from './pages/contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },  
  {
    path: "/rafi",
    element: <div>Hello Rafi!</div>,
  },  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
