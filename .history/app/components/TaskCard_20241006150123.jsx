"use client";

import React, { useState , useEffect } from "react";
import Swal from 'sweetalert2'
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useRouter } from 'next/navigation';
import { GetTasks,UpdateCheckedTasks } from '../api/ApiRoute';
/* import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; */




export default function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const remainingTasksCount = tasks.filter(task => task.checked === false).length;
  console.log(remainingTasksCount);

  const LinkToAddTask = () => {
    router.push('/addtask')
  }



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




  const handleDeleteTask = () => {
    Swal.fire({
      title: "Do you want to Delete this task ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
  }




  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await GetTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  const handleCheckTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
    setHasChanges(true);
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
      <div class="flex flex-col border w-[40%] h-[85%] p-[30px]  rounded-xl bg-[#F5F5F7]">
        <div class="flex flex-[1] items-center w-[100%] text-[36px] font-semibold">
          To-Do List
        </div>

        <div class="flex flex-[1] items-start w-[100%] ">
          <div class="flex flex-[1]">
            <div class="flex flex-[1] flex-col ">
            <div className="text-[20px] font-semibold">My Tasks</div>

{/* แสดงจำนวนงานที่เหลืออยู่ */}
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


          {tasks.map((task) => (
              <div key={task._id} className={`h-[180px] rounded-xl mr-1 p-3  ${task.checked ? "bg-[#e3e0da]" : "bg-[#D8D2C2]"} ${checkedTasks ? "bg-[#e3e0da]" : "bg-[#D8D2C2]"} `}>
                <div className="flex gap-3  h-[100%]">
                  <div className="flex flex-[0.5] text-[20px]  justify-end items-start">
                  <Checkbox
                      sx={{ padding: 0, paddingTop: "5px" }}
                      checked={task.checked}
                      onChange={() => handleCheckTask(task._id)}
                    />
                  </div>

                  <div className="flex flex-col flex-[4] text-[20px] justify-start  h-[100%] ">
                    <div className={`flex flex-[1] ${task.checked ? "line-through" : ""}`}>
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
                          {task.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-[1] text-[20px]  items-start justify-around  pt-1.5">
                    <div className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[green] rounded-md transition-all duration-500"
                    onClick={() => { window.location.href = `/edit?id=${task.id}`; }}>
                      <EditIcon sx={{ color: "green" }} />
                    </div>

                    <div className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[red] rounded-md transition-all duration-500"
                    onClick={handleDeleteTask}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}










          </div>
        </div>
      </div>
    </div>
  );
}
