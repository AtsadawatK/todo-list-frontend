"use client"
import React, { useState, useEffect } from 'react';




export function GetTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTask() {
            const respone = await fetch ("http://localhost:3002/tasks");
            const data = await respone.json();
            setTasks(data);
        }

        getTask();
    },[])

    return tasks;
}




export const addTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:3002/addtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });


      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const errorResponse = await response.text();
        throw new Error(`Failed to add task: ${errorResponse}`);
      }
    } catch (error) {
      throw error;
    }
  };


  export async function UpdateTask(id, updateTaskData) {
    try {
      const response = await fetch(`http://localhost:3002/updatetask/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTaskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating Task:', error);
    }
  }

  const UpdateCheckedTasks = async (updateCheck) => {
    try {
        const response = await fetch('/updatechecktask', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updateCheck }), // ส่งค่า checked ใน body
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            updateTasks(true);// "All tasks updated successfully"
        } else {
            console.error(data.message); // แสดงข้อความผิดพลาดถ้ามี
        }
    } catch (error) {
        console.error('Error updating tasks:', error);
    }
};


updateTasks(true);


  export function GetTaskfromID(id) {
    const [taskfromID, setTaskfromID] = useState([]);

    useEffect(() => {
        async function getTaskfromID() {
            const respone = await fetch (`http://localhost:3002/tasks/${id}`);
            const data = await respone.json();
            setTaskfromID(data);
        }

        getTaskfromID();
    },[id])

    return taskfromID;
}


export async function DeleteTask(id) {
    try {
        const response = await fetch(`http://localhost:3002/deletetask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}

