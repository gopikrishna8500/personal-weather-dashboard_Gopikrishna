# 🌤️ Personal Weather Dashboard

This project is a **Personal Weather Dashboard** built with FastAPI (backend) and React (frontend).  
It allows users to **register, log in securely, update their location**, and **view real-time weather data** based on their saved location.

---

## 🚀 Features

- ✅ Secure user authentication using JWT (with expiry)
- 📍 Location update: City/Country or Latitude/Longitude
- 🌦️ Real-time weather fetch from **OpenWeatherMap API**
- 🧾 Clean UI using React + Bootstrap
- 🔐 Password hashing using bcrypt
- 🌐 CORS and REST API support

---

## 📁 Project Structure

weather-dashboard/
├── backend/
│ ├── main.py
│ ├── models.py
│ ├── auth.py
│ ├── weather.py
│ ├── database.py
│ └── utils.py
├── frontend/
│ ├── public/
│ └── src/
│ ├── App.js
│ ├── components/
│ │ ├── HomePage.js
│ │ ├── LoginPage.js
│ │ ├── RegisterPage.js
│ │ ├── WeatherPage.js
│ │ ├── LocationPage.js
│ │ └── Navbar.js

yaml
Copy
Edit

---

## 🛠️ Setup Instructions

### ⚙️ Backend

1. **Navigate to backend directory**:
   ```bash
   cd backend
Create virtual environment:

bash
Copy
Edit
python -m venv venv
venv\Scripts\activate  # for Windows
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run FastAPI server:

bash
Copy
Edit
uvicorn main:app --reload
🌐 Frontend
Navigate to frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start React frontend:

bash
Copy
Edit
npm start
🔑 Sample Credentials
You can register a new user or use these for testing:

Email: demo@example.com

Password: 123456

🔗 API Reference
POST /register — Register user

POST /login — Login and return JWT

GET /weather?city=Delhi — Get weather for a city

PUT /location — Update user location (requires token)

🧪 Requirements File
text
Copy
Edit
# requirements.txt
fastapi
uvicorn
sqlalchemy
bcrypt
python-jose
pydantic[email]
requests
📌 Notes
✅ JWTs are stored in browser localStorage

✅ Weather fetched using OpenWeatherMap (metric units)

✅ You must provide your own OpenWeatherMap API key in the backend or frontend

📮 How to Test
Register a user

Login

Navigate to /dashboard

Enter a city to fetch weather

Update location using /location form

📎 GitHub Repo
🔗 View on GitHub

🧠 Author
Gopikrishna D
Built for Navariti Task Submission (Deadline: July 2, 2025)


---

Let me know if you'd also like a `.gitignore`, `.env` setup, or to prepare for GitHub Pages or deployment.
