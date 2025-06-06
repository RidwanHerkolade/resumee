import React from "react";
const inputs = [
  { id: 1, placeholder: "Job title", name: 'title'  },
  { id: 2, placeholder: "Company Name",name: 'companyName' },
];
const Covercom = ({isInput, handleChange, isLoading, setIsLoading}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(false)
    // try{
    //   const prompt = `
    //     Generate a professional cover letter based on the following
    //     Title: ${isInput.title}
    //     CompanyName: ${isInput.companyName}
    //     Experience: ${isInput.textArea}
    //   `
    // }
  }
  return (
    <form className="flex justify-center items-center flex-col h-full w-full px-[1.5rem]" onSubmit={handleSubmit}>
      <h2 className="text-[1.5rem] font-[600] flex justify-center my-[1rem]">
        Cover Letter Generator
      </h2>
      {inputs.map((data) => {
        return (
          <input
            key={data.id}
            name={data.name}
            onChange={handleChange}
            value={isInput[data.name]}
            required
            placeholder={data.placeholder}
            className=" w-full md:w-[50%] font-[500] text-[0.95rem] sm:text-[0.98rem] md:text-[1.05rem] lg:text-[1.1rem] px-[1rem] py-[0.5rem] outline-0 border-blue-500 rounded-[0.4rem] border-2 my-[0.5rem]"
          />
        );
      })}
      <textarea
        placeholder="Brief Background / Why you're a fit"
        required
        name="textArea"
        onChange={handleChange}
        value={isInput.textArea}
        className=" w-full md:w-[50%] font-[500] text-[0.95rem] sm:text-[0.98rem] md:text-[1.05rem] lg:text-[1.1rem] px-[1rem] md:px-[2rem] py-[0.8rem] outline-0 border-blue-500 rounded-[0.4rem] border-2 my-[0.5rem] resize-none"
      ></textarea>
      <div className="w-full md:w-[50%] my-[1.5rem]">
      <button
        type="submit"
        className="bg-blue-500 px-[2.5rem] py-[0.8rem] text-white font-[500] rounded-[0.5rem] hover:bg-blue-500 hover:text-white "
      >
        Generate
      </button>
      </div>
    </form>
  );
};

export default Covercom;
