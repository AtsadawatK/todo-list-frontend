"use client";

import React, { useState , useEffect } from "react";
import Swal from 'sweetalert2'
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useRouter } from 'next/navigation';
import { GetTasks,UpdateCheckedTasks,DeleteTask } from './api/ApiRoute';
/* import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; */




export default function TaskCard() {


  return (
    <div class="flex justify-center h-[100vh] items-center w-full">


{/* <div class="skeleton"></div> */}





      <div class="  flex flex-col border w-[40%] h-[85%] p-[30px]  rounded-xl bg-[#F5F5F7]">
        <div class=" skeleton flex flex-[1] items-center w-[50%] text-[36px] font-semibold">

        </div>

        <div class="flex flex-[1] items-start w-[100%] ">
          <div class="flex flex-[1]">
            <div class="skeleton flex flex-[1] flex-col border h-[100%]">
            <div className="text-[20px] font-semibold text-transparent">My Tasks</div>

<div className="text-[18px] text-transparent">{`You have  tasks left!`}</div>
</div>

            <div class="flex flex-[1] justify-end ">

              <div class="skeleton flex justify-center items-center w-[50%] h-[100%] bg-[#705C53] hover:bg-[#473b35]  text-[18px]  text-[#F5F5F7] font-semibold rounded-xl cursor-pointer" >

              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-[5] flex-col w-[100%] overflow-hidden">


          <div class="grid grid-cols-1 gap-3 w-[100%]  overflow-hidden ">



      <div className="flex flex-col gap-2">

          <div  className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />
          <div  className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />
          <div  className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />

  </div>



          </div>
        </div>
      </div>
    </div>
  );
}
