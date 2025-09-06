import React from "react";
import Navbar from "../Components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import MonacoEditor from 'react-monaco-editor';

function Home() {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstarp", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstarp", label: "HTML + Tailwind + Bootstrap" },
  ];
  

  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between gap-[30px]">
        <div className="left w-[45%]   rounded-xl bg-[#141319] mt-5 pl-[20px] p-4">
          <h3 className="text-[25px] font-semibold sp-text">
            AI Component generator
          </h3>
          <p className="text-[grey] mt-2 text-[16px]">
            Describe your component and let AI code for you.
          </p>

          <p className="text-[16px] font-[700] mt-4">Framework</p>
          <Select
            className="mt-2 mx-4 ml-1"
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#000", // Black background
                borderColor: "#333",
                color: "#fff",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#000", // Dropdown menu background
                color: "#fff",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333" // Selected option
                  : state.isFocused
                  ? "#111" // Hover option
                  : "#000",
                color: "#fff",
                cursor: "pointer",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff", // Selected value color
              }),
              placeholder: (base) => ({
                ...base,
                color: "#aaa", // Placeholder text
              }),
            }}
          />

          <p className="text-[16px] font-[700] mt-5">Describe your component</p>
          <textarea
            className="w-11/12 min-h-[200px] bg-[#090908] mt-3 rounded-xl p-[10px] text-white"
            placeholder="Describe your component in detail and let AI code for your component."
          ></textarea>
          <p className="text-[grey]">
            Click on genearte button to genearte your code....
          </p>
          <button className="flex items-center p-3 rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-5  transition-all hover:opacity-80 hover:scale-105 active:scale-95 mt-2 ml-auto mx-9 gap-[10px]">
            {" "}
            <i>
              <BsStars />
            </i>
            Generate
          </button>
        </div>

        <div className="right left w-[45%] h-[100vh]  bg-[#141319] rounded-xl mt-2">
          <div className="Skeleton w-full h-full flex items-center flex-col justify-center">
            <div className="circle p-[20px] w-[70px] h-[70px]  flex items-center justify-center rounded-[50%]  bg-gradient-to-r from-purple-400 to-purple-600 text-[30px]">
              <HiOutlineCode />
            </div>
            <p className="text-[16px] text-[grey] mt-3">Your component & code will appear here.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
