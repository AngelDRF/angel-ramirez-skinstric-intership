const SumBtn = () => {
  return (
    <div>
      <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
        <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
          SUM
        </span>
      </div>

      <div className="group hidden sm:flex flex-row relative justify-center items-center">
        <span className="text-sm font-semibold hidden sm:block mr-5">
          GET SUMMARY
        </span>
        <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
        <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
          ▶
        </span>
      </div>
    </div>
  );
};

export default SumBtn;
