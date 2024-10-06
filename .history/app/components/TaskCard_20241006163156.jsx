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
  const tasks = GetTasks();
  const router = useRouter();
  const remainingTasksCount = tasks.filter(task => task.checked === false).length;
  console.log(remainingTasksCount);
  const [checkedState, setCheckedState] = useState({});

  

  const handleCheckTask = (taskId, initialChecked) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [taskId]: prevState[taskId] !== undefined ? !prevState[taskId] : !initialChecked, // ถ้า prevState ไม่มีค่าให้ใช้ initialChecked
    }));
  };

  const LinkToAddTask = () => {
    router.push('/addtask');
  };



  /* const handleSaveChanges = async () => {
    if (!hasChanges) {
      Swal.fire("No changes to save!", "", "info");
      return;
    }

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save"
    });

    if (result.isConfirmed) {
      try {
        // ส่งข้อมูลทั้งหมดไปยัง API
        for (const task of check) {
          await UpdateCheckedTasks(task.id, { checked: task.checked });
        }
        setHasChanges(false); // รีเซ็ตสถานะการเปลี่ยนแปลง
        Swal.fire("Saved!", "", "success");
      } catch (error) {
        console.error('Update failed:', error);
        Swal.fire("Error!", "Failed to save changes", "error");
      }
    }
  }; */




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
            setTasks(tasks.filter(task => task._id !== id));
            Swal.fire("Deleted!", "Your task has been deleted.", "success");

        } catch (error) {
            Swal.fire("Error!", "Failed to delete the task.", "error");
        }
    }
};


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

            <div class="flex flex-[1] justify-between  ">
            <div class="flex justify-center items-center w-[40%] h-[100%] bg-[#206e01] hover:bg-[#37b804]  text-[18px]  text-[#F5F5F7] font-semibold rounded-xl cursor-pointer" onClick={LinkToAddTask}>
                Save Changes
              </div>
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

        return (
          <div key={task._id} className={`h-[180px] rounded-xl mr-1 p-3 ${isChecked ? "bg-[#e3e0da]" : "bg-[#D8D2C2]"}`}>
            <div className="flex gap-3 h-[100%]">
              <div className="flex flex-[0.5] text-[20px] justify-end items-start">
                <Checkbox
                  sx={{ padding: 0, paddingTop: "5px" }}
                  checked={isChecked}
                  onChange={() => handleCheckTask(task._id, task.checked)}
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
