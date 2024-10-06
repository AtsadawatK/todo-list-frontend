// MyComponent.js
"use client"

import React, { useEffect, useState } from 'react';
import { GetTasks } from './api/ApiRoute'; // นำเข้าฟังก์ชัน GetTasks

const Test = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // สถานะการโหลด

    useEffect(() => {
        async function fetchTasks() {
            const data = await GetTasks(); // เรียกใช้ฟังก์ชัน GetTasks
            setTasks(data);
            setLoading(false); // ตั้งค่าการโหลดให้เป็น false
        }

        fetchTasks();
    }, []); // ใช้ useEffect เพื่อเรียกใช้เมื่อคอมโพเนนต์เรนเดอร์

    return (
        <div>
            <h1>Tasks</h1>
            {loading ? ( // แสดงข้อความโหลดถ้าข้อมูลยังโหลดไม่เสร็จ
                <p>Loading...</p>
            ) : (
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <li key={task._id}>{task.title}</li> // ปรับให้เข้ากับโครงสร้างข้อมูลของคุณ
                        ))
                    ) : (
                        <p>No tasks found.</p> // ถ้าไม่มีข้อมูลให้แสดง
                    )}
                </ul>
            )}
        </div>
    );
};

export default Test;
