const API_BASE_URL = "http://localhost:5000";


export async function getExercises() {
  try {
    const response = await fetch(`${API_BASE_URL}/exercises`);
    if (!response.ok) throw new Error("Failed to fetch exercises");
    return response.json();
  } catch (err) {
    console.error("Error fetching exercises:", err);
    return [];
  }
}


// export async function getPlans() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/schedule`, {
//       credentials: "include", 
//     });
//     if (!response.ok) throw new Error("Failed to fetch plans");
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching plans:", error);
//     throw error;
//   }
// }
