"use client";

import React, { useState , useEffect } from "react";
import Swal from 'sweetalert2'
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useRouter } from 'next/navigation';
import { GetTasks,UpdateCheckedTasks,DeleteTask } from '../api/ApiRoute';
/* import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; */




export default function TaskCard() {
  const { tasks, loading } = GetTasks();
  const router = useRouter();
  const remainingTasksCount = tasks.filter(task => task.checked === false).length;
  console.log(remainingTasksCount);
  const [checkedState, setCheckedState] = useState({});



  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch('/api/routeCoins' , {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        } );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setCryptoData(data.data);
      } catch (error) {
        console.error("Failed to fetch crypto data:", error);
      }
    }
    fetchCryptoData();
     const intervalId = setInterval(fetchCryptoData, 500000);
    return () => clearInterval(intervalId);
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


<div>
            <h1>Tasks</h1>
            {loading ? ( // แสดงข้อความโหลดถ้าข้อมูลยังโหลดไม่เสร็จ
                <p>Loading...</p>
            ) : (
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <li key={task.id}>{task.name}</li> // ปรับให้เข้ากับโครงสร้างข้อมูลของคุณ
                        ))
                    ) : (
                        <p>No tasks found.</p> // ถ้าไม่มีข้อมูลให้แสดง
                    )}
                </ul>
            )}
        </div>


      <div class="flex flex-col border w-[40%] h-[85%] p-[30px]  rounded-xl bg-[#F5F5F7]">
        <div class="flex flex-[1] items-center w-[100%] text-[36px] font-semibold">
          To-Do List
        </div>

        <div class="flex flex-[1] items-start w-[100%] ">
          <div class="flex flex-[1]">
            <div class="flex flex-[1] flex-col ">
            <div className="text-[20px] font-semibold">My Tasks</div>

<div className="text-[18px]">{`You have ${remainingTasksCount} tasks left!`}</div>
</div>

            <div class="flex flex-[1] justify-end ">

              <div class="flex justify-center items-center w-[50%] h-[100%] bg-[#705C53] hover:bg-[#473b35]  text-[18px]  text-[#F5F5F7] font-semibold rounded-xl cursor-pointer" onClick={LinkToAddTask}>
                Add a new task
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-[5] flex-col w-[100%] overflow-hidden">


          <div class="grid grid-cols-1 gap-3 w-[100%]  overflow-y-scroll ">


          {tasks.map((task) => {
        const isChecked = checkedState[task._id] !== undefined ? checkedState[task._id] : task.checked;
            console.log(task._id , isChecked)
        return (
          <div key={task._id} className={`h-[180px] rounded-xl mr-1 p-3 ${isChecked ? "bg-[#e3e0da]" : "bg-[#D8D2C2]"}`}>
            <div className="flex gap-3 h-[100%]">
              <div className="flex flex-[0.5] text-[20px] justify-end items-start">
              <Checkbox
  sx={{ padding: 0, paddingTop: "5px" }}
  checked={isChecked}
  onChange={() => {
    const newCheckedState = !isChecked;
    handleCheckTask(task._id, task.checked);
    handleUpdateCheckTask(task._id, newCheckedState);
  }}
/>
                  </div>

                  <div className="flex flex-col flex-[4] text-[20px] justify-start  h-[100%] ">
                    <div className={`flex flex-[1] ${isChecked ? "line-through" : ""}`}>
                      {task.title}
                    </div>
                    <div className="flex flex-[1] text-[14px]">
                      {task.description}
                    </div>
                    <div className="flex flex-[5]  text-[18px] items-end ">
                      <div className="flex ">
                        <div className="flex items-center ">
                          <EventAvailableIcon />
                        </div>
                        <div className="flex items-center ">
                        {formatDate(task.date)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-[1] text-[20px]  items-start justify-around  pt-1.5">
                    <div className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[green] rounded-md transition-all duration-500"
                    onClick={() => { window.location.href = `/${task._id}`; }}>
                      <EditIcon sx={{ color: "green" }} />
                    </div>

                    <div className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[red] rounded-md transition-all duration-500"
                    onClick={() => handleDeleteTask(task._id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </div>
                  </div>
                </div>
              </div>
           );
          })}










          </div>
        </div>
      </div>
    </div>
  );
}
