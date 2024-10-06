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
        fetchCryptoData();
         const intervalId = setInterval(fetchCryptoData, 500000);
        return () => clearInterval(intervalId);
      }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Tasks</h1>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>{task.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
};

export default Test;