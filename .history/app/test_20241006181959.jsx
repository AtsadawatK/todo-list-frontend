"use client"

import React, { useEffect, useState } from 'react';
import { GetTasks } from './api/ApiRoute';

const Test = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await GetTasks();
                setTasks(data);
            } catch (err) {
                setError('Failed to fetch tasks');
                console.error('Error fetching tasks:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
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