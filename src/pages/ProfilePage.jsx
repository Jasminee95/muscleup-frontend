import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import "../styles/HomePage.css";
import "../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser, getFavorites } from "../services/api";
import strongWomanImg from "../assets/strongWoman.jpeg";
import { removeFavorite } from "../services/api";

function WeekCalendar({ weekplan }) {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="week-calendar">
      {weekDays.map((day) => (
        <div key={day} className="day-cell">
          <h5 className="day-name">{day}</h5>
          <ul className="exercise-list">
            {weekplan && weekplan[day] && weekplan[day].length > 0 ? (
              weekplan[day].map((ex, i) => (
                <li key={i} className="exercise-item">
                  {ex.exercise_name || ex.name || "Exercise"}
                </li>
              ))
            ) : (
              <li className="no-exercise">Restday</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [weekplan, setWeekplan] = useState(null);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const navigate = useNavigate();

  const fetchWeekplan = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/plans", {
        credentials: "include",
      });
      if (!res.ok) return;

      const data = await res.json();

      const formatted = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };

      data.forEach((entry) => {
        formatted[entry.day] = entry.exercises || [];
      });

      setWeekplan(formatted);
    } catch (err) {
      console.error("Failed to fetch weekplan", err);
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);

        const favs = await getFavorites();
        setFavorites(favs);

        await fetchWeekplan();
      } catch (err) {
        navigate("/auth", { state: { message: "You must log in first." } });
      }
    }

    load();
  }, [navigate]);

  const saveToMongo = async (day) => {
    try {
      await fetch("http://localhost:8080/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: "Weekplan",
          description: "",
          days: {
            [day]: [selectedExercise],
          },
        }),
      });
      setShowModal(false);
      await fetchWeekplan();
    } catch (err) {
      console.error("Failed to save plan", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/auth", { state: { message: "You have been logged out." } });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleAddToWeekplan = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  return (
    <div className="homepage">
      <div className="overlay">
        <Container className="text-center text-light">
          {user ? (
            <>
              <h2>Welcome, {user.username}!</h2>
              <div className="week-calendar-wrapper">
                <h3 className="text-danger">Your Weekplan</h3>
                <WeekCalendar weekplan={weekplan || {}} />
              </div>
              <div className="content-wrapper mt-4">
                <div className="favorite-grid">
                  <h3 className="text-danger">Your Favorite Exercises</h3>
                  {favorites.map((fav) => (
                    <div
                      key={fav.exercise_id}
                      className="favorite-card"
                      onClick={() => handleAddToWeekplan(fav)}
                      style={{ position: "relative" }}
                    >
                      <div
                        className="remove-fav"
                        onClick={async (e) => {
                          e.stopPropagation();

                          await removeFavorite(fav.exercise_id);

                          const fresh = await getFavorites();
                          setFavorites(fresh);
                        }}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          cursor: "pointer",
                          background: "rgba(255, 0, 0, 0.8)",
                          color: "white",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        ✕
                      </div>
                      <img src={fav.gif_url} alt={fav.exercise_name} />
                      <h5>{fav.exercise_name}</h5>
                      <p>{fav.target}</p>
                    </div>
                  ))}
                </div>
                {showModal && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h4 className="text-danger">Choose a day</h4>
                      {weekDays.map((day) => (
                        <Button
                          key={day}
                          variant="outline-danger"
                          className="m-2 d-block"
                          onClick={() => saveToMongo(day)}
                          style={{ width: "100%" }}
                        >
                          {day}
                        </Button>
                      ))}

                      <Button
                        variant="secondary"
                        className="mt-3"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bottom-image mt-5">
                <img
                  src={strongWomanImg}
                  alt="strong-woman"
                  className="img-fluid"
                />
              </div>

              <Button
                variant="outline-danger"
                onClick={handleLogout}
                className="mt-4"
              >
                Log out
              </Button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </Container>
      </div>
    </div>
  );
}
