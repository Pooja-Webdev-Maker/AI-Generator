import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAF72V8ZWKsJWUmNzlZ_UvgiYr2yIT8_W8", // ⚠️ replace with env variable for production
  });

  async function getResponse() {
    if (!prompt.trim()) return toast.error("Please describe your component first");

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. 
     You create modern, animated, and fully responsive UI components.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and responsive.  
- Include high-quality hover effects, shadows, animations, and typography.  
- Return ONLY the code in a single HTML file.
      `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />

      {/* ✅ Responsive Grid Layout with Motion */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-16 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section */}
        <motion.div
          className="w-full py-6 rounded-2xl bg-[#141319]/80 backdrop-blur-lg mt-5 p-5 shadow-lg border border-zinc-800 hover:shadow-purple-500/20 transition-all"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl sm:text-2xl lg:text-[25px] font-bold sp-text bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Component Generator
          </h3>
          <p className="text-gray-400 mt-2 text-sm sm:text-base lg:text-[16px]">
            Describe your component and let AI code it for you.
          </p>

          <p className="text-sm sm:text-[15px] font-[700] mt-4 text-purple-300">
            Framework
          </p>
          <Select
            className="mt-2"
            options={options}
            value={frameWork}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                borderRadius: "0.75rem",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "0.75rem",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333"
                  : state.isFocused
                  ? "#222"
                  : "#111",
                color: "#fff",
                "&:active": { backgroundColor: "#444" },
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" }),
            }}
            onChange={(selected) => setFrameWork(selected)}
          />

          <p className="text-sm sm:text-[15px] font-[700] mt-5 text-purple-300">
            Describe your component
          </p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-full min-h-[140px] sm:min-h-[200px] rounded-2xl bg-[#09090B] mt-3 p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 resize-none border border-zinc-800 text-sm sm:text-base"
            placeholder="Describe your component in detail..."
          ></textarea>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-3">
            <p className="text-gray-400 text-xs sm:text-sm">
              Click on generate to get your code
            </p>
            <button
              onClick={getResponse}
              className="flex items-center justify-center py-2 px-5 rounded-2xl border-0 bg-gradient-to-r from-purple-500 to-pink-500 gap-2 transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-md text-sm sm:text-base text-white font-semibold"
            >
              {loading ? <ClipLoader color="white" size={16} /> : <BsStars />}
              Generate
            </button>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="relative mt-2 w-full h-[65vh] sm:h-[70vh] lg:h-[80vh] bg-[#141319]/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-zinc-800"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {!outputScreen ? (
            <div className="w-full h-full flex items-center flex-col justify-center text-center px-4">
              <div className="p-5 w-[70px] h-[70px] flex items-center justify-center text-[30px] rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg">
                <HiOutlineCode />
              </div>
              <p className="text-sm sm:text-base text-gray-400 mt-3">
                Your component & code will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
                <button
                  onClick={() => setTab(1)}
                  className={`flex-1 py-2 rounded-xl transition-all font-medium ${
                    tab === 1
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`flex-1 py-2 rounded-xl transition-all font-medium ${
                    tab === 2
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Toolbar */}
              <div className="bg-[#17171C] w-full h-[50px] flex items-center justify-between px-4">
                <p className="font-bold text-gray-200 text-sm sm:text-base">Code Editor</p>
                <div className="flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button
                        onClick={copyCode}
                        className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl border border-zinc-700 flex items-center justify-center hover:bg-[#333] text-gray-300 hover:text-white"
                      >
                        <IoCopy />
                      </button>
                      <button
                        onClick={downnloadFile}
                        className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl border border-zinc-700 flex items-center justify-center hover:bg-[#333] text-gray-300 hover:text-white"
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsNewTabOpen(true)}
                        className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl border border-zinc-700 flex items-center justify-center hover:bg-[#333] text-gray-300 hover:text-white"
                      >
                        <ImNewTab />
                      </button>
                      <button
                        onClick={() => setRefreshKey((prev) => prev + 1)}
                        className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl border border-zinc-700 flex items-center justify-center hover:bg-[#333] text-gray-300 hover:text-white"
                      >
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Editor / Preview */}
              <div className="h-[calc(100%-100px)] overflow-auto">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="100%"
                    theme="vs-dark"
                    language="html"
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      wordWrap: "on",
                    }}
                  />
                ) : (
                  <iframe
                    key={refreshKey}
                    srcDoc={code}
                    className="w-full h-full bg-white text-black"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* ✅ Fullscreen Preview Overlay */}
      {isNewTabOpen && (
        <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto z-50">
          <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100 shadow-md">
            <p className="font-bold">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200"
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
        </div>
      )}
    </>
  );
};

export default Home;
