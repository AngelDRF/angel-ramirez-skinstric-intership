const HomeBtn = () => {
  return (
    <div>
      <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
        <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
          HOME
        </span>
      </div>

      <div className="hidden sm:flex flex-row relative justify-center items-center">
        <span className="text-sm font-semibold hidden sm:block mr-5">HOME</span>
        <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85]"></div>
        <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block">
          ▶
        </span>
      </div>
    </div>
  );
};

export default HomeBtn;
