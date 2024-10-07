"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useRouter } from "next/navigation";
import { UpdateCheckedTasks, DeleteTask } from "../api/ApiRoute";

export default function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const TasksCount = tasks.filter((task) => task.checked === false).length;
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api", {
          cache: "no-store",
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        setLoading(false);
        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Failed :", error);
      }
    }
    fetchTasks()
  }, [tasks]);


  const handleCheckTask = (taskId, initialChecked) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [taskId]:
        prevState[taskId] !== undefined ? !prevState[taskId] : !initialChecked,
    }));
  };

  const LinkToAddTask = () => {
    router.push("/addtask");
  };

  const handleDeleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await DeleteTask(id);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (error) {
        Swal.fire("Failed to delete the task.");
      }
    }
  };

  const handleUpdateCheckTask = async (id, isChecked) => {
    console.log("ischeck", isChecked);

    try {
      const checked = {
        _id: id,
        checked: isChecked,
      };
      console.log(checked);
      const updatedCheckTask = await UpdateCheckedTasks(id, checked);
      console.log("task updated:", updatedCheckTask);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task Saved",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/");
    } catch (error) {
      console.error("failed:", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="flex justify-center h-[100vh] items-center w-full">
      {/* <div className="skeleton"></div> */}

      <div className="flex flex-col border xs:w-[100%] md:w-[75%] lg:w-[60%] xl:w-[45%] xs:h-[100%] md:h-[85%] xs:p-[20px] md:p-[30px]  rounded-xl bg-[#F5F5F7] max-w-[1080px]">
        <div className="flex flex-[1] items-center  xs:text-[26px] sm:text-[30px] md:text-[36px] font-semibold max-w-[200px]">
          To-Do List
        </div>

        <div className="flex xs:flex-[0.8] md:flex-[1] items-start w-[100%] ">
          <div className="flex flex-[1]">
            <div className="flex flex-[1] flex-col ">
              <div className="xs:text-[18px]  md:text-[20px] font-semibold">
                My Tasks
              </div>

              <div className="xs:text-[14px]  md:text-[18px]">{`You have ${TasksCount} tasks left!`}</div>
            </div>

            <div className="flex flex-[1] justify-end ">
              <div
                className="flex justify-center items-center xs:w-[80%] md:w-[50%] h-[100%] bg-[#705C53] hover:bg-[#473b35]  xs:text-[16px] lg:text-[18px] text-[#F5F5F7] font-semibold rounded-xl cursor-pointer"
                onClick={LinkToAddTask}
              >
                Add a new task
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-[5] flex-col w-[100%] overflow-hidden">
          <div className="grid grid-cols-1 gap-3 w-[100%]  overflow-y-scroll ">
            {loading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={`skeleton h-[180px] rounded-xl mr-1 p-3`}
                  />
                ))}
              </div>
            ) : (
              tasks.map((task) => {
                const isChecked =
                  checkedState[task._id] !== undefined
                    ? checkedState[task._id]
                    : task.checked;
                return (
                  <div
                    key={task._id}
                    className={`xs:h-[150px] md:h-[180px] rounded-xl mr-1 p-3 ${
                      isChecked ? "bg-[#e3e0da]" : "bg-[#D8D2C2]"
                    }`}
                  >
                    <div className="flex gap-3 h-[100%]">
                      <div className="flex flex-[0.5] text-[20px] justify-end items-start">
                        <Checkbox
                          sx={{
                            padding: 0,
                            paddingTop: "5px",
                            "& .MuiSvgIcon-root": {
                              fontSize: { xs: 15, md: 24 },
                            },
                          }}
                          checked={isChecked}
                          onChange={() => {
                            const newCheckedState = !isChecked;
                            handleCheckTask(task._id, task.checked);
                            handleUpdateCheckTask(task._id, newCheckedState);
                          }}
                        />
                      </div>

                      <div className="flex flex-col flex-[4] xs:text-[14px] md:text-[20px] justify-start  h-[100%] ">
                        <div
                          className={`flex flex-[1] ${
                            isChecked ? "line-through" : ""
                          }`}
                        >
                          {task.title}
                        </div>
                        <div className="flex flex-[1] xs:text-[11px] md:text-[14px]">
  {task.description.length > 200
    ? <span className="md:hidden xs:inline">{task.description.slice(0, 150)}...</span>
    : <span>{task.description}</span>}
  {task.description.length > 150 && (
    <span className="xs:hidden md:inline">{task.description.slice(0, 210)}...</span>
  )}
</div>
                        <div className="flex flex-[5]  text-[18px] items-end ">
                          <div className="flex ">
                            <div className="flex items-center ">
                              <EventAvailableIcon
                                sx={{ width: "20px", height: "20px" }}
                              />
                            </div>
                            <div className="flex items-center text-[14px] ml-2">
                              {formatDate(task.date)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-[1] text-[20px]  items-start justify-around  pt-1.5 ">
                      <div className="flex flex-[1] text-[16px] items-start">
            <span className={`${isChecked ? "text-green-600" : "text-red-600"}`}>
              {isChecked ? "ดำเนินการเสร็จสิ้น" : "ยังไม่ดำเนินการ"}
            </span>
          </div>
                        <div
                          className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[green] rounded-md transition-all duration-500"
                          onClick={() => {
                            window.location.href = `/${task._id}`;
                          }}
                        >
                          <EditIcon sx={{ color: "green" }} />
                        </div>

                        <div
                          className="flex items-start cursor-pointer border border-2 border-transparent hover:border hover:border-2 hover:border-[red] rounded-md transition-all duration-500"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
