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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const remainingTasksCount = tasks.filter(task => task.checked === false).length;
  console.log(remainingTasksCount);
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api' , {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        },
        setLoading(false)
      );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
      }
    }
    fetchTasks();
  }, []);





  const handleCheckTask = (taskId, initialChecked) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [taskId]: prevState[taskId] !== undefined ? !prevState[taskId] : !initialChecked,
    }));
  };

  const LinkToAddTask = () => {
    router.push('/addtask');
  };




  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
        title: "Are you sure you want to delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
        try {
            await DeleteTask(id);
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } catch (error) {
            Swal.fire("Error!", "Failed to delete the task.", "error");
        }
    }
};


const handleUpdateCheckTask = async (id,isChecked) =>{
  console.log("ischeck",isChecked)
  const result = await Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  })
    if (result.isConfirmed) {
      try {
        const checked = {
          _id:id,
          checked:isChecked,
        };
        const updatedCheckTask= await UpdateCheckedTasks(id,checked);
        console.log('task updated:', updatedCheckTask);
        console.log()
      } catch (error) {
        console.error('Update failed:', error);
      }

      Swal.fire("Saved!", "", "success");
      router.push('/')
    }
}


  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  }

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

<div className="text-[18px] text-transparent">{`You have ${remainingTasksCount} tasks left!`}</div>
</div>

            <div class="flex flex-[1] justify-end ">

              <div class="skeleton flex justify-center items-center w-[50%] h-[100%] bg-[#705C53] hover:bg-[#473b35]  text-[18px]  text-[#F5F5F7] font-semibold rounded-xl cursor-pointer" onClick={LinkToAddTask}>

              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-[5] flex-col w-[100%] overflow-hidden">


          <div class="grid grid-cols-1 gap-3 w-[100%]  overflow-y-scroll ">



      <div className="flex flex-col gap-2">

          <div  className={`skeleton h-[180px] rounded-xl mr-1 p-3`} />
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
