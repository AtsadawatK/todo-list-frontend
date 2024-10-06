"use client";

import React, { useState } from "react";
import Swal from 'sweetalert2'
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useRouter } from 'next/navigation';
import { GetTasks, UpdateCheckedTasks } from '../api/ApiRoute';

export default function TaskCard() {
  const initialTasks = GetTasks();
  const [tasks, setTasks] = useState(initialTasks); // ใช้ useState เพื่อเก็บ tasks
  const router = useRouter();
  const remainingTasksCount = tasks.filter(task => !task.checked).length;

  const LinkToAddTask = () => {
    router.push('/addtask');
  };

  const handleCheckTask = async (id) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === id) {
        return { ...task, checked: !task.checked }; // เปลี่ยนค่า checked
      }
      return task;
    });

    setTasks(updatedTasks); // อัปเดต tasks ใน state

    // อาจจะเรียก UpdateCheckedTasks เพื่ออัปเดตในฐานข้อมูล
    try {
      await UpdateCheckedTasks(id, { checked: updatedTasks.find(task => task._id === id).checked });
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire("Error!", "Failed to save changes", "error");
    }
  };

  const handleDeleteTask = () => {
    Swal.fire({
      title: "Do you want to Delete this task ?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  return (
    <div className="flex justify-center h-[100vh] items-center w-full">
      <div className="flex flex-col border w-[40%] h-[85%] p-[30px] rounded-xl bg-[#F5F5F7]">
        <div className="flex flex-[1] items-center w-[100%] text-[36px] font-semibold">
          To-Do List
        </div>
        <div className="flex flex-[1] items-start w-[100%]">
          <div className="flex flex-[1]">
            <div className="flex flex-[1] flex-col ">
              <div className="text-[20px] font-semibold">My Tasks</div>
              <div className="text-[18px]">{`You have ${remainingTasksCount} tasks left!`}</div>
            </div>
            <div className="flex flex-[1] justify-between">
              <div className="flex justify-center items-center w-[40%] h-[100%] bg-[#206e01] hover:bg-[#37b804] text-[18px] text-[#F5F5F7] font-semibold rounded-xl cursor-pointer" onClick={LinkToAddTask}>
                Save Changes
              </div>
              <div className="flex justify-center items-center w-[50%] h-[100%] bg-[#705C53] hover:bg-[#473b35] text-[18px] text-[#F5F5F7] font-semibold rounded-xl cursor-pointer" onClick={LinkToAddTask}>
                Add a new task
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-[5] flex-col w-[100%] overflow-hidden">
          <div className="grid grid-cols-1 gap-3 w-[100%] overflow-y-scroll">
            {tasks.map((task) => (
              <div key={task._id} className={`h-[180px] rounded-xl mr-1 p-3 ${task.checked ? "bg-[#e3e0da]" : "bg-[#D8D2C2]"}`}>
                <div className="flex gap-3 h-[100%]">
                  <div className="flex flex-[0.5] text-[20px] justify-end items-start">
                    <Checkbox
                      sx={{ padding: 0, paddingTop: "5px" }}
                      checked={task.checked}
                      onChange={() => handleCheckTask(task._id)} // เรียกใช้ handleCheckTask
                    />
                  </div>
                  <div className="flex flex-col flex-[4] text-[20px] justify-start h-[100%]">
                    <div className={`flex flex-[1] ${task.checked ? "line-through" : ""}`}>
                      {task.title}
                    </div>
                    <div className="flex flex-[1] text-[14px]">
                      {task.description}
                    </div>
                    <div className="flex flex-[5] text-[18px] items-end">
                      <div className="flex">
                        <div className="flex items-center">
                          <EventAvailableIcon />
                        </div>
                        <div className="flex items-center">
                          {task.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-[1] text-[20px] items-start justify-around pt-1.5">
                    <div className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[green] rounded-md transition-all duration-500"
                      onClick={() => { window.location.href = `/edit?id=${task._id}`; }}>
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
