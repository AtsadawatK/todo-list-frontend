"use client";

import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { addTask } from "../../api/ApiRoute";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

export default function AddTask() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const LinkToHome = () => {
    router.push("/");
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Fredoka, sans-serif",
    },
  });

  useEffect(() => {
    setIsFormValid(title !== "" && description !== "" && selectedDate !== null);
  }, [title, description, selectedDate]);

  const handleAdd = async () => {
    if (!isFormValid) return;

    if (!title || !description || !selectedDate) {
      setTitleError(!title);
      setDescriptionError(!description);
      setDateError(!selectedDate);
      return;
    }

    const newTask = {
      title,
      description,
      date: selectedDate ? dayjs(selectedDate).toDate() : null,
    };

    Swal.fire({
      title: "Are you sure to add task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes,",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await addTask(newTask);
          console.log("Task added:", response);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Task Saved",
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            setTitle("");
            setDescription("");
            setSelectedDate(null);
            setTitleError(false);
            setDescriptionError(false);
            setDateError(false);
            router.push("/");
          }, 1500);
        } catch (error) {
          console.error("Error occurred:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to add task",
            text: error.message,
          });
        }
      }
    });
  };

  return (
    <>
      <div className="flex justify-center h-[100vh] items-center w-full">
        <div className="flex flex-col border  xs:w-[100%] md:w-[75%] lg:w-[60%] xl:w-[45%] xs:h-[100%] md:h-[85%] xs:p-[20px] md:p-[30px]  rounded-xl bg-[#F5F5F7] max-w-[1080px]">
          <div className="flex  items-center justify-between w-[100%] xs:text-[26px] sm:text-[30px] md:text-[36px] font-semibold pt-5">
            <div>Add Task</div>
            <div className="flex flex-[1] justify-end  h-[100%]">
              <div
                className="flex justify-center items-center xs:w-[40%] sm:w-[30%] md:w-[25%] h-[100%] bg-[#B7B7B7] hover:bg-[#473b35]  hover:text-[#FFFFFF] xs:text-[16px] lg:text-[18px]  text-[black] font-semibold rounded-xl cursor-pointer"
                onClick={LinkToHome}
              >
                <NavigateBeforeIcon
                  sx={{ width: { xs: "30px", md: "40px" }, height: "auto" }}
                />
                Back
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[100%] overflow-hidden  h-[100%] py-10">
            <div className="flex text-[20px] items-center">
              Title{" "}
              <div className="flex px-2 text-[red] text-[16px]">
                {titleError && <span>* Title is required</span>}
              </div>
            </div>
            <div className="py-3">
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full rounded-md border border-black py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Input Title Here"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(e.target.value === "");
                }}
              ></input>
            </div>

            <div className="flex text-[20px]">
              Description{" "}
              <div className="flex px-2 text-[red] text-[16px]">
                {descriptionError && <span>* Description is required</span>}
              </div>
            </div>
            <div class="py-3">
              <textarea
                name="description"
                rows="5"
                cols="30"
                class="block w-full rounded-md border border-black py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Input Deacription Here"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError(e.target.value === "");
                }}
              ></textarea>
            </div>

            <div class="flex text-[20px]">
              Date{" "}
              <div className="flex px-2 text-[red] text-[16px]">
                {dateError && <span>* Date is required</span>}
              </div>
            </div>
            <div className="py-3 text-[20px]">
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(newDate) => {
                      setSelectedDate(newDate);
                      setDateError(!newDate);
                    }}
                    minDate={dayjs()}
                    renderInput={(params) => <input {...params} />}
                    sx={{
                      width: "100%",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid black",
                      borderRadius: "6px",
                      fontSize: "20px",
                    }}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>

            <Tooltip
              title="Please fill in all fields to enable"
              TransitionComponent={Zoom}
              disableHoverListener={isFormValid}
            >
              <button
                className={`my-3 border flex justify-center items-center xs:h-[8%] md:h-[10%] rounded-md xs:text-[16px] lg:text-[18px] text-[#F5F5F7] font-semibold ${
                  isFormValid
                    ? "bg-[#705C53] cursor-pointer"
                    : "bg-gray-400 cursor-help"
                }`}
                onClick={handleAdd}
                disabled={!isFormValid}
              >
                Add Task
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}
