# MuscleUp – Frontend (React)

This is the frontend for **MuscleUp**, a fitness application where users can search for exercises, save favorites, and build weekly workout plans.  
The frontend is built using React and communicates with a Flask backend.

---

## 🚀 Features

- 🔍 Search exercises (GIFs, targets, equipment, etc.)
- ⭐ Save and remove favorite exercises
- 📅 Build a weekly workout plan with a visual calendar
- 🧲 Floating day-picker for adding exercises directly to specific days
- 👤 User login session with backend authentication
- 🎨 Responsive UI using React-Bootstrap + custom CSS
- 🎥 Exercise GIF display

---

## 🛠️ Tech Stack

- React (Create React App)
- React Router
- React-Bootstrap
- Custom CSS & styling
- REST communication with Flask backend

---

## 📂 Project Structure

frontend/
├── public/
├── src/
│   ├── assets/
│   │     └── strongWoman.jpeg
│   ├── components/
│   │     ├── LoginForm.jsx
│   │     ├── Navbar.jsx
│   │     ├── ProtectedRoute.js
│   │     └── RegisterForm.jsx
│   ├── pages/
│   │     ├── AuthPage.jsx
│   │     ├── HomePage.jsx
│   │     └── ProfilePage.jsx
│   ├── services/
│   │     └── api.js
│   ├── styles/
│   │     ├── HomePage.css
│   │     ├── Navbar.css
│   │     ├── ProfilePage.css
│   │     ├── App.css
│   │     └── index.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
---

## ▶️ Running the Frontend

### 1. Install dependencies
```bash
npm install

## ▶️ Start development server

npm start

The app will run at:
👉 http://localhost:3000

### Make sure the backend is running on http://localhost:8080

#### The backend is required for:
Login / Register
Fetching exercises
Favorites (MySQL)
Weekly plan (MongoDB)

📜 License

This project is part of a student/learning project and not licensed for commercial use.