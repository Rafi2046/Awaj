import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import TopBarProgress from "react-topbar-progress-indicator";


TopBarProgress.config({
    barColors: {
        "0": "#49b863",
        "1.0": "#166fb8"
    },
    shadowBlur: 10,
    barThickness: 2,
});

const Root = () => {
    const [progress, setProgress] = useState(false);
    const location = useLocation();

    useEffect(() => {

        setProgress(true);


        const timer = setTimeout(() => {
            setProgress(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [location]);

    return (
        <div>
            {progress && <TopBarProgress />}
            <Navbar />
            <div className="pt-[70px] p-2">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;