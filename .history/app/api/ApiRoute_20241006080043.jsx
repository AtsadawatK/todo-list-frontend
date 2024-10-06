export async function AddMember(addData) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error Add member:', error);
    }
  }
