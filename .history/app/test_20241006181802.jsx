// MyComponent.js
"use client"

import React from 'react';
import { GetTasks } from './api/ApiRoute'; // นำเข้าฟังก์ชัน GetTasks

const Test = () => {
    const { tasks, loading } = GetTasks(); // เรียกใช้ฟังก์ชัน GetTasks

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

export default MyComponent;
