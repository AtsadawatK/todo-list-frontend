import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://localhost:3002/tasks', {
            method: 'GET',
            headers: {
              [process.env.API_Headers]: process.env.API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

