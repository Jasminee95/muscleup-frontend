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
    const raw = res.data.data;

    console.log("RAW RESULT:", raw);

    if (!Array.isArray(raw)) return [];

    return raw.map((ex) => {
      const safeId = String(ex.exerciseId || ex.id);

      return {
        id: safeId,
        exerciseId: safeId,
        name: ex.name,
        bodyPart: ex.bodyPart,
        target: ex.target,
        equipment: ex.equipment,
        imageUrl: ex.imageUrl || ex.gifUrl,
      };
    });
  } catch (err) {
    console.error("Error searching exercises:", err);
    return [];
  }
}

// export async function searchExercises(query) {
//   try {
//     const res = await api.get(`/api/exercises?search=${query}`);

//     if (Array.isArray(res.data.data)) {
//     return  res.data.data;
//   }

//   return []
//  } catch (err) {
//     console.error("Error searching exercises:", err);
//     return [];
//   }
// }

export async function getFavorites() {
  try {
    const res = await api.get("/api/favorites");
    return res.data;
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return [];
  }
}

// export async function addFavorite(exercise) {
//     try {
//         const res = await api.post("/api/favorites", {
//             exercise_id: exercise.exerciseId,
//             exercise_name: exercise.name,
//             body_part: exercise.bodyPart,
//             target: exercise.target,
//             equipment: exercise.equipment,
//             gif_url: exercise.imageUrl
//         });
//         return res.data;
//     } catch (err) {
//         console.error("Error adding favorites:", err);
//     }
// }

export async function addFavorite(ex) {
  const res = await api.post("/api/favorites", {
    exercise_id: ex.exerciseId,
    exercise_name: ex.name,
    body_part: ex.bodyPart,
    target: ex.target,
    equipment: ex.equipment,
    gif_url: ex.imageUrl,
  });

  return res.data;
}

export async function removeFavorite(exerciseId) {
  try {
    const res = await api.delete(`/api/favorites/${exerciseId}`);
    return res.data;
  } catch (err) {
    console.error("Error removing favorites:", err);
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
