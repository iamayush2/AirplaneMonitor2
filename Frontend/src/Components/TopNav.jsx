import React from "react";

const TopNav = () => {
  return (
    <nav className="w-full h-[10vh]  flex justify-between items-center  lg:px-10">
      <div className="img w-[80%] lg:w-[50%] h-full  items-center flex ">
        <img
          src="https://airplane-monitor-major1.vercel.app/assets/logobgr-C-gYqJ23.png"
          alt=""
          className="w-[30%] lg:w-[15%] h-[140%] "
        />
        <h1 className=" text-sm lg:text-3xl -translate-x-4 lg:-translate-x-8 font-bold text-sky-600">
          Urban Transit Vigilance & Defence System
        </h1>
      </div>
    </nav>
  );
};

export default TopNav;
