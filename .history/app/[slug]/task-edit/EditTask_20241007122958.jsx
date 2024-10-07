"use client";

import React, { useState,useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from 'next/navigation';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
 import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2'
import dayjs from 'dayjs';
import { GetTaskfromID , UpdateTask} from "../../api/ApiRoute";
export default function EditTask({ params }) {
  const id = params.slug;
  const taskformid = GetTaskfromID(id);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const [title, setTitle] = useState(taskformid ? taskformid.title : '');
  const [description, setDescription] = useState(taskformid ? taskformid.description : '');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [date, setDate] = useState(taskformid ? taskformid.date : '');

  console.log(title)
  useEffect(() => {
    if (taskformid) {
      setTitle(taskformid.title);
      setDescription(taskformid.description);
      setDate(taskformid.date);
    }
  }, [taskformid]) ;


  const handleUpdateTask = async () =>{
    if (!title || !description || !date) {

      setTitleError(!title);
      setDescriptionError(!description);
      setDateError(!date);
      return;
    }

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    })
      if (result.isConfirmed) {
        try {
          const updateTaskData = {
            title ,
            description,
            date
          };
          const updatedTask= await UpdateTask(id, updateTaskData);
          console.log('task updated:', updatedTask);
        } catch (error) {
          console.error('Update failed:', error);
        }

        Swal.fire("Saved!", "", "success");
        router.push('/')
      }



  }




  const LinkToHome = () => {
    router.push('/')
  }



  const theme = createTheme({
    typography: {
      fontFamily: "Fredoka, sans-serif",
    },
  });
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
      <div class="flex flex-col border  xs:w-[100%] md:w-[75%] lg:w-[60%] xl:w-[45%] xs:h-[100%] md:h-[85%] xs:p-[20px] md:p-[30px]  rounded-xl bg-[#F5F5F7]">


        <div class="flex  items-center justify-between w-[100%] xs:text-[26px] sm:text-[30px] md:text-[36px] font-semibold pt-5">
          <div>
          Edit Task
          </div>
          <div class="flex flex-[1] justify-end  h-[100%]">
              <div class="flex justify-center items-center xs:w-[40%] sm:w-[30%] md:w-[25%] h-[100%] bg-[#B7B7B7] hover:bg-[#473b35]  xs:text-[16px] lg:text-[18px]  text-[black] font-semibold rounded-xl cursor-pointer" onClick={LinkToHome}>
                <NavigateBeforeIcon sx={{width:{xs:"30px",md:"40px"},height:"auto"}}/>Back
              </div>
            </div>
        </div>

        <div class="flex flex-col w-[100%] overflow-hidden  h-[100%] py-10">

        <div class="flex text-[20px]">Title <div className="flex px-2 text-[red] text-[16px]">
              {titleError && <span>* Title is required</span>}
            </div></div>
        <div class="py-3">
        <input type="text" name="title" id="title" class="block w-full rounded-md border border-black py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ></input>
        </div>

        <div class="flex text-[20px]">Description <div className="flex px-2 text-[red] text-[16px]">
              {descriptionError && <span>* Description is required</span>}
            </div></div>
        <div class="py-3">
        <textarea name="message" rows="5" cols="30" class="block w-full rounded-md border border-black py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        >


        </textarea>
        </div>

        <div class="flex text-[20px]">Date <div className="flex px-2 text-[red] text-[16px]">
              {dateError && <span>* Date is required</span>}
            </div></div>
        <div class="py-3 text-[20px]">
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(date)}
        onChange={(newDate) => setDate(newDate ? newDate.toISOString() : '')}
        minDate={dayjs()}
        renderInput={(params) => <input {...params} />}
        sx={{width:"100%",backgroundColor:"#FFFFFF",border:"1px solid black",borderRadius:"6px",fontSize:"20px"}}
      />
    </LocalizationProvider>
    </ThemeProvider>
        </div>


        <div class="my-3 border bg-[#705C53] flex justify-center items-center xs:h-[8%] md:h-[10%] rounded-md xs:text-[16px] lg:text-[18px]  text-[#F5F5F7] font-semibold cursor-pointer" onClick={handleUpdateTask}>
            Edit Task
        </div>



        </div>
      </div>
    </div>
  );
}
