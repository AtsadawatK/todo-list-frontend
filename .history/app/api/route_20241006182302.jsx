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


  