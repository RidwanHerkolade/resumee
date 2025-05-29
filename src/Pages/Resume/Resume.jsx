import React, { useState } from "react";
import ResumeCom from "../../Component/ResumeCom/ResumeCom";
import BeatLoaderOverLay from "../../Component/Loader/Loading";
const Resume = () => {
  const [isInput, setIsInput] = useState({
    fullName: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });
  const [isOutput, setIsOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setIsInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="w-full h-[calc(100vh-4.6rem)]">
      {isLoading && (
        <div className="">
          <BeatLoaderOverLay className="" />
        </div>
      )}
      <div className="mx-[2rem] grid md:grid-cols-2 gap-[1rem] justify-center h-full grid-cols-1">
        <div className=" flex flex-col">
          <ResumeCom
            isInput={isInput}
            setIsOutput={setIsOutput}
            setIsInput={setIsInput}
            handleChange={handleChange}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        <div className="flex justify-center flex-col">
          {isOutput ? (<div className="">
            <h2 className="">{isOutput.fullName}</h2>
            <p className="">{isOutput.summary}</p>
            <div>
              <h3 className="">Experience</h3>
              <p>{isOutput.experience}</p>
            </div>
            <div>
              <h3 className="">Education</h3>
              <p>{isOutput.education}</p>
            </div>
            <div>
              <h3 className="">Skills</h3>
              <p>{isOutput.skills}</p>
            </div>
          </div>): (<div className="text-[1.5rem]">Generated resume will appear here...</div>)}
        </div>
      </div>
    </div>
  );
};
export default Resume;
