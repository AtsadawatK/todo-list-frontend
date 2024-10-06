export const fetchData = async (get) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // เพื่อให้คอมโพเนนต์ที่เรียกใช้สามารถจัดการกับ error ได้
    }
  };


  import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
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

