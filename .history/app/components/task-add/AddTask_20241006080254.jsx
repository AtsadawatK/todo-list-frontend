"use client";

import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useRouter } from 'next/navigation';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
 import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { addTask } from '../../api/ApiRoute';
export default function AddTask() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();
  const [tasks, setTasks] = useState([
    { id: 1, label: "Label 1", detail:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Deleniti iusto excepturi doloremque ipsa beatae aspernatur",checked: false, dueDate: "14 JAN 2024" },
    { id: 2, label: "Label 2", detail:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Deleniti iusto excepturi doloremque ipsa beatae aspernatur",checked: false, dueDate: "14 JAN 2024" },
    { id: 3, label: "Label 3", detail:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Deleniti iusto excepturi doloremque ipsa beatae aspernatur",checked: false, dueDate: "14 JAN 2024" }
  ]);

  const LinkToHome = () => {
    router.push('/')
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Fredoka, sans-serif",
    },
  });

  const handleAddTask = async () => {
    const newTask = {
      title,
      description,
      date: selectedDate ? dayjs(selectedDate).toDate() : null, // แปลงวันที่ให้เป็น Date object
    };

    try {
      const result = await addTask(newTask);  // เรียกใช้ฟังก์ชันจาก api.js
      console.log('Task added:', result);

      // แสดง SweetAlert เมื่อเพิ่มสำเร็จ
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error occurred:', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add task",
        text: error.message,
      });
    }
  };

  return (
    <div class="flex justify-center h-[100vh] items-center w-full">
     {/*  <div className="w-full h-40 bg-gray-200 rounded-lg animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div> */}

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select a date"
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        minDate={dayjs()} // กำหนดวันที่ไม่สามารถเลือกได้ต่ำกว่าวันปัจจุบัน
        renderInput={(params) => <input {...params} />}
      />
    </LocalizationProvider> */}
      <div class="flex flex-col border  w-[40%] h-[85%] p-[30px]  rounded-xl bg-[#F5F5F7]">


        <div class="flex  items-center justify-between w-[100%] text-[36px] font-semibold pt-5">
          <div>
          Add Task
          </div>
          <div class="flex flex-[1] justify-end  h-[100%]">
              <div class="flex justify-center items-center w-[25%] h-[100%] bg-[#B7B7B7] hover:bg-[#473b35]  text-[18px]  text-[black] font-semibold rounded-xl cursor-pointer" onClick={LinkToHome}>
                <NavigateBeforeIcon sx={{width:"40px",height:"auto"}}/>Back
              </div>
            </div>
        </div>

        <div class="flex flex-col w-[100%] overflow-hidden  h-[100%] py-10">

        <div class="flex text-[20px]">Title <div class="px-2 text-[red]">*</div></div>
        <div class="py-3">
        <input type="text" name="title" id="title" class="block w-full rounded-md border border-black py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Input Title Here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ></input>
        </div>

        <div class="flex text-[20px]">Description <div class="px-2 text-[red]">*</div></div>
        <div class="py-3">
        <textarea name="description" rows="5" cols="30" class="block w-full rounded-md border border-black py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Input Deacription Here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}>

        </textarea>
        </div>

        <div class="flex text-[20px]">Date <div class="px-2 text-[red]">*</div></div>
        <div class="py-3 text-[20px]">
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        minDate={dayjs()}
        renderInput={(params) => <input {...params} />}
        sx={{width:"100%",backgroundColor:"#FFFFFF",border:"1px solid black",borderRadius:"6px",fontSize:"20px"}}
      />
    </LocalizationProvider>
    </ThemeProvider>
        </div>


        <div class="my-3 border bg-[#705C53] flex justify-center items-center h-[10%] rounded-md text-[18px]  text-[#F5F5F7] font-semibold cursor-pointer" onClick={handleAddTask}>
            Add Task
        </div>



        </div>
      </div>
    </div>
  );
}
