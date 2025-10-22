import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import type { JSX } from "react";

const HomeLayout = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className="min-h-svh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default HomeLayout;
