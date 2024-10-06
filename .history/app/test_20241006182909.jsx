"use client"

import React, { useEffect, useState } from 'react';
import { GetTasks } from './api/ApiRoute';

const Test = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        async function fetchTasks() {
          try {
            const response = await fetch('/api' , {
              cache: 'no-store',
              headers: {
                'Cache-Control': 'no-cache'
              }
            } );
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setTasks(data);
          } catch (error) {
            console.error("Failed to fetch crypto data:", error);
          }
        }
        fetchTasks();
      }, []);

      console.log(tasks)



    return (
        <div>
            <h1>Tasks</h1>

                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>{task.title}</li>
                    ))}
                </ul>

        </div>
    );
};

export default Test;