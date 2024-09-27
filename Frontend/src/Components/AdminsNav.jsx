import React from "react";
import { FaUserShield } from "react-icons/fa";
const AdminsNav = () => {
  return (
    <nav className="w-full h-[10%]  flex justify-between items-centerp-5 px-10">
      <div className="img w-[50%] h-full  items-center flex ">
        <img
          src="https://airplane-monitor-major1.vercel.app/assets/logobgr-C-gYqJ23.png"
          alt=""
          className="w-[15%] h-[140%] "
        />
        <h1 className="text-3xl -translate-x-8 font-bold text-sky-600">
          Urban Transit Vigilance & Defence System
        </h1>
      </div>
      <div className="flex w-[15%] h-full items-center gap-5">
        <FaUserShield className="text-5xl" />
        <h1 className="text-2xl">Admin,s Name</h1>
      </div>
    </nav>
  );
};

export default AdminsNav;
