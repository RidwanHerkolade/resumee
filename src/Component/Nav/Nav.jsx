import React, { useState } from "react";
import { href, Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import supabase from "../../Helper/supabaseClient";
import { toast } from "sonner";

const Nav = () => {
  const navLinks = [
    { id: 1, title: "home", href: "/" },
    { id: 2, title: "Resume", href: "/Resume" },
    { id: 3, title: "Cover Letter", href: "/Coverletter" },
    {id: 4, title: "Log out",}
  ];
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const signOut = async() => {
     const {error} = await supabase.auth.signOut()
     if(error) throw error;
     toast.error("user logged out")
     navigate("/Login")

  }
  return (
    <div className="flex items-center justify-between">
      <nav className="flex justify-between items-center w-full px-[1.5rem] py-[1rem] ">
        <div className="text-[0.95rem] sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.2rem] flex items-center font-[600]">
          Resum<p className="text-blue-500 font-[700]">eee</p>
        </div>
        <div className="gap-4 hidden md:flex">
          {navLinks.map((data) => {
            return (
              <Link
                to={data.href}
                key={data.id}
                className={`text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] flex items-center text-black font-[500] capitalize md:flex ${location.pathname === data.href ? "text-blue-500" : ""}`}
              >
                {data.title}
              </Link>
            );
          })}
          <div className="text-[1rem] text-white font-[600] rounded-[0.5rem] bg-blue-600 px-[1.5rem] py-[0.6rem] ml-[1rem] cursor-pointer hover:bg-blue-700" onClick={signOut}>Sign out</div>
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
