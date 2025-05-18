import React from "react";
import { Link } from "react-router-dom";
import Bubble from "../../Component/Bubble/Bubble";

const Home = () => {
  return (
    <div className="flex flex-col md:items-center md:justify-center h-[calc(100vh-4.5rem)] px-[2rem] justify-center">
      <h1 className="font-[700] text-[1.8rem] md:text-[2.5rem] lg:text-[3.5rem] flex text-start items-start md:text-center lg:text-center">
        Build Smarter Resumes with AI{" "}
      </h1>
      <p className="text-[1.3rem] sm:text-[1.4rem] md:text-[1.5rem] lg:text-[1.7rem] font-[500] sm:font-[500] sm:my-[0.2rem] my-[1rem] flex justify-center md:text-center lg:text-center">
        Craft impactful resumes and cover letters powered by AI-enhancement
        tools.
      </p>
      <div className="my-[1.5rem] w-full flex justify-start md:justify-center lg:justify-center items-center">
        <Link
          to="/Resume"
          className="bg-blue-500 text-white rounded-[10rem] px-[4rem] py-[0.8rem] font-[600] flex justify-center items-center"
        >
          Get Started
        </Link>
      </div>
      <Bubble count={15} />
    </div>
  );
};
export default Home;
