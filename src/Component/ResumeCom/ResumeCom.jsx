import React from "react";
import { generateResumee } from "../../../utils/openai";
import { generateLatex } from "../../../utils/latex";
const ResumeCom = ({ isInput, handleChange, setIsOutput, isLoading, setIsLoading }) => {
  const textData = [
    { id: 1, placeholder: "Professional summary", name: "summary" },
    { id: 2, placeholder: "Experience", name: "experience" },
    { id: 3, placeholder: "Education", name: "education" },
    { id: 4, placeholder: "Skills", name: "skills" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const prompt = `
        Generate a professional resume based on the following info:
        Full Name: ${isInput.fullName}
        Summary: ${isInput.summary}
        Experience: ${isInput.experience}
        Education: ${isInput.education}
        Skills: ${isInput.skills}
      `;
      const result = await generateResumee(prompt);
      const aiContent = result?.content || result; 
      setIsOutput(aiContent);
      const latexCode = generateLatex(isInput, aiContent);
      const url = `https://latexonline.cc/compile?text=${encodeURIComponent(latexCode)}`;
      window.open(url, "_blank");
    } catch (err) {
      console.error("Error generating resume:", err);
      setIsOutput("Failed to generate resume. Try again later.");
    }
    setIsLoading(false);
  };
  return (
    <form
      className="flex justify-center items-center flex-col h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full ">
        <h1 className="text-[2rem] font-[600] flex justify-center my-[0.3rem]">
          Get started
        </h1>
        <div className="w-full my-[0.3rem]">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            required
            value={isInput.fullName}
            onChange={handleChange}
            className="w-full font-[500] text-[1.0rem] sm:text-[1.0rem] md:text-[1.1rem] lg:text-[1.2rem] px-[1rem] py-[0.5rem] outline-0 border-blue-600 rounded-[0.4rem] border-2"
          />
        </div>
        {textData.map((data) => {
          return (
            <div className="w-full my-[0.3rem]">
              <textarea
                type="text"
                name={data.name}
                onChange={handleChange}
                required
                value={isInput[data.name]}
                placeholder={data.placeholder}
                className="w-full text-[1rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[1.2rem] font-[500] px-[1rem] outline-0 py-[0.5rem] resize-none border-blue-600 rounded-[0.4rem] border-2"
              ></textarea>
            </div>
          );
        })}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-[1.2rem] lg:text-[1.3rem] px-[2.5rem] py-[0.5rem] text-black font-[500] rounded-[0.5rem] hover:bg-blue-500 hover:text-white "
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default ResumeCom;
