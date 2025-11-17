import axios from "axios";



const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export async function getExercises() {
  try {
    const res = await api.get("/api/exercises");
    return res.data;
  } catch (err) {
    console.error("Error fetching exercises:", err);
    return [];
  }
}
export async function searchExercises(query) {
  try {
    const res = await api.get(`/api/exercises?search=${query}`);
    
    if (Array.isArray(res.data.data)) {
    return  res.data.data;
  } 

  return []
 } catch (err) {
    console.error("Error searching exercises:", err);
    return [];
  }
}


export async function registerUser(userData) {
  try {
    const res = await api.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Could not register user." };
  }
}

export async function loginUser(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data; 
}

export async function logoutUser() {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (err) {
    console.error("Logout failed:", err);
    throw err.response?.data || { error: "Logout failed." };
  }
}


 export async function getCurrentUser() {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Not logged in." };
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
