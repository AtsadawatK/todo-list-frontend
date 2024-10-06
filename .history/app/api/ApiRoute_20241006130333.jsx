"use client"
import React, { useState, useEffect } from 'react';




export function GetTasks() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const respone = await fetch ("https://jsonplaceholder.typicode.com/users");
            const data = await respone.json();
            setUsers(data);
        }

        getUsers();
    },[])

    return users;
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

      // ตรวจสอบว่า API เรียกสำเร็จหรือไม่
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const errorResponse = await response.text();
        throw new Error(`Failed to add task: ${errorResponse}`);
      }
    } catch (error) {
      throw error; // ส่ง error กลับไปเพื่อให้จัดการในคอมโพเนนต์
    }
  };