import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center h-[100vh] items-center w-full">
      <div class="  flex flex-col border xs:w-[100%] md:w-[75%] lg:w-[60%] xl:w-[45%] xs:h-[100%] md:h-[85%] xs:p-[20px] md:p-[30px]  rounded-xl bg-[#F5F5F7]">
        <div class=" skeleton flex flex-[1] items-center w-[50%] text-[36px] font-semibold"></div>

        <div class="flex xs:flex-[0.8] md:flex-[1] items-start w-[100%] ">
          <div class="flex flex-[1]">
            <div class="skeleton flex flex-[1] flex-col border h-[100%]">
              <div className="xs:text-[18px]  md:text-[20px] font-semibold text-transparent">
                My Tasks
              </div>

              <div className="xs:text-[14px]  md:text-[18px] text-transparent">{`You have  tasks left!`}</div>
            </div>

            <div class="flex flex-[1] justify-end ">
              <div class="skeleton flex justify-center items-center xs:w-[80%] md:w-[50%] h-[100%] bg-[#705C53] hover:bg-[#473b35]  xs:text-[16px] lg:text-[18px]  text-[#F5F5F7] font-semibold rounded-xl cursor-pointer"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-[5] flex-col w-[100%] overflow-hidden">
          <div class="grid grid-cols-1 gap-3 w-[100%]  overflow-hidden ">
            <div className="flex flex-col gap-2">
              <div className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />
              <div className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />
              <div className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
