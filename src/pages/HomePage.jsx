import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "../styles/HomePage.css";
import strongWomanImg from "../assets/strongWoman.jpeg";
import {
  searchExercises,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/api";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedMuscle, setSelectMuscle] = useState("");
  const [favorites, setFavorites] = useState([]);

  const bodyParts = [
    "Back",
    "Cardio",
    "Chest",
    "Lower arms",
    "Lower legs",
    "Neck",
    "Shoulders",
    "Upper arms",
    "Upper legs",
    "Waist",
  ];

  const handleBodyPartClick = async (bp) => {
    setSelectMuscle(bp);
    setSearch("");

    const results = await searchExercises(bp.toLowerCase());
    setExercises(results);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === "") return;

    setSelectMuscle("");
    const results = await searchExercises(search.toLowerCase());
    console.log("Search results first item:", results[0]);
    setExercises(results);
  };

  useEffect(() => {
    async function fetchFavs() {
      try {
        const favs = await getFavorites();
        console.log("FAVS FROM BACKEND:", favs);
        const favIds = Array.isArray(favs)
          ? favs.map((f) => f.exercise_id)
          : [];
        setFavorites(favIds);
      } catch (err) {
        console.log("Not logged in or error fetching favorites.");
      }
    }

    fetchFavs();
  }, []);

  const toggleFavorite = async (ex) => {
    const safeId = ex.exerciseId || ex.id || ex.name;

    const isFav = favorites.includes(safeId);

    if (!isFav) {
      await addFavorite({ ...ex, exerciseId: safeId });
    } else {
      await removeFavorite(safeId);
    }

    const fresh = await getFavorites();
    setFavorites(fresh.map((f) => f.exercise_id));
  };

  return (
    <div className="homepage">
      <div className="overlay">
        <Container className="text-center text-light">
          <h2 className="mt-3 text-uppercase fw-semibold text-danger">
            Push harder than yesterday if you want a different tomorrow
          </h2>

          <h3 className="mt-5 fw-bold">
            FIND EXERCISES
            <br />
            FOR ALL MUSCLE GROUPS
          </h3>

          <Row className="justify-content-center mt-4">
            {bodyParts.map((bp) => (
              <Col xs="auto" key={bp}>
                <Button
                  variant="outline-danger"
                  className={`muscle-btn m-2 ${
                    selectedMuscle === bp ? "active-muscle" : ""
                  }`}
                  onClick={() => handleBodyPartClick(bp)}
                >
                  {bp}
                </Button>
              </Col>
            ))}
          </Row>

          <Form
            onSubmit={handleSearch}
            className="mt-4 d-flex justify-content-center"
          >
            <Form.Control
              type="text"
              placeholder="Search for a muscle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </Form>

          <div className="exercise-results mt-5">
            {exercises.length > 0 && (
              <h4 className="text-danger mb-4">Exercises Found:</h4>
            )}

            {exercises.map((ex, index) => {
              return (
                <div
                  key={`${ex.exerciseId ?? ex.id ?? ex.name}-${index}`}
                  className="exercise-card mx-auto mb-3 p-3"
                  style={{
                    width: "70%",
                    border: "1px solid red",
                    borderRadius: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    position: "relative",
                  }}
                >
                  <div
                    className="favorite-star"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                      fontSize: "1.6rem",
                    }}
                    onClick={() => toggleFavorite(ex)}
                  >
                    {favorites.includes(ex.exerciseId) ? (
                      <FaStar color="gold" />
                    ) : (
                      <FaRegStar color="white" />
                    )}
                  </div>
                  <h5 className="text-danger">{ex.name}</h5>
                  <p>
                    <strong>Muscle:</strong> {ex.target}
                  </p>
                  <p>
                    <strong>Body Part:</strong> {ex.bodyPart}
                  </p>
                  <p>
                    <strong>Equipment:</strong> {ex.equipment}
                  </p>
                  {ex.imageUrl && (
                    <img
                      src={ex.imageUrl}
                      alt={ex.name}
                      className="img-fluid mt-3"
                      style={{ maxHeight: "200px", borderRadius: "8px" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="bottom-image mt-5">
            <img
              src={strongWomanImg}
              alt="strong-woman"
              className="img-fluid"
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
