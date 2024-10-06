import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Pages/Footer/Footer";


const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto ">
           <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;