import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from '../../../public/awajLogo.svg'

const Navbar = () => {

    const navLinks = <>
        <li><Link>Item 1</Link></li>
        <li>
            <details >
                <summary >Parent</summary>
                <ul className="p-2">
                    <li><Link>Submenu 1</Link></li>
                    <li><Link>Submenu 2</Link></li>
                </ul>
            </details>
        </li>
        <li><Link>Item 3</Link></li>
    </>

    return (
        <div className="navbar bg-base-100/50 border-b-2 fixed">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl"><img width={100} src={logo} alt="Awaj" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeToggle />
                <Link className="btn ml-5">Login</Link>
            </div>
        </div>
    );
};

export default Navbar;