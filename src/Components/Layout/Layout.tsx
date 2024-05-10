import { Outlet } from "react-router-dom";
import HorizontalNavBar from "../HorizontalNavBar/HorizontalNavBar";
import SideBar from "../SideBar/SideBar";
import "./Layout.css";
import DrawerAppBar from "../DrawerAppBar/DrawerAppBar";
import { useState, useEffect } from "react";

export default function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <main id="layout">
        <section className="d-flex flex-row h-100 overflow-hidden">
          {windowWidth > 1000 && (
            <div className="h-100 bg-white-rounded me-2">
              <SideBar />
            </div>
          )}
          <div className="w-100 body-scroll">
            {windowWidth > 1000 ? <HorizontalNavBar /> : <DrawerAppBar />}
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
}
