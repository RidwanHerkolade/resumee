import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Nav = () => {
  const navLinks = [
    { id: 1, title: "home", href: "/" },
    { id: 2, title: "Resume", href: "/Resume" },
    { id: 3, title: "Cover Letter", href: "/Coverletter" },
  ];
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  return (
    <div className="flex items-center justify-between">
      <nav className="flex items-center justify-between w-full px-[1.5rem] py-[1.2rem]">
        <div className="text-[1rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.4rem] flex items-center font-[600]">
          Resum<p className="text-blue-500 font-[700]">eee</p>
          <div className=""></div>
        </div>
        <div className="gap-4 hidden md:flex">
          {navLinks.map((data) => {
            return (
              <Link
                to={data.href}
                key={data.id}
                className={`text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] text-black font-[500] capitalize md:flex ${location.pathname === data.href ? "text-blue-500" : ""}`}
              >
                {data.title}
              </Link>
            );
          })}
          {/* <div><ModeNightIcon/></div> */}
           {/* <div><DarkModeIcon className="text-cyan-100 text-[4rem]"/></div> */}
        </div>
        <div className="md:hidden">
          <MenuIcon onClick={() => setIsOpen(!isOpen)}/>
        </div>
        {isOpen && (<div className="flex-col absolute top-[4rem] left-0 w-[50%] h-[calc(100vh-4rem)] flex gap-[0.5rem] items-start py-[1rem] px-[1.5rem] bg-blue-500">
          {navLinks.map((data) => {
            return (
              <Link
                to={data.href}
                key={data.id}
                className="text-[1rem] text-black font-[500] capitalize flex-col gap-[1rem]"
                onClick={() => setIsOpen(false)}
              >
                {data.title}
              </Link>
            );
          })}
        </div>)}
      </nav>
    </div>
  );
};

export default Nav;
