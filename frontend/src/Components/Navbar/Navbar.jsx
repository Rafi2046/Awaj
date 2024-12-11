import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from '../../../public/awajLogo.svg'
import { AiOutlineAlignLeft } from "react-icons/ai";

const Navbar = () => {

    const navLinks = <>
        <li><NavLink>Item 1</NavLink></li>
        <li>
            <details >
                <summary >Parent</summary>
                <ul className="p-2">
                    <li><NavLink>Submenu 1</NavLink></li>
                    <li><NavLink>Submenu 2</NavLink></li>
                </ul>
            </details>
        </li>
        <li><NavLink>Item 3</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100/50 backdrop-blur-md border-b-2 fixed z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden px-4">
                    <AiOutlineAlignLeft />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link className="text-xl"><img width={100} src={logo} alt="Awaj" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeToggle />
                <Link to='/login' className="btn ml-5">Login</Link>
            </div>
        </div>
    );
};

export default Navbar;