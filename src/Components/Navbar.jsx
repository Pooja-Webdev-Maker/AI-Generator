import React from 'react'
import { IoSunny } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { RiSettings5Fill } from "react-icons/ri";

function Navbar() {
  return (
   <>

    <div className='nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800 '>
      <div className="logo">
        <h3 className="px-2 sm:px-4 md:px-6 text-xl sm:text-2xl md:text-3xl lg:text-[25px] font-bold sp-text">
  GenUI
</h3>


      </div>
      <div className='icons flex items-center gap-[15px]'>
        <div className="icon"><IoSunny /></div>
        <div className="icon"><FaUserLarge /></div>
        <div className="icon"><RiSettings5Fill /></div>
      </div>
    </div>
   
   </>
  )
}

export default Navbar